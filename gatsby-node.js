const path = require('path');
const Remark = require('remark');
const find = require('unist-util-find');
const filter = require('unist-util-filter');
const toHAST = require('mdast-util-to-hast');
const hastToHTML = require('hast-util-to-html');

const remark = new Remark().data('settings', {
  commonmark: true,
  footnotes: true,
  pedantic: true,
});

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

// there absolutely has to be a cleaner way to do this, but..
exports.onCreateNode = ({ node, boundActionCreators }) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }

  const { createNode, createNodeField } = boundActionCreators;
  const ast = remark.parse(node.internal.content);
  const more = find(ast, node => node.type === 'html' && node.value === '<!-- more -->');

  if (!more) {
    return createNodeField({ node, name: 'more', value: '' });
  }

  let gotExcerpt = false;

  const excerpt = filter(ast, node => {
    if (gotExcerpt || node.type === 'yaml') {
      return false;
    }

    if (node.type === 'html' && node.value === '<!-- more -->') {
      gotExcerpt = true;
      return false;
    }

    return true;
  });

  const html = hastToHTML(toHAST(excerpt, { allowDangerousHTML: true }), { allowDangerousHTML: true });

  return createNodeField({ node, name: 'more', value: html });
};
