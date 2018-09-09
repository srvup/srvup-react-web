import React, {Component } from 'react'

import {API_PUBLIC_KEY, History} from './../config'
import {parseQueryString, 
      isSafeRedirect} from './../utils'

import srvup, {handleLoginRequired} from 'srvup'
srvup.api(API_PUBLIC_KEY)

export const UserContext = React.createContext()

export class UserContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      loading: false,
      hasLoginErrors: false,
      hasRegisterErrors: false,
      user: null,
      errorsLogin: {},
      errorsRegister: {}
    }
  }


  authRequired = (status) => {
      handleLoginRequired(status, History)
  }

  componentDidMount(){
     this.isLoggedIn()
   }

  isLoggedIn = _ => {
      let loggedIn = srvup.isLoggedIn()
     if (!this.isCancelled) {
       this.setState({
         loggedIn:loggedIn
       })
     }
  }
  verifyUser = _ => {
     srvup.verifyUser((response, status)=>{
       if (!this.isCancelled){
         this.setState({
           loggedIn: status === 200 ? true : false,
         })
       }
     })
  }

  doRegister = (registrationData) => {
    srvup.register(registrationData, this.handleRegisterResponse)
  }

  handleRegisterResponse = (data, status) =>{
    if (!this.isCancelled){
      if (status === 201){
        this.setState({
          token: data.token,
          user: data.user,
          loading: false,
          hasRegisterErrors: false,
          errorsRegister: {}
        })
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
          loading: false,
          hasRegisterErrors: true,
          errorsRegister: data
        })
      }
     }
  }

  clearErrors = _ => {
    if (!this.isCancelled) {
      if (this.state.hasRegisterErrors || this.state.hasLoginErrors){
          this.setState({
            hasRegisterErrors: false,
            hasLoginErrors: false,
            errorsLogin: {},
            errorsRegister: {}
          })
       }
    }
  }

  doLogin = (username, password) => {
    if (!this.isCancelled) {
      this.setState({
        loading: true
      })
    
      srvup.login(username, password, this.handleLoginResponse)
    }
  }

  handleLoginResponse = (data, status) =>{
    if (!this.isCancelled){
      if (status === 200){
            this.setState({
              loading: false,
              user: data.user,
              loggedIn: true,
              hasLoginErrors: false,
              errorsLogin: {}
            })
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
            loading: false,
            hasLoginErrors: true,
            errorsLogin: data,
          })
        }
      }
    }

   componentWillUnmount() {
    this.isCancelled = true;
  }

  render () {
    return (<UserContext.Provider value={{
      state: this.state,
      isLoggedIn: this.isLoggedIn,
      verifyUser: this.verifyUser,
      authRequired: this.authRequired,
      clearErrors: this.clearErrors,
      login: this.doLogin,
      register: this.doRegister
    }}>
      {this.props.children}
    </UserContext.Provider>
    )
  }
}

export function withUser(Component) {
  // ...and returns another component...
  return function UserContextComponent (props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <UserContext.Consumer>
        {context => <Component {...props} user={context} />}
      </UserContext.Consumer>
    )
  }
}