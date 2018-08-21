import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export default function BlogArchive({ data }) {
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
    }, {})

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8 col-lg-7 col-xl-5 center-block">
          <h1>Blog Archive</h1>
          <div id="blog-archives">
            <dl>
              {Object.keys(postsByYear)
                .sort((a, b) => b - a)
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
