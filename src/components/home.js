import React, {Component} from 'react'

import {HeadHelmet} from './../http'


const defaultPage =  process.env.REACT_APP_DEFAULT_HOME ? process.env.REACT_APP_DEFAULT_HOME  : null

import {PageDetail} from './pages'
import {Posts} from './../posts'

class HomePage extends Component {
    render (){
        return(
            <div>
            <HeadHelmet />
            {defaultPage ? 
                    <PageDetail slug={defaultPage} /> : 
                    <Posts hideHelment />
            }
            
            </div> 
        )
    }
}

export default HomePage