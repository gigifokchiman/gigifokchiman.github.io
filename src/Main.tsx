import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';

const SyntaxHighlighterComponent = SyntaxHighlighter as any;

interface MainProps {
  posts: ReadonlyArray<string>;
  title: string;
}

const markdownComponents = {
  code({className, children, ...props}: any) {
    const match = /language-(\w+)/.exec(className || '');
    const inline = !match;
    return !inline ? (
      <SyntaxHighlighterComponent
        style={oneLight}
        language={match[1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighterComponent>
    ) : (
      <code
        style={{
          backgroundColor: '#F0EBE3',
          padding: '2px 6px',
          borderRadius: 4,
          fontSize: '0.9em',
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
};

export const GenMdPage = ({children}: {children: string}): JSX.Element => {
  const [mdText, mdSetText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(children)
      .then(res => res.text())
      .then(text => {
        mdSetText(text)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load post:', err)
        setLoading(false)
      })
  }, [children])

  if (loading) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="rectangular" height={120} sx={{ mt: 2, borderRadius: 1 }} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ '& img': { maxWidth: '100%' } }}>
        <ReactMarkdown components={markdownComponents}>{mdText}</ReactMarkdown>
      </CardContent>
    </Card>
  )
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={12}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {posts.map((post, index) => (
          <GenMdPage key={index}>{post}</GenMdPage>
      ))}
    </Grid>
  );
}
