import React, {Component} from 'react'

import {HeadHelmet} from './../http'
import {Posts} from './../posts'

class HomePage extends Component {
    render (){
        return(
            <div>
            <HeadHelmet />
            <Posts hideHelment />
            </div> 
        )
    }
}

export default HomePage