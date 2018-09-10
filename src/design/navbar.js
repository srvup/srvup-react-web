import React, {Component} from 'react'

import {Link} from '../utils'
const brandName =  process.env.REACT_APP_BRAND_NAME || process.env.REACT_APP_NAME || process.env.REACT_APP_PROJECT_NAME ||  window.location.hostname
class Navbar extends Component {
  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-0 border-bottom mb-4">
          <Link className="navbar-brand" to="/">{brandName}</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                 <Link className='nav-link' to='/about'>About</Link>
                <Link className='nav-link' to='/posts'>Posts</Link>
                <Link className='nav-link pr-0' to='/contact'>Contact</Link>
            </div>
          </div>
        </nav>


    )
  }
}

export {Navbar}
