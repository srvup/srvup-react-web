import React, { Component } from 'react'

import {API_PUBLIC_KEY} from './../config'
import srvup, {Markdown as SrvupMarkdown} from 'srvup'
srvup.api(API_PUBLIC_KEY)


class Markdown extends Component {
      handleEmailCapture = (data) =>{
        srvup.post('/marketing/email-captures/', data, (response, status)=>{
          console.log(response)
        })
      }

    render (){
        return (
            <SrvupMarkdown {...this.props} didCaptureEmail={this.handleEmailCapture}>{this.props.children}</SrvupMarkdown>
         )
    }
}

export default Markdown