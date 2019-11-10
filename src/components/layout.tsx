import React from 'react'
import Helmet from 'react-helmet'
import 'prism-themes/themes/prism-ghcolors.css'

import { siteMetadata } from '../../gatsby-config'
import Header from '../components/header'
import Footer from '../components/footer'

import '../scss/site.scss'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={siteMetadata.title} />
        <Header title={siteMetadata.title} />
        <main className="container-fluid">{this.props.children}</main>
        <Footer socialLinks={siteMetadata.socialLinks} />
      </div>
    )
  }
}
