# Containerising Your ML Model with Docker

### Image style: Centered (current default)
`maxWidth: 100%`, `display: block`, `margin: auto`, `borderRadius: 8px`

![Code on a monitor](/images/containers.jpg)

### Image style: Fit width
`width: 100%`, stretches to fill the card

<img src="/images/code-screen.jpg" alt="Code screen" style="width:100%; border-radius:8px;" />

### Image style: Capped height with cover
`maxHeight: 200px`, `objectFit: cover` — crops tall images to a fixed band

<img src="/images/server-room.jpg" alt="Matrix" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px;" />

### Image style: Small centered with shadow
`maxWidth: 300px`, centered, with a subtle box shadow

<img src="/images/docker-logo.png" alt="Docker logo" style="max-width:300px; display:block; margin:16px auto; border-radius:8px; box-shadow:0 2px 12px rgba(0,0,0,0.08);" />

### Image style: Full bleed (no rounded corners)
`width: 100%`, no border radius — edge-to-edge within the card content

<img src="/images/containers.jpg" alt="Containers" style="width:100%; border-radius:0;" />

---

Deploying machine learning models shouldn't feel like defusing a bomb. Yet every data scientist has experienced the classic: *"it works on my machine"*. Docker fixes this by packaging your model, dependencies, and runtime into a single, reproducible container.

## Why Docker for ML?

- **Reproducibility** — the same image runs identically on your laptop, CI server, and production
- **Isolation** — no more conflicting Python versions or library clashes
- **Portability** — ship to AWS, GCP, or a Raspberry Pi with the same Dockerfile

## Project Structure

A clean layout makes everything easier:

```
ml-service/
├── Dockerfile
├── requirements.txt
├── app.py
├── model/
│   └── classifier.pkl
└── tests/
    └── test_predict.py
```

## The Dockerfile

Here's a production-ready Dockerfile for a scikit-learn model served with FastAPI:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies first (cache-friendly)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .
COPY model/ model/

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

A few things to note:

- We use `python:3.11-slim` instead of the full image — it's ~150MB smaller
- Dependencies are copied and installed **before** the application code so Docker caches the layer
- `--no-cache-dir` keeps the image lean

## The FastAPI App

```python
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="ML Classifier API")

with open("model/classifier.pkl", "rb") as f:
    model = pickle.load(f)

class PredictRequest(BaseModel):
    features: list[float]

class PredictResponse(BaseModel):
    prediction: int
    probability: float

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    X = np.array(req.features).reshape(1, -1)
    pred = model.predict(X)[0]
    prob = model.predict_proba(X).max()
    return PredictResponse(prediction=int(pred), probability=float(prob))

@app.get("/health")
def health():
    return {"status": "ok"}
```

## Build and Run

```bash
# Build the image
docker build -t ml-service .

# Run the container
docker run -p 8000:8000 ml-service
```

Test it with `curl`:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [5.1, 3.5, 1.4, 0.2]}'
```

You should get back something like:

```json
{
  "prediction": 0,
  "probability": 0.97
}
```

## Multi-Stage Builds for Smaller Images

If your training pipeline is heavy but your serving code is light, use a multi-stage build:

```dockerfile
# Stage 1: Train
FROM python:3.11 AS trainer
WORKDIR /train
COPY requirements-train.txt .
RUN pip install -r requirements-train.txt
COPY train.py data/ ./
RUN python train.py --output /train/model.pkl

# Stage 2: Serve (slim)
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
COPY --from=trainer /train/model.pkl model/classifier.pkl
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

The final image only contains the serving dependencies — the training libraries (pandas, scikit-learn, etc.) are left behind in the build stage.

## Tips from Production

1. **Pin your versions** — `scikit-learn==1.3.2`, not `scikit-learn`. Future you will thank present you.
2. **Add a health endpoint** — orchestrators like Kubernetes need it to know your container is alive.
3. **Log predictions** — you can't debug what you can't see. Log inputs, outputs, and latency.
4. **Don't store data in the container** — use mounted volumes or object storage for datasets and model artefacts.

## Wrapping Up

Docker turns the messy reality of ML deployment into something predictable. Start simple — a Dockerfile, a FastAPI app, a pickled model — and iterate from there. You don't need Kubernetes on day one. A single container running on a \$5 VM can serve surprisingly far.

---

*Happy containerising. If you break production, at least it'll be reproducible.*
