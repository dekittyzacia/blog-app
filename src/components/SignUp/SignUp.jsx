import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Card, Spin } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

import { validateOptions } from '../../constants/constants'
import { useRegisterUserMutation } from '../../api/userApi'
import FormInputItem from '../FormInputItem/FormInputItem'

import './SignUp.scss'

const SignUp = () => {
  const navigate = useNavigate()
  const [regiserUser, { data: serverResponse, error: serverErrors }] = useRegisterUserMutation()
  const [formErrors, setFormErrors] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (serverErrors) setFormErrors(Object.keys(serverErrors.data.errors))
    if (serverResponse) {
      setIsLoading(false)
      navigate('/sign-in', { replace: true })
    }
  }, [serverResponse, serverErrors])

  const onSubmit = (formData) => {
    console.log(formData)
    setIsLoading(true)
    regiserUser(formData)
  }

  return (
    <Card className="sign-up">
      <h2 className="sign-up__title">Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up__form">
        <FormInputItem
          label="Username"
          name="username"
          errors={errors}
          registerCb={register}
          type="username"
          options={validateOptions.username}
          formClassName="sign-up-form"
          className="sign-up__input"
        />
        <FormInputItem
          label="Email"
          name="email"
          errors={errors}
          registerCb={register}
          type="email"
          options={validateOptions.email}
          formClassName="sign-up-form"
          className="sign-up__input"
        />
        <FormInputItem
          label="Password"
          name="password"
          errors={errors}
          registerCb={register}
          type="password"
          options={validateOptions.password}
          formClassName="sign-up-form"
          className="sign-up__input"
        />
        <FormInputItem
          label="Repeat password"
          name="repeat-password"
          errors={errors}
          registerCb={register}
          type="password"
          options={validateOptions.repeatPassword}
          formClassName="sign-up-form"
          className="sign-up__input"
        />
        <label className="sign-up__agreement">
          <input
            type="checkbox"
            name="agreement"
            className="sign-up__checkbox"
            {...register('agreement', validateOptions.agreement)}
          />
          I agree to the processing of my personal information
        </label>
        <div className="sign-up__error">
          {errors?.agreement && (
            <span>
              <WarningOutlined /> {errors?.agreement?.message || 'Something is wrong!'}
            </span>
          )}
        </div>
        <div className="sign-up__error">
          {formErrors.length ? (
            <span>
              <WarningOutlined /> Some fields are already taken, please change them: {formErrors.join(', ')}
            </span>
          ) : null}
        </div>
        {!isLoading ? <input className="sign-up__submit-button" type="submit" value="Create!" /> : <Spin />}
      </form>
      <p className="sign-up__login-link">
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </Card>
  )
}

export default SignUp
