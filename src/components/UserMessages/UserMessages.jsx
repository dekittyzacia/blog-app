import React from 'react'
import { Spin } from 'antd'

import './UserMessages.scss'

export const ErrorMessage = ({ errorMsg }) => {
  return (
    <div className="message-block">
      <h2>Something went wrong, so, please, try again later</h2>
      <p>Error Status: {errorMsg}</p>
    </div>
  )
}

export const LoadingSpinner = () => {
  return (
    <div className="message-block">
      <Spin />
    </div>
  )
}
