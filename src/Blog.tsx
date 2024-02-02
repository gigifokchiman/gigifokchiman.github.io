import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
// import Markdown from './Markdown';
// import Footer from './Footer';

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import post1 from "./blog-post.1.md";
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import FeatureImage from './cypress_2024.png'

// const sections = [
//   { title: 'Technology', url: '#' },
//   { title: 'Design', url: '#' },
//   { title: 'Culture', url: '#' },
//   { title: 'Business', url: '#' },
//   { title: 'Politics', url: '#' },
//   { title: 'Opinion', url: '#' },
//   { title: 'Science', url: '#' },
//   { title: 'Health', url: '#' },
//   { title: 'Style', url: '#' },
//   { title: 'Travel', url: '#' },
// ];

const mainFeaturedPost = {
  title: "",
  description:
    "",
  image:  FeatureImage,
  imageText: 'main image description',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About Gigi',
  description:
    'Enthusiastical data scientist and machine learning engineer.',
  archives: [],
  // archives: [
  //   // { title: 'March 2020', url: '#' },
  //   // { title: 'February 2020', url: '#' },
  //   // { title: 'January 2020', url: '#' },
  //   // { title: 'November 1999', url: '#' },
  //   // { title: 'October 1999', url: '#' },
  //   // { title: 'September 1999', url: '#' },
  //   // { title: 'August 1999', url: '#' },
  //   // { title: 'July 1999', url: '#' },
  //   // { title: 'June 1999', url: '#' },
  //   // { title: 'May 1999', url: '#' },
  //   // { title: 'April 1999', url: '#' },
  // ],
  social: [
    { name: 'GitHub', icon: GitHubIcon, url: "https://github.com/gigifokchiman" },
    { name: 'LinkedIn', icon: LinkedInIcon, url: "https://www.linkedin.com/in/gigifokcm/" }
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {/*<Header title="Blog" sections={sections} />*/}
        <Header title="Gigi Fok's Blog" sections={[]} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Recent posts" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      {/*<Footer*/}
      {/*  title="Footer"*/}
      {/*  description="Something here to give the footer a purpose!"*/}
      {/*/>*/}
    </ThemeProvider>
  );
}
