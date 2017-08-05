import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import ReactDisqusComments from 'react-disqus-comments';

import BlogHeader from '../components/blog-header';
import { siteMetadata } from '../../gatsby-config';

export default function Template({ data, location }) {
  const { markdownRemark: post } = data;

  // because i'm too lazy to migrate disqus right now
  const { day, month, year, path } = post.frontmatter;
  const pathMinusBlog = path.split('/')[2];
  const disqusId = `${siteMetadata.disqus.siteUrl}/blog/${year}/${month}/${day}/${pathMinusBlog}/`;

  return (
    <main className="container-fluid">
      <Helmet title={`Sean Walsh - ${post.frontmatter.title}`} />
      <div className="row">
        <article className="col-md-8 col-lg-7 col-xl-5 center-block">
          <BlogHeader {...post.frontmatter} />
          <div className="content full-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
      <div className="row">
        <div className="col-md-8 col-lg-7 col-xl-5 center-block">
          <h1> Comments</h1>
          {post.frontmatter.comments
            ? <ReactDisqusComments
                shortname={siteMetadata.disqus.shortName}
                identifier={disqusId}
                title={post.frontmatter.title}
                url={post.frontmatter.path}
              />
            : <p>Comments are disabled for this post.</p>}
        </div>
      </div>
    </main>
  );
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
`;
