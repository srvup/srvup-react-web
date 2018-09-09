import React from 'react'
import { Route} from 'react-router-dom'

import {UserContextProvider} from './../auth'
import {PostContextProvider} from './context'

function PostsRoute ({ component: Component, ...rest }) {
  return <Route {...rest} render={props => (
        <UserContextProvider>
            <PostContextProvider> 
              <Component {...props} />
            </PostContextProvider>
        </UserContextProvider> 
        )} />
}

export {
  PostsRoute
}
