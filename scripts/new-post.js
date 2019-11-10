/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { argv } = require('yargs')
const matter = require('gray-matter')
const slugify = require('slugify')
const sanitize = require('sanitize-filename')
const { pipe, toLower, replace } = require('ramda')

const removeAnnoyingChars = replace(/[\(\)\.]/g, '')
const cleanTitle = pipe(removeAnnoyingChars, toLower, sanitize, slugify)

const stringify = (yaml) => matter.stringify('', yaml)
const fixPathQuotes = replace(/path: (.+)/i, `path: '$1'`)
const getContent = pipe(stringify, fixPathQuotes)

const { title, dir } = argv
const slug = cleanTitle(title)
const date = new Date().toISOString()
const [, year, month, day] = date.match(/^(\d{4})-(\d{2})-(\d{2})/)

const yaml = {
  title,
  date,
  comments: true,
  path: `/blog/${slug}`,
  published: true,
}

const folder = path.join(dir, `${year}-${month}-${day}-${slug}`)
const file = path.join(folder, 'index.md')
const content = getContent(yaml)

mkdirp.sync(folder)
fs.writeFileSync(file, content, 'UTF-8')
