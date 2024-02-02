import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";

interface MainProps {
  posts: ReadonlyArray<string>;
  title: string;
}

export const GenMdPage = ({children}: {children: string}): JSX.Element => {
  const [mdText, mdSetText] = useState('')

  useEffect(() => {
    fetch(children).then(res => res.text()).then(text => mdSetText(text))
  })

  return (
      <div>
        <ReactMarkdown children={mdText} />
      </div>
  )
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
          <GenMdPage children={post} />
      ))}
    </Grid>
  );
}
