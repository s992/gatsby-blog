/* eslint-disable @typescript-eslint/no-var-requires */
const postcssImport = require(`postcss-import`)
const postcssPresentEnv = require(`postcss-preset-env`)
const postcssBrowserReporter = require(`postcss-browser-reporter`)
const postcssReporter = require(`postcss-reporter`)

module.exports = () => ({
  plugins: [postcssImport(), postcssPresentEnv(), postcssBrowserReporter(), postcssReporter()],
})
