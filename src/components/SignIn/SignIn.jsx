import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Card, Spin } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

import { loginValidateOptions } from '../../constants/constants'
import { useLoginUserMutation } from '../../api/userApi'
import { setToken, setUser } from '../../store/userSlice'
import FormInputItem from '../FormInputItem/FormInputItem'

import './SignIn.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'
  const [loginUser, { data: loginResponse, error: serverLoginErrors, isLoading }] = useLoginUserMutation()

  useEffect(() => {
    if (loginResponse) {
      dispatch(setToken(loginResponse.user.token))
      dispatch(setUser(loginResponse.user))
      navigate(fromPage, { replace: true })
    }
  }, [loginResponse])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (loginData) => {
    loginUser(loginData)
  }

  return (
    <Card className="sign-in">
      <h2 className="sign-in__title">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
        <FormInputItem
          label="Email"
          name="email"
          errors={errors}
          registerCb={register}
          type="email"
          options={loginValidateOptions.email}
          formClassName="sign-in-form"
          className="sign-in__input"
        />
        <FormInputItem
          label="Password"
          name="password"
          errors={errors}
          registerCb={register}
          type="password"
          options={loginValidateOptions.password}
          formClassName="sign-in-form"
          className="sign-in__input"
        />
        {!isLoading ? <input className="sign-in__submit-button" type="submit" value="Login!" /> : <Spin />}
      </form>
      <div className="sign-in__error">
        {serverLoginErrors ? (
          <span>
            <WarningOutlined /> {'Something is wrong: email or password is invalid'}
          </span>
        ) : null}
      </div>
      <p className="sign-in__sign-up-link">
        {"Don't have an account?"} <Link to="/sign-up">Sign up</Link>
      </p>
    </Card>
  )
}

export default SignIn
