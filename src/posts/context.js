import React, {Component } from 'react'
import {withRouter} from 'react-router-dom'
import {API_PUBLIC_KEY} from './../config'
import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)

export const PostContext = React.createContext()

export class PostContextProviderComponent extends Component {
   constructor(props){
      super(props)
      this.state = {
        posts: [],
        next: null,
        count: 0,
        loading: true
      }
  }

  getNext = (event) =>{
    if (!this.cancelLookup && this.state.next){
      srvup.get(this.state.next, this.handleResponse)
    }
    
  }


  handleResponse = (data, status) =>{
    console.log(data)
    if (!this.cancelLookup) {
      if (status === 200){
        let currentPosts = this.state.posts
        let newPosts = currentPosts.concat(data.results)
        this.setState({
          posts: newPosts,
          getPostDetail: this.getPostDetail,
          next: data.next,
          count: data.count,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    }
  }

  componentDidMount () {
    if (!this.cancelLookup) {
       srvup.posts(this.handleResponse)
    }
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }

  render () {
    return (<PostContext.Provider value={{
      state: this.state,
      getNext: this.getNext,
      getPostDetail: this.getPostDetail
    }}>
      {this.props.children}
    </PostContext.Provider>
    )
  }
}

export const PostContextProvider = withRouter(PostContextProviderComponent)


export function withPosts (Component) {
  // ...and returns another component...
  return function PostContextComponent (props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <PostContext.Consumer>
        {context => <Component {...props} posts={context} />}
      </PostContext.Consumer>
    )
  }
}