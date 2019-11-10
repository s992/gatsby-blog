import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import BlogHeader from '../components/blog-header'

interface Props {
  data: Pages
  pageContext: {
    next?: string
    prev?: string
  }
}

export default function Pagination({ data, pageContext }: Props) {
  const { edges: posts } = data.allMarkdownRemark
  const { next, prev } = pageContext

  return (
    <Layout>
      <div className="blog-posts">
        {posts
          .filter((post) => post.node.frontmatter.published)
          .map(({ node: post }) => (
            <div className="row" key={post.id}>
              <article className="col-md-8 col-lg-7 col-xl-5 center-block">
                <BlogHeader {...post.frontmatter} />
                <div className="content" dangerouslySetInnerHTML={{ __html: post?.fields?.more || post.html }} />
                {post?.fields?.more && (
                  <footer>
                    <Link to={post.frontmatter.path}>Read on &rarr;</Link>
                  </footer>
                )}
              </article>
            </div>
          ))}
        <div className="row">
          <div className="col-md-8 col-lg-7 col-xl-5 center-block">
            <nav className="pagination">
              {next && (
                <Link to={next} className="pull-left">
                  &laquo; Older
                </Link>
              )}
              {prev && (
                <Link to={prev} className="pull-right">
                  Newer &raquo;
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface Pages {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: string
          html: string
          fields: {
            more: string
          }
          frontmatter: {
            title: string
            date: string
            formattedDate: string
            path: string
            published: boolean
          }
        }
      },
    ]
  }
}

export const pageQuery = graphql`
  query PaginationQuery($offset: Int) {
    allMarkdownRemark(limit: 5, skip: $offset, sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          fields {
            more
          }
          frontmatter {
            title
            date
            formattedDate: date(formatString: "DD MMM YYYY")
            path
            published
          }
        }
      }
    }
  }
`
