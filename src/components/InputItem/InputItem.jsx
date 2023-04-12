import React from 'react'

import './InputItem.scss'

const InputItem = React.forwardRef(({ type, label, className, ...props }, ref) => {
  const inputLabel = label ? label : null

  return (
    <label className={'input__label'}>
      {inputLabel}
      <input type={type} ref={ref} className={`${className} input__input`} {...props} />
    </label>
  )
})

export default InputItem

InputItem.displayName = 'InputItem'
