import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const Header = () => {
  return (
    <header className="header">
      <Link className="header__head" to="/">
        Some Blog
      </Link>
      <Link to="sign-in" className="header__button button">
        Sign In
      </Link>
      <Link to="sign-up" className="header__button button button-primary">
        Sign Up
      </Link>
    </header>
  )
}

export default Header
