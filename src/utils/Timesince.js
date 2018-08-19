import React from 'react'

import moment from 'moment'

const Timesince = (props) => (
  <span {...props}>{moment(props.timestamp).fromNow()}</span>
)

export {Timesince}
