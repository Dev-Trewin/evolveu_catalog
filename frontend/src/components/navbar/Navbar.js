import React from 'react';
import logo from '../../images/EvolveUlog.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import "../home/tailwind_built.css";


const Navbar = () => {
  let location = useLocation();
  let pathname = location.pathname;
  let currentUser = useSelector((redux) => redux.auth.user);    // only updates value of currentUser when redux.auth changes
  let dispatch = useDispatch();
 
  const handleLogOut = () => dispatch(logout());

  return (

    <div>
      <div className="flex flex-row justify-between items-center  mt-8">

        <img src={logo} alt="Logo" className="w-36 md:w-48 lg:w-56" />

        {!["/", "/catalog"].includes(pathname) && (
          <div className="font-600 uppercase text-lg">
            <Link to="/">Return to Catalog</Link>
          </div>
        )}

        {/* Show appropriate button depending on whether currentUser is defined */}
        {currentUser ? (
          <div className="w-36 md:w-48 xl:w-64">
            {/* <Link className="loginLink" to="/signout">Sign Out</Link > */}
            <a href="/catalog" className="loginLink" onClick={handleLogOut}>
              Log Out
            </a>
          </div>
        ) : (
          <div className="w-36 md:w-48 xl:w-64">
            <Link className="loginLink" to="/login">
              Student Login
            </Link>
          </div>
        )}

      </div>
    </div>
  )}

export default Navbar