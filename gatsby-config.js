module.exports = {
  siteMetadata: {
    title: 'Sean Walsh',
    author: 'Sean Walsh',
    socialLinks: {
      github: 'https://github.com/s992',
      twitter: 'https://twitter.com/theseanwalsh',
      stackOverflow: 'http://stackoverflow.com/users/603502/sean-walsh',
      linkedin: 'https://www.linkedin.com/pub/sean-walsh/bb/aa4/6a8',
    },
    disqus: {
      shortName: 'swalsh',
      siteUrl: 'http://swalsh.org',
    },
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs', 'gatsby-remark-images'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-52344422-1',
      },
    },
  ],
};
