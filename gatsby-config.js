const siteUrl = 'https://swalsh.org';

module.exports = {
  siteMetadata: {
    title: 'Sean Walsh',
    author: 'Sean Walsh',
    description: 'Personal blog of Sean Walsh',
    siteUrl,
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
    'gatsby-plugin-sharp',
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
        plugins: [
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-52344422-1',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup({ query: { site, allMarkdownRemark } }) {
          return Object.assign({}, site.siteMetadata, {
            allMarkdownRemark,
            generator: 'GatsbyJS',
            site_url: siteUrl,
          });
        },
        feeds: [
          {
            output: '/rss.xml',
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const link = `${site.siteMetadata.siteUrl}${edge.node.frontmatter.path}`;

                return {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  url: link,
                  guid: link,
                  date: edge.node.frontmatter.date,
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { published: { eq: true } } }
                ) {
                  edges {
                    node {
                      id
                      excerpt
                      frontmatter {
                        title
                        date
                        path
                        published
                      }
                    }
                  }
                }
              }
            `,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Sean Walsh',
        short_name: 'Sean Walsh',
        start_url: '/',
        background_color: '#f1f1ff',
        theme_color: '#b93848',
        display: 'minimal-ui',
        icon: 'static/favicons/mstile-310x310.png',
      }
    },
    'gatsby-plugin-offline'
  ],
};
