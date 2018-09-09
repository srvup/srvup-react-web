import React from 'react'
import { Route} from 'react-router-dom'
import {PostContextProvider} from './context'

function PostsRoute ({ component: Component, ...rest }) {
  return <Route {...rest} render={props => (<PostContextProvider> <Component {...props} />
        </PostContextProvider> )} />
}

export {
  PostsRoute
}
