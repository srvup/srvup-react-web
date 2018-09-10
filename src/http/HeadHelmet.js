import React, {Component} from 'react'
import {Helmet} from 'react-helmet'



const currentUrl = window.location.href
const hostname = window.location.hostname
const rootTitle = process.env.REACT_APP_BRAND_NAME || process.env.REACT_APP_NAME || process.env.REACT_APP_PROJECT_NAME || hostname
const rootPath = `${window.location.protocol}//${window.location.hostname}`

class HeadHelmet extends Component {
  render () {
    const description = 'Srvup.com is an API for digital content. Made for developers, online educators, vloggers, bloggers, and more.'
    const logoLink = 'https://srvup.s3-us-west-1.amazonaws.com/static/img/logo/srvup_logo.jpg'
    const pageTitle = this.props.pageTitle ? `${this.props.pageTitle} | ` : ''
    return (
      <Helmet>
        <meta charSet='utf-8' />
        <title>{pageTitle}{rootTitle}</title>
        <link rel='site' href={rootPath} />
        <link rel='canonical' href={currentUrl} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={currentUrl} />
        <meta property='og:image' content={logoLink} />
        <meta property='og:description' content={description} />
      </Helmet>
    )
  }
}

export default HeadHelmet
