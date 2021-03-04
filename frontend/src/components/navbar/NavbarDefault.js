import React from 'react'
import { Link } from 'react-router-dom'
import NavbarStyle from './NavbarStyle'

export default function NavbarDefault() {
  return (
    <div className="flex">
        <span className=""><Link to="/">Catalog of Student Projects </Link></span>
        <span className="">
          <NavbarStyle>
              <Link className="button_login" to="/signin">Sign in </Link >
              <Link className="button_login" to="/signout">Sign out </Link >
          </NavbarStyle >
        </span>

    </div>
   )
}
