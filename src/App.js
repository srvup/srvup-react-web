import React, { Component } from 'react'

import { Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import {History} from './config'
import {LoginPage, RegisterPage} from './components/auth'

import Courses, {CourseDetail} from './components/courses'
import HomePage from './components/home'
import {LessonDetail} from './components/lessons'

import Pages, {PageDetail} from './components/pages'
import {Posts, PostDetail} from './posts'

import {Page404, Navbar, AboutPage, ContactPage} from './design'
import {HeadHelmet} from './design'
import './design/markdown.css'

class App extends Component {
  render () {
    return (
      <Router history={History}>

        <div className='App'>
          <HeadHelmet />
          <div className='App-intro container'>
            <Navbar />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/contact' component={ContactPage} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/courses' component={Courses} />
              <Redirect exact from='/course' to='/courses' />
              <Route exact path='/courses/:slug' component={CourseDetail} />
              <Route exact path='/courses/:slug/lessons' component={CourseDetail} />
              <Route exact path='/courses/:courseSlug/lessons/:lessonSlug' component={LessonDetail} />
              <Route exact path='/pages' component={Pages} />
              <Redirect exact from='/page' to='/pages' />
              <Route exact path='/pages/:slug' component={PageDetail} />
              <Route exact path='/posts' component={Posts} />
              <Redirect exact from='/post' to='/posts' />
              <Route exact path='/posts/:slug' component={PostDetail} />

              
              <Route component={Page404} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
