import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { solarizedDark as dark} from 'react-syntax-highlighter/styles/hljs'
import emoji from 'emoji-dictionary'
import shortcodes from 'remark-shortcodes'

import './markdown.css'

// const emojiSupport = text => text.replace(/:\w+:/gi, name => emoji.getUnicode(name))

function emojiSupport (text) {
  return (text.replace(/:\w+:/gi, name => emoji.getUnicode(name))
  )
}

function CodeRender (props) {
  let lang = props.language ? props.language : 'javascript'
  return (props.value
    ? <SyntaxHighlighter language={lang} style={dark}>{props.value}</SyntaxHighlighter> : '')
}

function BlockquoteRender (props) {
  return (props.children
    ? <blockquote className='blockquote border-left text-gray pl-3'>{props.children}</blockquote> : '')
}

export class UserMarkdown extends Component {
  render () {
    const {input} = this.props
    const disallowed = ['image', 'html']
    return (
      <ReactMarkdown className='jm-markdown' source={input} disallowedTypes={disallowed} />
    )
  }
}

// [[ youtube id=Ck919PpxMKY ]]

function youtubeUrlParser (url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

function handleYouTubeRender (attributes) {
  for (let key in attributes) {
    if (key === 'id' && attributes[key].length > 0) {
      return `https://www.youtube.com/embed/${attributes[key]}`
    } else if (key === 'v' && attributes[key].length > 0) {
      return `https://www.youtube.com/embed/${attributes[key]}`
    } else if (key === 'url' && attributes[key].length > 0) {
      const id = youtubeUrlParser(attributes[key])
      return `https://www.youtube.com/embed/${id}`
    } else {
      return ''
    }
  }
}

// [[ youtube id=Ck919PpxMKY ]]
function ShortCodeRenderer (props) {
  const {attributes} = props
  const {identifier} = props
  let embed = ''
  let srvupItem = ''
  if (identifier === 'youtube') {
    if (attributes) {
      embed = handleYouTubeRender(attributes)
    }
  } else if (identifier === 'srvup') {
    if (attributes) {
      srvupItem = `Srvup item is ${attributes['id']}`
    }
  }
  return (
    <div className={`${embed && 'embed-responsive embed-responsive-16by9 mb-3'}`}>
      {srvupItem && <div>{srvupItem}</div>}
      {embed && <iframe
        src={embed}
        title={embed}
        className='embed-responsive-item'
        width='560'
        height='315'
        allow='autoplay; encrypted-media'
        allowFullScreen
        frameBorder='0'
        controls
      />}

    </div>

  )
}

class Markdown extends Component {
  render () {
    const previewClass = this.props.preview === true ? 'markdown-preview' : ''
    const largePreviewClass = this.props.largePreview === true ? 'markdown-large-preview' : ''
    const minHeightClass = this.props.minHeight ? 'jm-markdown' : ''
    const disallowed = []
    return (
      <ReactMarkdown
        className={`${this.props.className} ${previewClass} ${largePreviewClass} ${minHeightClass}`}
        source={this.props.children}
        disallowedTypes={disallowed}
        plugins={[shortcodes]}
        renderers={{
          blockquote: BlockquoteRender,
          code: CodeRender,
          text: emojiSupport,
          shortcode: ShortCodeRenderer}}
      />
    )
  }
}
export default Markdown
