import React, { Component } from 'react'

import { Router, Route, Switch, Redirect} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import './App.css'

import {LoginPage, RegisterPage} from './components/auth'
import Posts, {PostDetail} from './components/posts'
import Pages, {PageDetail} from './components/pages'
import {Link} from './utils'
import {Page404, Navbar, AboutPage, ContactPage} from './design'
import {Helmet} from 'react-helmet'

const History = createHistory()

const logo = 'https://srvupcdn.com/c/srvup/fil-yfo5zjdk/srvup_logo.jpg'

class App extends Component {
  render () {
    return (
      <Router history={History}>

        <div className='App'>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Srvup.com Test</title>
            <link rel='canonical' href='https://www.srvup.com/' />
            <meta property='og:title' content='srvup.com' />
            <meta property='og:type' content='article' />
            <meta property='og:url' content='https://www.srvup.com' />
          </Helmet>
          <header className='text-center py-3 bg-srvup text-white link-white no-underline'>
            <Link to='/'><img src={logo} className='App-logo' alt='logo' /></Link>
            <h1 className='App-title'><Link default to='/'>Welcome to Srvup</Link></h1>
          </header>
          <div className='App-intro container'>
            <Navbar />
            <Switch>

              <Route exact path='/' component={Posts} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/contact' component={ContactPage} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/posts' component={Posts} />
              <Redirect exact from='/post' to='/posts' />
              <Route exact path='/posts/:slug' component={PostDetail} />
              <Route exact path='/pages' component={Pages} />
              <Redirect exact from='/page' to='/pages' />
              <Route exact path='/pages/:slug' component={PageDetail} />
              <Route component={Page404} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
