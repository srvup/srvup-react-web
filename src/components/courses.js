import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import {withUser} from '../auth'
import {Comments} from '../comments'
import {API_PUBLIC_KEY} from '../config'
import {Loading, Page404, Markdown} from '../design'
import {File} from './files'
import {Link} from '../utils/'

import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)


class CourseDetailComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      course: {
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
          course: data,
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
      srvup.courses(this.handleResponse, slug)
    }
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {course} = this.state
    console.log(course)
    const {loading} = this.state
    const {status} = this.state
    const comments = this.state.course.comments
    return ( <div className='py-3'>
        <Loading className='text-center' isLoading={loading} />
        {course && <div className=''>
            <div className='row'>
          <div className='col-12 col-md-6'>
            <h1>{course.title}</h1>
            

            {course.content && <Markdown>{course.content}</Markdown>}
             
           </div>

             {course.video &&  <div className='col-12 col-md-6'><File className='' resource={course.video} /></div>}
               {(course.image && !course.video) && 
                  <div className='col-12 col-md-6'>
                    <img className='img-fluid' src={course.image} alt={`${course.title} thumbnail`} /> 
                  </div>
                }
             </div>
            {course.lessons &&  <div className='my-5 row'>
               {course.lessons.length > 0  && <div className='col-12'>
                 <h3>Lessons</h3>
                 <div className='list-group'>
                    {course.lessons.length > 0 && course.lessons.map((lesson, index)=>{
                    return <Link key={index} className='list-group-item' to={`/courses/${course.slug}/lessons/${lesson.slug}`}>{lesson.order} {lesson.title}</Link>
                  })}
                    </div>

                </div>
                }
                </div>
             }

          {course.displayComments && <div className='row mt-5'>
            <Comments user={this.props.user} className='col-12 ' count={comments.count} path={comments.path} />
            </div>
          }
          </div>
       }

       {status === 404 && loading === false ? <Page404/> : ""}

      </div>
     )
  }
}


export const CourseDetail = withUser(withRouter(CourseDetailComponent))


class CoursesComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      courses: [],
      count: 0,
      loading: true,
    }
  }

  handleResponse = (data, status) =>{
     if (!this.cancelLookup){
      if (status === 200){
        this.setState({
          courses: data.results,
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
      srvup.courses(this.handleResponse)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }

  render () {
    const {courses} = this.state
    return (
        <div className='py-3'>
          <Loading className='text-center' isLoading={this.state.loading} />
          {courses.length > 0 && courses.map((data, index)=>{
           return <div className='border-bottom mb-3' key={index}>
             {data.image && 
               <Link default to={`/courses/${data.slug}`}>
                 <img src={data.image} alt={`${data.title} thumbnail`} width={300} /> 
                </Link>
              }
             <h1><Link default to={`/courses/${data.slug}`}>{data.title}</Link></h1>
             {data.content && <Markdown>{data.content}</Markdown>}

           

             </div>
          })}
        </div>
    )
  }
}


const Courses = withRouter(CoursesComponent)
export default Courses

