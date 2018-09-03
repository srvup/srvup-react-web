import React, { Component } from 'react'

import {API_PUBLIC_KEY} from '../config'

import srvup from 'srvup'
srvup.api(API_PUBLIC_KEY)


class FileComponent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            file: null

        }
    }
    handleResponse = (response, status) => {
        if (status === 200 && !this.cancelLookup){
            console.log(response)
            this.setState({
                file: response
            })
        }
    }
   
   componentDidMount () {
    let resource = this.props.resource
    if (resource && !this.cancelLookup){
      srvup.get(`/files/${resource}`, this.handleResponse)
    }
  }

  componentWillUnmount () {
    this.cancelLookup = true
  }

  render () {
      const {file} = this.state
      return (<div {...this.props}>
          {file && 
              <div>
                  {file.type === 'video' && 
                    <div>
                          {file.url && 
                                <div className="embed-responsive embed-responsive-16by9">
                                <video className="embed-responsive-item" src={file.url} controls/>
                                </div>
                              }
                   </div>
                  }

                   {file.type === 'audio' && 
                    <div>
                          {file.url && 
                                <div className="embed-responsive embed-responsive-16by9">
                                <video className="embed-responsive-item" src={file.url} controls/>
                                </div>
                              }
                   </div>
                  }
              </div>
          }
      </div>)
  }

}

export const File = FileComponent