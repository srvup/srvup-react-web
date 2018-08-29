import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'


import {Comments} from '../comments'
import {File} from './files'
import {API_PUBLIC_KEY} from '../config'
import {Loading, Page404} from '../design'

import srvup, {Markdown} from 'srvup'


srvup.api(API_PUBLIC_KEY)


class LessonDetailComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      lesson: {
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
          lesson: data,
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
    let courseSlug = this.props.match.params.courseSlug || this.props.courseSlug
    let lessonSlug = this.props.match.params.lessonSlug || this.props.lessonSlug
    if (courseSlug && lessonSlug && !this.cancelLookup){
      srvup.lessons(this.handleResponse, courseSlug, lessonSlug)
    }
    
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }


  render() {
    const {lesson} = this.state
    console.log(lesson)
    const {loading} = this.state
    const {status} = this.state
    const comments = this.state.lesson.comments
    return ( <div className='py-3'>
        <Loading className='text-center' isLoading={loading} />
        {lesson && <div>
          <h1>{lesson.title}</h1>
          {lesson.content && <Markdown>{lesson.content}</Markdown>}

          {lesson.video && <File className='my-5' resource={lesson.video} />}
            

          {lesson.displayComments && <Comments count={comments.count} path={comments.path} />}
          </div>
       }

       {status === 404 && loading === false ? <Page404/> : ""}

      </div>
     )
  }
}


export const LessonDetail = withRouter(LessonDetailComponent)


// class LessonsComponent extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       lessons: [],
//       count: 0,
//       loading: true,
//     }
//   }

//   handleResponse = (data, status) =>{
//      if (!this.cancelLookup){
//       if (status === 200){
//         this.setState({
//           lessons: data.results,
//           count: data.count,
//           loading: false,
//         })
//       } else {
//         this.setState({
//           loading: false
//         })
//       }
//     }
//   }
//   componentDidMount () {
//     if (!this.cancelLookup){
//        let courseSlug = this.props.match.params.courseSlug || this.props.courseSlug
    
//       if (courseSlug && lessonSlug && !this.cancelLookup){
//         srvup.lessons(this.handleResponse, courseSlug)
//       }
     
//     }
    
//   }

//   componentWillUnmount () {
//     this.cancelLookup = true
//   }

//   render () {
//     const {lessons} = this.state
//     return (
//         <div className='py-3'>
//           <Loading className='text-center' isLoading={this.state.loading} />
//           {lessons.length > 0 && lessons.map((data, index)=>{
//            return <div className='border-bottom mb-3' key={index}>
//              <h1><Link default to={`/lessons/${data.slug}`}>{data.title}</Link></h1>
//              {data.content && <Markdown>{data.content}</Markdown>}

           

//              </div>
//           })}
//         </div>
//     )
//   }
// }


// const Lessons = withRouter(LessonsComponent)
// export default Lessons

