import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogHeader from '../components/blog-header'

export default function BlogPost({ data }) {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <main className="container-fluid">
        <Helmet title={`Sean Walsh - ${post.frontmatter.title}`} />
        <div className="row">
          <article className="col-md-8 col-lg-7 col-xl-5 center-block">
            <BlogHeader {...post.frontmatter} />
            <div className="content full-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostsByPath($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        formattedDate: date(formatString: "DD MMM YYYY")
        year: date(formatString: "YYYY")
        month: date(formatString: "MM")
        day: date(formatString: "DD")
        path
        title
        comments
      }
    }
  }
`
