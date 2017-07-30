const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve('src/templates/blog-post.js');
  const paginationTemplate = path.resolve('src/templates/pagination.js');

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      totalCount
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {},
      });
    });

    // the home page counts as a "page" but we aren't generating anything for it, so skip it here.
    const pages = result.data.allMarkdownRemark.totalCount % 5 - 1;

    for (let i = 1; i <= pages; i++) {
      const nextPage = i === pages ? null : `/blog/${i + 1}`;
      const prevPage = i - 1 === 0 ? `/` : `/blog/${i - 1}`;

      createPage({
        path: `/blog/${i}`,
        component: paginationTemplate,
        idx: i,
        context: {
          next: nextPage,
          prev: prevPage,
          offset: i * 5,
        },
      });
    }
  });
};
