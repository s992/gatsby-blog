import React from 'react'
import Link from 'gatsby-link'

import Pagination from '../templates/pagination'

export default function Index({ data }) {
  return <Pagination pathContext={{ next: `/blog/1` }} data={data} />
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 5, sort: { order: DESC, fields: [frontmatter___date] }) {
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
