import React, {Component} from 'react'

import {
  NavLink as RouterLink
} from 'react-router-dom'

class Link extends Component {
  render () {
    return (
      <RouterLink className={`${this.props.className && this.props.className}`} {...this.props}>{this.props.children}</RouterLink>
    )
  }
}

const SidebarLink = (props) => (
  <Link className='no-underline' activeClassName='border-left border-primary pl-2 semi-bold' {...props}>{props.children}</Link>
)

export {SidebarLink, Link}
