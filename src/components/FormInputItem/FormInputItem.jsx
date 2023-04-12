import React from 'react'
import { WarningOutlined } from '@ant-design/icons'

import './FormInputItem.scss'

const FormInputItem = ({ label, name, options, type, errors, registerCb, formClassName }) => {
  return (
    <>
      <label className={`${formClassName}__label input__label`}>
        {label}
        <input
          type={type}
          className={`${formClassName}__input input__input`}
          placeholder={label}
          {...registerCb(name, options)}
        />
      </label>
      <div className={`${formClassName}__error input__error`}>
        {errors?.[name] && (
          <span>
            <WarningOutlined /> {errors?.[name]?.message || 'Something is wrong!'}
          </span>
        )}
      </div>
    </>
  )
}

export default FormInputItem
