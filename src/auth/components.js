import React, { Component } from 'react'

import {API_PUBLIC_KEY} from './../config'
import {HeadHelmet} from './../http'
import {FormErrorText, Link} from './../utils'
import {withUser} from './context'

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

  handleInputChange = (event) => {
    event.preventDefault()
    this.props.user.clearErrors()
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
    this.props.user.login(username, password)
  }


  render() {
    const {errorsLogin, hasLoginErrors} = this.props.user.state
    return (<div className='col-12 col-md-6 mx-auto my-4'>
      <HeadHelmet pageTitle={'Login'} />
        {errorsLogin.non_field_errors && 
          <div className='alert alert-danger'>
            <b>Error</b><FormErrorText className='text-dark' error={errorsLogin.non_field_errors} />
            </div>
        }
       <form onSubmit={this.handleSubmit}>
         <div className='form-group'>
           <label htmlFor='username'>Username / Email</label>
           <input type='text' 
                 className={`form-control  ${errorsLogin.username && 'is-invalid'}`}
                 value={this.state.username} 
                 placeholder='jon.snow / kingofthe@north.com' 
                 name='username' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errorsLogin.username} />
         </div>
         <div className='form-group'>
           <label htmlFor='password'>Password</label>
           <input type='password' 
                 className={`form-control ${errorsLogin.password && 'is-invalid'}`}
                 value={this.state.password} 
                 placeholder='*******' 
                 name='password' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errorsLogin.password} />
         </div>


         <button type='submit' className={`btn ${hasLoginErrors ? 'btn-danger disabled' : 'btn-primary'}`}>Login</button>
       </form>
       <Link className='mt-3 btn btn-outline-primary' to='/register'>Register</Link>
      </div>)
  }
}


export const LoginPage = withUser(LoginComponent)


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
  handleInputChange = (event) => {
    event.preventDefault()
    this.props.user.clearErrors()
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
    // const includeAuthToken = false
    //srvup.post('/register/', data, this.handleResponse, includeAuthToken)
    this.props.user.register(data)

  }
  componentDidMount () {
  }


  render() {
    const {errorsRegister, hasRegisterErrors} = this.props.user.state
    return (<div className='col-12 col-md-6 mx-auto my-4'>
       <HeadHelmet pageTitle={'Register'} />
  

            {errorsRegister.non_field_errors && 
              <div className='alert alert-danger'>
                <b>Error</b> <FormErrorText className='text-dark' error={errorsRegister.non_field_errors} />
                </div>
            }
   
       
       <form onSubmit={this.handleSubmit}>
         <div className='form-group'>
           <label htmlFor='username'>Username</label>
           <input type='text' 
                 className={`form-control  ${errorsRegister.username && 'is-invalid'}`}
                 value={this.state.username} 
                 placeholder='Username' 
                 name='username' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errorsRegister.username} />
         </div>
         <div className='form-group'>
           <label htmlFor='email'>Email</label>
           <input type='email' 
                 className={`form-control ${errorsRegister.email && 'is-invalid'}`}
                 value={this.state.email} 
                 placeholder='Email' 
                 name='email' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errorsRegister.email} />
         </div>

         <div className='form-group'>
           <label htmlFor='password'>Password</label>
           <input type='password' 
                 className={`form-control ${errorsRegister.password && 'is-invalid'}`}
                 value={this.state.password} 
                 placeholder='*******' 
                 name='password' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errorsRegister.password} />
         </div>

         <div className='form-group'>
           <label htmlFor='password2'>Confirm Password</label>
           <input type='password' 
                 className={`form-control ${errorsRegister.password2 && 'is-invalid'}`}
                 value={this.state.password2} 
                 placeholder='*******'
                 name='password2' 
                 onChange={this.handleInputChange} 
                 required='required' />
           <FormErrorText error={errorsRegister.password2} />
         </div>


         <button type='submit' className={`btn ${hasRegisterErrors ? 'btn-danger disabled' : 'btn-primary'}`}>Register</button>
       </form>
       <Link className='mt-3 btn btn-outline-primary' to='/login'>Login</Link>
      </div>
     )
  }
}


export const RegisterPage = withUser(RegisterComponent)

