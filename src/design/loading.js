import React from 'react'
import Spinner from 'react-spinkit'

const Loading = (props) => (
  <div className={props.className}>
    {props.isLoading && <div>
      <Spinner name='three-bounce' fadeIn={'none'} overrideSpinnerClassName={'jm-spinner'} className='text-primary' />
      {props.children && props.children}
    </div>
    }
  </div>
)

export {Loading}
