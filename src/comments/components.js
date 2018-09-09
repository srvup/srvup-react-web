import React, {Component} from 'react'
import {Link, Timesince} from '../utils'
import {API_PUBLIC_KEY, History} from './../config'
import {Loading} from '../design'
import srvup, {Markdown, handleLoginRequired} from 'srvup'

import './comments.css'

srvup.api(API_PUBLIC_KEY)

class CommentFormComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            content: "",
            parent: "",
            path: "",
        }
    }


    handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault()
            this.didSubmit()
        }
     }


    inputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNewComment = (response, status) => {
         if (status === 201 && !this.isCancelled) {
             this.setState({
                 content: '',
             })
             if (this.props.newComment ) {
                 this.props.newComment(response)
             }
         } else {
           handleLoginRequired(status, History)
         }

    }
    didSubmit = (event) => {
        if (event){
            event.preventDefault()
        }
        const {path} = this.props
        srvup.post(path, this.state, this.handleNewComment, true)
    }

    defaultState = () => {
        const {path} = this.props
        const parent = this.props.parent || ""
        if (!this.isCancelled){
            this.setState({
                path: path,
                parent: parent
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.defaultState()
        }
    }
    componentDidMount(){
        this.defaultState()
    }


    componentWillUnmount () {
      this.isCancelled = true
    }
    render (){
        const {content} = this.state
        const location = History.location
        const next = `${location.pathname}${location.search}${location.hash}`
        const btnText = this.props.parent ? "Reply" : "Comment"
        const {loggedIn} = this.props.user.state
        return (
            <div> {loggedIn === false ?
              <p className='border border-rounded bg-light rounded py-5 px-4'>Please <Link to={`/login?next=${next}`}>Login</Link> or <Link to={`/register?next=${next}`}>Register</Link> to comment</p>
              :
              <form onSubmit={this.didSubmit} className={`${this.props.className ? this.props.className : 'my-3 row'}`}>
                {content && 
                 <div className='d-block d-md-none col-12'>
                    <small className='text-muted'>Preview</small>
                   <Markdown input={content} />
                 </div>
               }

                <div className={`col-12 ${content === '' ? "" : "col-md-6" }`}>
                    <div className='form-group mb-1'>
                        <textarea className='form-control' placeholder={`Your ${btnText}`} name='content' value={content} onChange={this.inputChange} onKeyDown={this.handleKeyPress} required='required'></textarea>
                   </div>
               </div>
               {content && 
                 <div className='d-none d-md-block col-md-6'>
                    <small className='text-muted'>Preview</small>
                   <Markdown input={content} />
                 </div>
               }
               <div className='col-12'>
                <button type='submit' className='btn btn-primary'> {btnText} </button>
                </div>
            </form>
          }
          </div>
         )
    }
}




const CommentForm = CommentFormComponent



const CommentReplyInline =(props) => (
        <div className='media'>
        {props.comment.user.image && <img className="align-self-start mr-3 square-64 rounded-circle" src={props.comment.user.image} alt={`${props.comment.user.username} thumbnail`} /> }
            <div className="media-body">
                

                <h5 className="my-0">{props.comment.user.username}</h5>
                <p className='p-0 m-0'><small className='text-muted'><Timesince timestamp={props.comment.timestamp} /></small></p>
                {/*<p className='p-0 m-0'>{comment.content}</p>*/}
                <Markdown input={props.comment.content} />

            </div>
        </div>
    )
class CommentInline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                content: '',
                user: {
                    username: '',
                    image: ''
                }
            },
            replies: []
        }
    }
    handleNewComment = (comment) =>{
        if (this.props.newComment){
            // this.props.newComment(comment)
            let replies = this.state.replies
            replies.push(comment)
            this.setState({
                replies: replies
            })
        }
    }

    defaultState = () => {
        const {replies} = this.props.comment
        const {comment} = this.props
        this.setState({
            comment: comment,
            replies: replies,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.defaultState()
        }
    }
    componentDidMount(){
        this.defaultState()
    }
    render (){
        const {comment} = this.state
        const {replies} = this.state
        return (
            <div className="media border-top py-3">
              {comment.user.image && <img className="align-self-start mr-3 square-64 rounded-circle" src={comment.user.image} alt={`${comment.user.username} thumbnail`} /> }
              <div className="media-body">
                <h5 className="my-0">{comment.user.username}</h5>
                <p className='p-0 m-0'><small className='text-muted'><Timesince timestamp={comment.timestamp} /></small></p>
                {/*<p className='p-0 m-0'>{comment.content}</p>*/}
                <Markdown input={comment.content} />
                <div className='ml-5 pt-2'>
                    {replies.length > 0 && replies.map((reply, index)=>{
                        return <CommentReplyInline comment={reply} key={`reply-${index}`} />
                    })}
                <CommentForm user={this.props.user} path={this.props.path} parent={comment.id} newComment={this.handleNewComment} />
                 </div>
              </div>
            </div>
        )
    }
}

class CommentsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      next: null,
      loading: true,
    }
  }

  grabComments = () => {
    const {path} = this.props
    srvup.comments(path, this.handleComments)

  }
  handleComments = (response, status) => {
     // console.log(response, status)
    if (status === 200 && !this.isCancelled) {
        let currentComments = this.state.comments
        currentComments = currentComments.concat(response.results)
      this.setState({
        comments: currentComments,
        next: response.next,
        loading: false,
      })
    } else {
         this.setState({
            loading: false,
            errorOccured: true
        })
         handleLoginRequired(response, History)
    }
  }

  componentDidMount () {
    const {path} = this.props
    if (path) {
      this.grabComments()
    }
  }

  loadMore = (event) => {
      event.preventDefault()
      const {next} = this.state
      if (next) {
         srvup.get(next, this.handleComments)
      }
  }
  handleNewComment = (comment) => {
      let comments = this.state.comments
      comments.unshift(comment)
      this.setState({
          comments: comments
      })
  }


  componentWillUnmount () {
      this.isCancelled = true
  }
  render () {
    const {comments} = this.state
    const {next} = this.state
    return (
      <div className={`${this.props.className && this.props.className}`}>
        <h5>Comments</h5>
        <Loading isLoading={this.state.loading} />
        <div> 
        
        <CommentForm user={this.props.user}  path={this.props.path} newComment={this.handleNewComment} />
        
        {comments.length > 0 && comments.map((item, index)=>{
             return <CommentInline user={this.props.user}  comment={item} key={index} path={this.props.path} newComment={this.handleNewComment} />
        })}

        {next && <button className='btn btn-outline-primary' onClick={this.loadMore}>Load More</button>}

        </div>
      </div>
    )
  }
}

const Comments = CommentsComponent

export {Comments}
