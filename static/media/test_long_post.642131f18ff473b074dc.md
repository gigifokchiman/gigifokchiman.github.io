# Building a RAG Pipeline from Scratch with Python

Retrieval-Augmented Generation (RAG) has become one of the most practical ways to ground large language models in your own data. In this post, I'll walk through building a simple RAG pipeline using Python, step by step.

## Why RAG?

LLMs are powerful, but they hallucinate. They don't know about your internal docs, your company's API, or the CSV you exported last Tuesday. RAG solves this by **retrieving** relevant context from your own data and feeding it to the model alongside the user's question.

Think of it like an open-book exam — the model doesn't need to memorise everything, it just needs to know where to look.

## Setting Up the Environment

First, let's install the dependencies:

```bash
pip install langchain openai chromadb tiktoken
```

We'll also need a few standard libraries:

```python
import os
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
```

Make sure your `OPENAI_API_KEY` is set as an environment variable:

```bash
export OPENAI_API_KEY="sk-your-key-here"
```

## Step 1: Load Your Documents

The first step is loading the data you want to search over. This could be PDFs, markdown files, CSVs — anything text-based.

```python
loader = TextLoader("./data/my_notes.txt")
documents = loader.load()

print(f"Loaded {len(documents)} document(s)")
print(f"First 200 chars: {documents[0].page_content[:200]}")
```

For production use, you'd likely load from multiple sources. LangChain has loaders for Notion, Confluence, Google Drive, and dozens more.

## Step 2: Chunk the Text

LLMs have context windows, and embeddings work better on smaller, focused passages. We split documents into overlapping chunks:

```python
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", " ", ""]
)

chunks = text_splitter.split_documents(documents)
print(f"Split into {len(chunks)} chunks")
```

The `chunk_overlap` parameter ensures we don't lose context at chunk boundaries — a sentence that spans two chunks will appear in both.

## Step 3: Create Embeddings and Store

Now we convert each chunk into a vector embedding and store it in a vector database:

```python
embeddings = OpenAIEmbeddings()

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

vectorstore.persist()
print("Vector store created and persisted")
```

ChromaDB stores everything locally by default. For production, you might use Pinecone, Weaviate, or pgvector.

## Step 4: Query the Pipeline

With the vector store ready, we can build the retrieval chain:

```python
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
)

qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

result = qa_chain({"query": "How do I configure the database?"})

print("Answer:", result["result"])
print("\nSources:")
for doc in result["source_documents"]:
    print(f"  - {doc.page_content[:100]}...")
```

The `search_kwargs={"k": 3}` means we retrieve the top 3 most relevant chunks. The `"stuff"` chain type simply concatenates them into the prompt.

## Performance Tips

A few things I've learned from running RAG in production:

1. **Chunk size matters** — too small and you lose context, too large and retrieval gets noisy. Start with 500 tokens and adjust.
2. **Overlap is cheap insurance** — 10-20% overlap between chunks prevents losing information at boundaries.
3. **Reranking improves quality** — after initial retrieval, use a cross-encoder to rerank results before passing to the LLM.
4. **Cache your embeddings** — embedding the same document twice is wasteful. Use a content hash as the key.

## Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Chunks too large | Irrelevant context in answers | Reduce `chunk_size` |
| No overlap | Answers miss key details | Add `chunk_overlap` |
| Wrong `k` value | Too much noise or missing info | Experiment with 3-5 |
| Stale index | Outdated answers | Rebuild on data change |

## What's Next?

This is just the beginning. From here you could:

- Add **metadata filtering** (e.g., only search docs from the last 30 days)
- Implement **hybrid search** combining keyword and semantic retrieval
- Use **streaming** for real-time response rendering
- Add **evaluation** with frameworks like RAGAS to measure retrieval quality

RAG isn't magic — it's plumbing. But good plumbing makes the whole system work reliably.

---

*Thanks for reading. If you found this useful, check out my other posts on ML engineering.*
