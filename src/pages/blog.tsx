import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

interface Props {
  data: Posts
}

export default function BlogArchive({ data }: Props) {
  const { edges: posts } = data.allMarkdownRemark
  const postsByYear = posts
    .map((post) => post.node)
    .filter((post) => post.frontmatter.published)
    .reduce((byYear, post) => {
      const { year } = post.frontmatter

      if (!byYear.hasOwnProperty(year)) {
        byYear[year] = []
      }

      byYear[year].push(post)

      return byYear
    }, {} as { [key: string]: Post[] })

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8 col-lg-7 col-xl-5 center-block">
          <h1>Blog Archive</h1>
          <div id="blog-archives">
            <dl>
              {Object.keys(postsByYear)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year) => (
                  <span className="stupid-wrapper-because-react" key={year}>
                    <dt>{year}</dt>
                    {postsByYear[year].map((post) => (
                      <dd key={post.id}>
                        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                      </dd>
                    ))}
                  </span>
                ))}
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface Post {
  id: string
  frontmatter: {
    title: string
    year: string
    published: boolean
    path: string
  }
}

interface Posts {
  allMarkdownRemark: {
    edges: [
      {
        node: Post
      },
    ]
  }
}

export const pageQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            year: date(formatString: "YYYY")
            published
            path
          }
        }
      }
    }
  }
`
