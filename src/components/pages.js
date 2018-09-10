import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {withUser} from '../auth'

import {Comments} from '../comments'
import {API_PUBLIC_KEY} from '../config'
import {HeadHelmet} from '../http'
import {Loading, Page404, Markdown} from '../design'
import {Link} from '../utils/'

import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)


class PageDetailComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: {
        slug: "", 
        title: "", 
        content: "", 
        draft: false, 
        publish: null,
        displayComments: false,
        comments: {count: 0, path: ""}
      },
      status: 0,
      loading: true
    }
  }

  handleResponse = (data, status) =>{
    if (!this.cancelLookup) {
      if (status === 200){
        this.setState({
          page: data,
          status: status,
          loading: false
        })
      } else {
        this.setState({
          status: status,
          loading: false
        })
      }
     }
  }


  componentDidMount () {
    let slug = this.props.match.params.slug || this.props.slug
    if (slug && !this.cancelLookup){
      srvup.pages(this.handleResponse, slug)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {page} = this.state
    const {loading} = this.state
    const {status} = this.state
    const comments = this.state.page.comments
    return ( <div className='py-3'>
        <Loading className='text-center' isLoading={loading} />
        {page && <div>
          <HeadHelmet pageTitle={page.title} />
          {!this.props.hideTitle && <h1>{page.title}</h1>}
          {page.content && <Markdown className='min-500'>{page.content}</Markdown>}
          
          {page.displayComments && <Comments user={this.props.user} count={comments.count} path={comments.path} />}
          </div>
       }

       {status === 404 && loading === false ? <Page404/> : ""}

      </div>
     )
  }
}


export const PageDetail = withRouter(withUser(PageDetailComponent))


class PagesComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      pages: [],
      count: 0,
      loading: true,
    }
  }

  handleResponse = (data, status) =>{
     if (!this.cancelLookup){
      if (status === 200){
        this.setState({
          pages: data.results,
          count: data.count,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    }
  }
  componentDidMount () {
    if (!this.cancelLookup){
      srvup.pages(this.handleResponse)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }

  render () {
    const {pages} = this.state
    return (
        <div className='py-3 min-500'>
        <HeadHelmet pageTitle={"Pages"} />
          <Loading className='text-center' isLoading={this.state.loading} />
          {pages.length > 0 && pages.map((data, index)=>{
           return <div className='border-bottom mb-3' key={index}>
             <h1><Link default to={`/pages/${data.slug}`}>{data.title}</Link></h1>
             {data.content && <Markdown>{data.content}</Markdown>}
             </div>
          })}
        </div>
    )
  }
}


const Pages = withUser(withRouter(PagesComponent))
export default Pages

