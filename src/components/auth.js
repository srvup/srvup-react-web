import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import {API_PUBLIC_KEY, History} from './../config'
import {FormErrorText, Link} from '../utils'

import {parseQueryString, isSafeRedirect} from './../utils'
import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)


class LoginComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  handleResponse = (data, status) =>{
    // console.log(data)
    if (status === 200){
      this.setState({
        token: data.token,
        loading: false
      })
      srvup.userToken(data.token)
      const searchDict = parseQueryString(History.location.search)
      const next = searchDict.next
      const isSafe = isSafeRedirect(next)
      if (isSafe){
        History.replace(next)
      } else {
        History.replace("/")
      }
    } else {
      this.setState({
        loading: false
      })
    }
  }


  handleInputChange = (event) => {
    event.preventDefault()
    const currentTarget = event.target.name
    const currentValue = event.target.value
    this.setState({
       [currentTarget]: currentValue
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const {username} = this.state
    const {password} = this.state
    srvup.login(username, password, this.handleResponse)
  }


  render() {
    const {errors} = this.state
    return (<div className='col-12 col-md-6 mx-auto my-4'>
        {errors.non_field_errors && 
          <div className='alert alert-danger'>
            <b>Error</b><FormErrorText className='text-dark' error={errors.non_field_errors} />
            </div>
        }
       <form onSubmit={this.handleSubmit}>
         <div className='form-group'>
           <label htmlFor='username'>Username / Email</label>
           <input type='text' 
                 className={`form-control  ${errors.username && 'is-invalid'}`}
                 value={this.state.username} 
                 placeholder='jon.snow / kingofthe@north.com' 
                 name='username' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errors.username} />
         </div>
         <div className='form-group'>
           <label htmlFor='password'>Password</label>
           <input type='password' 
                 className={`form-control ${errors.password && 'is-invalid'}`}
                 value={this.state.password} 
                 placeholder='*******' 
                 name='password' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errors.password} />
         </div>


         <button type='submit' className={`btn ${Object.keys(errors).length ? 'btn-danger disabled' : 'btn-primary'}`}>Login</button>
       </form>
       <Link className='mt-3 btn btn-outline-primary' to='/register'>Register</Link>
      </div>)
  }
}


export const LoginPage = withRouter(LoginComponent)


class RegisterComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      token: null
    }
  }

  handleResponse = (data, status) =>{
    console.log(data, status)
    if (status === 201){
      this.setState({
        token: data.token,
        loading: false
      })
    } else {
      this.setState({
        loading: false,
        errors: data
      })
    }
  }

  handleInputChange = (event) => {
    event.preventDefault()
    const currentTarget = event.target.name
    const currentValue = event.target.value
    this.setState({
       [currentTarget]: currentValue
    })
    if (currentTarget === 'password2') {
      if (currentValue === this.state.password){
          this.setState({
           errors: {
             'password': null,
             'password2': null
           }
         })
      }
       if (currentValue !== this.state.password){
         this.setState({
           errors: {
             'password': ['Passwords must match'],
             'password2': ['Please verify this password matches the above password.']
           }
         })
       }
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const {username} = this.state
    const {email} = this.state
    const {password} = this.state
    const {password2} = this.state
    const data = {username: username, 
                password:  password, 
                password2: password2, 
                email: email}
    const includeAuthToken = false
    srvup.post('/register/', data, this.handleResponse, includeAuthToken)

  }
  componentDidMount () {
  }


  render() {
    const {errors} = this.state
    return (<div className='col-12 col-md-6 mx-auto my-4'>
        {errors.non_field_errors && 
          <div className='alert alert-danger'>
            <b>Error</b><FormErrorText className='text-dark' error={errors.non_field_errors} />
            </div>
        }
       <form onSubmit={this.handleSubmit}>
         <div className='form-group'>
           <label htmlFor='username'>Username</label>
           <input type='text' 
                 className={`form-control  ${errors.username && 'is-invalid'}`}
                 value={this.state.username} 
                 placeholder='Username' 
                 name='username' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errors.username} />
         </div>
         <div className='form-group'>
           <label htmlFor='email'>Email</label>
           <input type='email' 
                 className={`form-control ${errors.email && 'is-invalid'}`}
                 value={this.state.email} 
                 placeholder='Email' 
                 name='email' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errors.email} />
         </div>

         <div className='form-group'>
           <label htmlFor='password'>Password</label>
           <input type='password' 
                 className={`form-control ${errors.password && 'is-invalid'}`}
                 value={this.state.password} 
                 placeholder='*******' 
                 name='password' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errors.password} />
         </div>

         <div className='form-group'>
           <label htmlFor='password2'>Confirm Password</label>
           <input type='password' 
                 className={`form-control ${errors.password2 && 'is-invalid'}`}
                 value={this.state.password2} 
                 placeholder='*******'
                 name='password2' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errors.password2} />
         </div>


         <button type='submit' className={`btn ${Object.keys(errors).length ? 'btn-danger disabled' : 'btn-primary'}`}>Register</button>
       </form>
       <Link className='mt-3 btn btn-outline-primary' to='/login'>Login</Link>
      </div>
     )
  }
}


export const RegisterPage = withRouter(RegisterComponent)

