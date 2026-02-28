import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import {useEffect, useRef, useState, useCallback} from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import palette from './palette';

const SyntaxHighlighterComponent = SyntaxHighlighter as any;

const COLLAPSED_HEIGHT = 480;

// Subtle washi paper grain texture via inline SVG noise
const paperTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

interface MainProps {
  posts: ReadonlyArray<string>;
  title: string;
}

function CodeBlock({className, children, ...props}: any) {
  const match = /language-(\w+)/.exec(className || '');
  const inline = !match;
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeString]);

  if (inline) {
    return (
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
  }

  return (
    <Box sx={{ position: 'relative', '&:hover .copy-btn': { opacity: 1 } }}>
      <Tooltip title={copied ? 'Copied' : 'Copy'} placement="top">
        <IconButton
          className="copy-btn"
          onClick={handleCopy}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0,
            transition: 'opacity 0.2s ease',
            color: palette.usuzumi,
            bgcolor: palette.kinari,
            '&:hover': { bgcolor: palette.suna },
            zIndex: 1,
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <SyntaxHighlighterComponent
        style={oneLight}
        language={match[1]}
        PreTag="div"
      >
        {codeString}
      </SyntaxHighlighterComponent>
    </Box>
  );
}

const markdownComponents = {
  code: CodeBlock,
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
    <Card sx={{
      mb: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: paperTexture,
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        borderRadius: 'inherit',
      },
    }}>
      <CardContent sx={{
        p: 4,
        '& img': {
          maxWidth: '100%',
          borderRadius: 2,
          display: 'block',
          margin: '16px auto',
        },
      }}>
        <Box
          ref={contentRef}
          sx={{
            position: 'relative',
            maxHeight: expanded ? 'none' : `${COLLAPSED_HEIGHT}px`,
            overflow: 'hidden',
            transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>{mdText}</ReactMarkdown>
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
