import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Card, Spin } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

import { editProfileValidateOptions } from '../../constants/constants'
import { useUpdateUserMutation } from '../../api/userApi'
import './EditProfile.scss'
import { setToken, setUser } from '../../store/userSlice'
import FormInputItem from '../FormInputItem/FormInputItem'

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [updateUser, { data: updateResponse, error: updateErrors }] = useUpdateUserMutation()
  const [formErrors, setFormErrors] = useState([])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (updateErrors) setFormErrors(Object.keys(updateErrors.data.errors))
    if (updateResponse) {
      setFormErrors([])
      dispatch(setToken(updateResponse.user.token))
      dispatch(setUser(updateResponse.user))
      navigate('/', { replace: true })
    }
  }, [updateResponse, updateErrors])

  const onSubmit = (formData) => {
    setIsLoading(true)
    const formBody = Object.fromEntries(Object.entries(formData).filter((item) => item[1]))
    updateUser(formBody)
    setIsLoading(false)
  }

  return (
    <Card>
      <h2 className="edit-profile__title">Edit profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile__form">
        <FormInputItem
          label="New username"
          name="username"
          errors={errors}
          registerCb={register}
          type="username"
          options={editProfileValidateOptions.username}
          formClassName="edit-profile__form"
          className="edit-profile__input"
        />
        <FormInputItem
          label="New email"
          name="email"
          errors={errors}
          registerCb={register}
          type="email"
          options={editProfileValidateOptions.email}
          formClassName="edit-profile__form"
          className="edit-profile__input"
        />
        <FormInputItem
          label="New password"
          name="password"
          errors={errors}
          registerCb={register}
          type="password"
          options={editProfileValidateOptions.password}
          formClassName="edit-profile__form"
          className="edit-profile__input"
        />
        <FormInputItem
          label="Avatar URL"
          name="image"
          errors={errors}
          registerCb={register}
          type="url"
          options={editProfileValidateOptions.image}
          formClassName="edit-profile__form"
          className="edit-profile__input"
        />
        <div className="sign-up__error">
          {formErrors.length ? (
            <span>
              <WarningOutlined /> Some fields are already taken, please change them: {formErrors.join(', ')}
            </span>
          ) : null}
        </div>
        {!isLoading ? <input className="edit-profile__submit-button" type="submit" value="Save!" /> : <Spin />}
      </form>
    </Card>
  )
}

export default EditProfile
