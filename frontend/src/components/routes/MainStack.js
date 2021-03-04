import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import logo from "../../images/EvolveUlog.jpg";
import "../home/tailwind_built.css";
import "../App.css";

// import NavbarStyle from "../../components/navbar/NavbarStyle";
import Login from "../../components/auth.component/login.component";
import Register from "../../components/auth.component/register.component";
import Profile from "../../components/auth.component/profile.component";
import User from "../../components/auth.component/user.component";
import Admin from "../../components/auth.component/admin.component";
import Student from "../../components/auth.component/student.component";

import Navbar from "../../components/navbar/Navbar"
import Home from "../../components/home/Home";
import Dashboard from "../../components/dashboard/Dashboard";
import Details from "../../components/details/Details";
import CreateProjectPage from "../../components/createProjectPage/CreateProjectPage";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";


const MainStack = (props) => {
  let location = useLocation();
  let pathname = location.pathname;
  let currentUser = useSelector((redux) => redux.auth.user);    // only updates value of currentUser when redux.auth changes
  let [showStudent, setShowStudent] = useState();
  let [showAdmin, setShowAdmin] = useState();

  useEffect(
    () => {
      setShowStudent(currentUser?.roles?.includes("ROLE_STUDENT"));   // ?. is Chaining operator (handles NULL cases)
      setShowAdmin(currentUser?.roles?.includes("ROLE_ADMIN"));
    },
    [currentUser,setShowStudent,setShowAdmin] // This is the array of dependencies. Whenever currentUser changes this function will be run
  );

  let dispatch = useDispatch();

  console.log("location=", location);
  console.log("currentUser=", currentUser);
  console.log("props=", props);
  console.log("showStudent=", showStudent);
  console.log("showAdmin=", showAdmin);
  
  const handleLogOut = () => dispatch(logout());

  return (
    <div>
      {/* History allows the user to go back a page */}
      {/* Set column width, default text size and color for the whole app */}
      <div className="w-full flex flex-row justify-center">
        <div className="xs:w-100 sm:w-150 md:w-200 lg:w-240 xl:w-300  px-10
             font-sans font-300  text-lg lg:text-xl  text-gray-900 bg-white">
        
        <Navbar />

          <Switch>
            <Route exact path={["/", "/catalog"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={User} />
            <Route path="/admin" component={Admin} />
            <Route path="/student" component={Student} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/details" component={Details} />{" "}
            {/* // The colon indicates that another parameter goes there (in this case the project ID?) */}
            <Route path="/create-project" component={CreateProjectPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default MainStack;
