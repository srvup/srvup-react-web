import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {Comments} from '../comments'
import {API_PUBLIC_KEY} from './../config'
import {HeadHelmet, Loading, Page404} from '../design'

import {Link} from '../utils/'

import srvup, {Markdown} from 'srvup'
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
        publish: null,
        displayComments: false,
        comments: {count: 0, path: ""}
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
      srvup.posts(this.handleResponse, slug)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {post} = this.state
    const comments = this.state.post.comments
    return ( <div className='py-3'>
      <Loading className='text-center' isLoading={this.state.loading} />
      {post && <div>
          <HeadHelmet pageTitle={`${post.title} | Post`} />
          <h1>{post.title}</h1>
          {post.content && <Markdown>{post.content}</Markdown>}

         
          {post.displayComments && <Comments count={comments.count} path={comments.path} />}
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
      next: null,
      count: 0,
      loading: true
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

  getNext = (event) =>{
    if (!this.cancelLookup && this.state.next){
      srvup.get(this.state.next, this.handleResponse)
    }
    
  }
  componentDidMount () {
    if (!this.cancelLookup) {
      srvup.posts(this.handleResponse)
      // srvup.get('/posts/', this.handleResponse, false)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }
  render () {
    const {posts} = this.state
    return (
        <div className='py-3'>
        <Loading className='text-center' isLoading={this.state.loading} />
         {!this.props.hideHelment && <HeadHelmet pageTitle={`Posts`} />}
          {posts.length > 0 && posts.map((data, index)=>{
           return <div className='border-bottom mb-3 pb-5' key={index}>
             <h1><Link default to={`/posts/${data.slug}`}>{data.title}</Link></h1>
             {data.content && <Markdown previewCutoff>{data.content}</Markdown>}
             </div>
          })}
          {this.state.next && <button className='btn btn-primary' onClick={this.getNext}>Load more</button>}
        </div>
    )
  }
}


const Posts = withRouter(PostsComponent)
export default Posts

