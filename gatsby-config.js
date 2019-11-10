const siteUrl = 'https://swalsh.org'

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
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-mdx',
    'gatsby-plugin-typescript',
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
          })
        },
        feeds: [
          {
            output: '/rss.xml',
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const link = `${site.siteMetadata.siteUrl}${edge.node.frontmatter.path}`

                return {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  url: link,
                  guid: link,
                  date: edge.node.frontmatter.date,
                }
              })
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
    'gatsby-plugin-offline',
  ],
}
