import React from 'react'

import {
  NavLink as RouterLink
} from 'react-router-dom'

const Link = (props) => (
  <RouterLink className={`${!props.default && `${props.className ? props.className : 'btn btn-link p-0'}`}`} {...props}>{props.children}</RouterLink>
)

const SidebarLink = (props) => (
  <Link className='no-underline' activeClassName='border-left border-primary pl-2 semi-bold' {...props}>{props.children}</Link>
)

export {SidebarLink, Link}
