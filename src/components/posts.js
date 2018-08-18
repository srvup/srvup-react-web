import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {API_PUBLIC_KEY} from './../config'
import {Page404} from '../design'
import {Link, Markdown} from '../utils/'

import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)


class PostDetailComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      post: {
        slug: "", 
        title: "", 
        content: "", 
        draft: false, 
        publish: null
      },
      loading: true
    }
  }

  handleResponse = (data, status) =>{
    if (!this.cancelLookup) {
      if (status === 200){
        this.setState({
          post: data,
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
    let slug = this.props.match.params.slug || this.props.slug
    if (slug && !this.cancelLookup){
      srvup.get(`/posts/${slug}/`, this.handleResponse)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {post} = this.state
    return ( <div className='py-3'>

      {post && <div>
          <h1>{post.title}</h1>
          {post.content && <Markdown>{post.content}</Markdown>}
          </div>
       }
       {post === null && this.state.loading === false ? <Page404 /> : ""}

      </div>
     )
  }
}


export const PostDetail = withRouter(PostDetailComponent)


class PostsComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      count: 0
    }
  }

  handleResponse = (data, status) =>{
    // console.log(data)
    if (!this.cancelLookup) {
    if (status === 200){
      this.setState({
        posts: data.results,
        count: data.count
      })
    }
    }
  }
  componentDidMount () {
    // let lookup = new Lookup('/posts/')
    // lookup.get(this.handleResponse)
    if (!this.cancelLookup) {
      srvup.get(`/posts/`, this.handleResponse)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }
  render () {
    const {posts} = this.state
    return (
        <div className='py-3'>
          {posts.length > 0 && posts.map((data, index)=>{
           return <div className='border-bottom mb-3' key={index}>
             <h1><Link default to={`/posts/${data.slug}`}>{data.title}</Link></h1>
             {data.content && <Markdown>{data.content}</Markdown>}
             </div>
          })}
        </div>
    )
  }
}


const Posts = withRouter(PostsComponent)
export default Posts

