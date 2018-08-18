import React, {Component} from 'react'

import {Link} from '../utils'

class Navbar extends Component {
  render () {
    return (
      <nav className='nav justify-content-end'>
        <Link className='nav-link' to='/about'>About</Link>
        <Link className='nav-link' to='/posts'>Posts</Link>
        <Link className='nav-link pr-0' to='/contact'>Contact</Link>
      </nav>

    )
  }
}

export {Navbar}
