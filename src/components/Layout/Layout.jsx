import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { setUser } from '../../store/userSlice'
import { useGetCurrentUserQuery } from '../../api/userApi'
import Header from '../Header/Header'
import LoggedHeader from '../LoggedHeader/LoggedHeader'

import './Layout.scss'

const Layout = () => {
  const dispatch = useDispatch()
  const { data: currentUser } = useGetCurrentUserQuery()
  const { isLogged } = useSelector((state) => state.user)

  useEffect(() => {
    if (currentUser) {
      dispatch(setUser(currentUser.user))
    }
  }, [currentUser])

  return (
    <>
      {isLogged ? <LoggedHeader /> : <Header />}
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
