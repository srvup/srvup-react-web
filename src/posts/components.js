import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {withUser} from '../auth'

import {Comments} from '../comments'

import { HeadHelmet } from '../http'

import {Loading, Page404, Markdown} from '../design'

import {withPosts} from './context'
import {Link} from '../utils/'


import {API_PUBLIC_KEY} from './../config'
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

  handleEmailCapture = (data) =>{
    srvup.post('/marketing/email-captures/', data, (response, status)=>{
      console.log(response)
    })
  }




  componentDidMount () {
    let slug = this.props.match.params.slug || this.props.slug
    if (!this.cancelLookup){
      srvup.posts(this.handleResponse, slug)
    }
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {post, loading} = this.state
    const comments = this.state.post.comments
    return ( <div className='py-3'>
      <Loading className='text-center' isLoading={loading} />
      {post && <div>
          <HeadHelmet pageTitle={`${post.title} | Post`} />
          <h1>{post.title}</h1>
          {post.content && <Markdown>{post.content}</Markdown>}

         
          {post.displayComments && <Comments user={this.props.user} count={comments.count} path={comments.path} />}
          </div>

       }
       {post === null && loading === false ? <Page404 /> : ""}

      </div>
     )
  }
}


export const PostDetail = withUser(withPosts(withRouter(PostDetailComponent)))


class PostsComponent extends Component {
  render () {
    const {posts, next, loading} = this.props.posts.state //this.state
    return (
        <div className='py-3'>
        <Loading className='text-center' isLoading={loading} />
         {!this.props.hideHelment && <HeadHelmet pageTitle={`Posts`} />}
          {posts.length > 0 && posts.map((data, index)=>{
           return <div className='border-bottom mb-3 pb-5' key={index}>
             <h1><Link default to={`/posts/${data.slug}`}>{data.title}</Link></h1>
             {data.content && <Markdown previewCutoff >{data.content}</Markdown>}
             </div>
          })}
          {next && <button className='btn btn-primary' onClick={this.props.posts.getNext}>Load more</button>}
        </div>
    )
  }
}


const Posts = withUser(withPosts(withRouter(PostsComponent)))
export default Posts

