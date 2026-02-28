import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import palette from './palette';

const SyntaxHighlighterComponent = SyntaxHighlighter as any;

const COLLAPSED_HEIGHT = 280;

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
          backgroundColor: palette.kinari,
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
  const [expanded, setExpanded] = useState(false)
  const [needsTruncation, setNeedsTruncation] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (contentRef.current) {
      setNeedsTruncation(contentRef.current.scrollHeight > COLLAPSED_HEIGHT)
    }
  }, [mdText])

  if (loading) {
    return (
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
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
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 4, '& img': { maxWidth: '100%' } }}>
        <Box
          ref={contentRef}
          sx={{
            position: 'relative',
            maxHeight: expanded ? 'none' : `${COLLAPSED_HEIGHT}px`,
            overflow: 'hidden',
            transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <ReactMarkdown components={markdownComponents}>{mdText}</ReactMarkdown>
          {!expanded && needsTruncation && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100px',
                background: 'linear-gradient(to bottom, rgba(254,252,248,0) 0%, rgba(254,252,248,0.95) 70%, rgba(254,252,248,1) 100%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </Box>
        {needsTruncation && (
          <Typography
            component="span"
            onClick={() => setExpanded(!expanded)}
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 2,
              pt: 1,
              color: 'text.secondary',
              fontSize: '0.875rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {expanded ? '- - - fold - - -' : '- - - continue reading - - -'}
          </Typography>
        )}
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
