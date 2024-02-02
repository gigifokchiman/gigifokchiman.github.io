import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

interface FeaturedPostProps {
  post: {
    date?: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
    social: ReadonlyArray<{
      icon: React.ElementType;
      name: string;
      url: string;
    }>;
  };
}




export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            {post.date == null && (
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            )}
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            {post.social.map((network) => (
                <Link
                    display="block"
                    variant="body1"
                    href={network.url}
                    target="_blank"
                    key={network.name}
                    sx={{ mb: 0.5 }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <network.icon />
                    <span>{network.name}</span>
                  </Stack>
                </Link>
            ))}
            {/*<Typography variant="subtitle1" color="primary">*/}
            {/*  Continue reading...*/}
            {/*</Typography>*/}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
