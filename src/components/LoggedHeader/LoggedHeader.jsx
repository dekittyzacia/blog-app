import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'

import { logOut } from '../../store/userSlice'

import './LoggedHeader.scss'

const LoggedHeader = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const onLogOut = () => {
    dispatch(logOut())
    localStorage.removeItem('token')
    navigate('sign-in', { replace: true })
  }

  return (
    <header className="header">
      <Link className="header__head" to="/">
        Some Blog
      </Link>
      <Link to="/new-article" className="logged-header__button button button-outlined">
        Create article
      </Link>
      <Link to="profile" className="logged-header__button button">
        <div className="logged-header__user">
          {user.username}
          <Avatar className="logged-header__avatar" src={user.image} />
        </div>
      </Link>
      <button type="button" onClick={onLogOut} className="logged-header__button button button-primary">
        Log Out
      </button>
    </header>
  )
}

export default LoggedHeader
