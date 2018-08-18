import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {API_PUBLIC_KEY} from './../config'
import {Loading, Page404} from '../design'
import {Link, Markdown} from '../utils/'

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
        publish: null
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
      srvup.get(`/pages/${slug}/`, this.handleResponse)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {page} = this.state
    const {loading} = this.state
    const {status} = this.state
    return ( <div className='py-3'>
        <Loading className='text-center' isLoading={loading} />
        {page && <div>
          <h1>{page.title}</h1>
          {page.content && <Markdown>{page.content}</Markdown>}
          </div>
       }

       {status === 404 && loading === false ? <Page404/> : ""}

      </div>
     )
  }
}


export const PageDetail = withRouter(PageDetailComponent)


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
      srvup.get(`/pages/`, this.handleResponse)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }

  render () {
    const {pages} = this.state
    return (
        <div className='py-3'>
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


const Pages = withRouter(PagesComponent)
export default Pages

