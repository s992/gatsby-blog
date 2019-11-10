import React from 'react'
import { graphql } from 'gatsby'

import Pagination from '../templates/pagination'

interface Props {
  data: Pages
}

export default function Index({ data }: Props) {
  return <Pagination pageContext={{ next: `/blog/1` }} data={data} />
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
