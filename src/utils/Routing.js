import React from 'react'
import {Route as ReactRouterRoute} from 'react-router-dom'


import {
  NavLink as RouterLink
} from 'react-router-dom'



import {UserContextProvider} from './../auth'

function Route ({ component: Component, ...rest }) {
  return <ReactRouterRoute {...rest} render={props => (<UserContextProvider> <Component {...props} />
        </UserContextProvider> )} />
}

const Link = (props) => (
  <RouterLink className={`${!props.default && `${props.className ? props.className : 'btn btn-link p-0'}`}`} {...props}>{props.children}</RouterLink>
)

const SidebarLink = (props) => (
  <Link className='no-underline' activeClassName='border-left border-primary pl-2 semi-bold' {...props}>{props.children}</Link>
)

export {SidebarLink, Link, Route}
