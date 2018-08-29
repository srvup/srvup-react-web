import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {Comments} from '../comments'
import {API_PUBLIC_KEY} from '../config'
import {Loading, Page404} from '../design'
import {Link} from '../utils/'

import srvup, {Markdown} from 'srvup'
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
    const {loading} = this.state
    const {status} = this.state
    const comments = this.state.course.comments
    return ( <div className='py-3'>
        <Loading className='text-center' isLoading={loading} />
        {course && <div>
          <h1>{course.title}</h1>
          {course.content && <Markdown>{course.content}</Markdown>}
            

          {course.lessons &&  <div className='my-5'>
           {course.lessons.length > 0  && <div>
             <h3>Lessons</h3>
                {course.lessons.length > 0 && course.lessons.map((lesson, index)=>{
                return <li key={index}><Link to={`/courses/${course.slug}/lessons/${lesson.slug}`}>{lesson.order} {lesson.title}</Link></li>
              })}

            </div>
            }
            </div>
           }

          {course.displayComments && <Comments count={comments.count} path={comments.path} />}
          </div>
       }

       {status === 404 && loading === false ? <Page404/> : ""}

      </div>
     )
  }
}


export const CourseDetail = withRouter(CourseDetailComponent)


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

