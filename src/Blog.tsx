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
// import Sidebar from './Sidebar';
import post1 from "./blog-post/blog-20220202.md";
// import post2 from './blog-post/blog-post.2.md';
// import post3 from './blog-post/blog-post.3.md';
import FeatureImage from './img/cypress_2024.png'
import ProfileImage from './img/Gigi_Studio_ghibli_style_close_up_of_a_womans_face_with_black_2.jpg'

// const sections = [
//   { title: 'Machine Learning', url: '#' },
//   { title: 'Fun', url: '#' },
// ];

const mainFeaturedPost = {
  title: "Gigi @ Cypress Mountain 2024",
  description:
    "",
  image:  FeatureImage,
  imageText: 'main image description',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'About Gigi Fok',
    description:
      'A data scientist and machine learning engineer who loves to share her thoughts and experiences. I started my blog journey to make ML accessible by everyone in 2024.',
    image: ProfileImage,
    imageLabel: "Generated by AI with Gigi's real image",
    social: [
      { name: 'GitHub', icon: GitHubIcon, url: "https://github.com/gigifokchiman" },
      { name: 'LinkedIn', icon: LinkedInIcon, url: "https://www.linkedin.com/in/gigifokcm/" }
    ],
  },
];

const posts = [post1];

// const posts = [post1, post2, post3];

// const sidebar = {
//   title: 'About Gigi',
//   description:
//     'Enthusiastic data scientist and machine learning engineer.',
//   archives: [],
//   // archives: [
//   //   // { title: 'March 2020', url: '#' },
//   //   // { title: 'February 2020', url: '#' },
//   //   // { title: 'January 2020', url: '#' },
//   //   // { title: 'November 1999', url: '#' },
//   //   // { title: 'October 1999', url: '#' },
//   //   // { title: 'September 1999', url: '#' },
//   //   // { title: 'August 1999', url: '#' },
//   //   // { title: 'July 1999', url: '#' },
//   //   // { title: 'June 1999', url: '#' },
//   //   // { title: 'May 1999', url: '#' },
//   //   // { title: 'April 1999', url: '#' },
//   // ],
// };

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {/*<Header title="blog-post" sections={sections} />*/}
        <Header title="Home" sections={[]} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Recent posts" posts={posts} />
            {/*<Sidebar*/}
            {/*  title={sidebar.title}*/}
            {/*  description={sidebar.description}*/}
            {/*  archives={sidebar.archives}*/}
            {/*/>*/}
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
