import React, {Component } from 'react'

import {Lookup} from './../http'

export const CommentContext = React.createContext()

export class CommentContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      loading: true,
      next: null
    }
  }

  componentDidMount () {
    this.doLookup()
  }

  doLookup(){
    if (!this.isCancelled) {
       let endpointPath = `/comments/`
       let lookup = new Lookup(endpointPath)
       lookup.get(this.handleCommentsRequest)
    }
  }

  handleCommentsRequest = (requestResponse, status)=> {
     if (status === 200 ){
      if (requestResponse && !this.isCancelled){
           this.setState({
             comments: requestResponse.results,
             loading: false,
             next: requestResponse.next
           })
        } 
     } 
  }


  componentWillUnmount() {
    this.isCancelled = true;
  }

  render () {
    return (<CommentContext.Provider value={{
      state: this.state,
    }}>
      {this.props.children}
    </CommentContext.Provider>
    )
  }
}


export function withComments (Component) {
  // ...and returns another component...
  return function CommentContextComponent (props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <CommentContext.Consumer>
        {context => <Component {...props} comments={context} />}
      </CommentContext.Consumer>
    )
  }
}