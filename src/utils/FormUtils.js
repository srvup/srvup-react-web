import React from 'react'

function FormErrorText (props) {
  return (
    <span>
      { props.error &&
      <small className={`${props.className ? props.className : 'text-danger'}`}>
        {props.error.map((data, index) => (<span key={index}>{data}</span>))}
      </small>}
    </span>
  )
}

export {
  FormErrorText
}
