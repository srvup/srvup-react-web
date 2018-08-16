import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {API_PUBLIC_KEY} from './../config'
import {Link} from '../utils/Routing'
import Markdown from '../utils/Markdown'

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
      loading: true
    }
  }

  handleResponse = (data, status) =>{
    if (status === 200){
      this.setState({
        page: data,
        loading: false
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }


  componentDidMount () {
    const {slug} = this.props.match.params
    srvup.get(`/pages/${slug}/`, this.handleResponse)
  }


  render() {
    const {page} = this.state
    return ( <div className='py-3'>

      {page && <div>
          <h1>{page.title}</h1>
          {page.content && <Markdown>{page.content}</Markdown>}
          </div>
       }
       {page === null && this.state.loading === false ? <p>Not found</p> : ""}

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
      count: 0
    }
  }

  handleResponse = (data, status) =>{
    // console.log(data)
    if (status === 200){
      this.setState({
        pages: data.results,
        count: data.count
      })
    }
  }
  componentDidMount () {
    // let lookup = new Lookup('/pages/')
    // lookup.get(this.handleResponse)
    srvup.get(`/pages/`, this.handleResponse)
  }
  render () {
    const {pages} = this.state
    return (
        <div className='py-3'>
          {pages.length > 0 && pages.map((data, index)=>{
           return <div className='border-bottom mb-3' key={index}>
             <h1><Link to={`/pages/${data.slug}`}>{data.title}</Link></h1>
             {data.content && <Markdown>{data.content}</Markdown>}
             </div>
          })}
        </div>
    )
  }
}


const Pages = withRouter(PagesComponent)
export default Pages

