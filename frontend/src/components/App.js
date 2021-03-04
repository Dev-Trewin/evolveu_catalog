import React from "react";
import { Router } from "react-router-dom";
import "./home/tailwind_built.css";
import "./App.css";

import { clearMessage } from "../actions/message";
import MainStack from "./routes/MainStack";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

// Sets up the history listener, sets up the Router, and calls MainStack
const App = () => {
  const history = createBrowserHistory();

  let dispatch = useDispatch();

  history.listen((location) => {
    dispatch(clearMessage()); // clear message when changing location. Use dispatch hook to get dispatch function. See MainStack
  });

  return (
    <Router history={history}>
      <MainStack />{" "}
      {/* moved into a sub-component so we can access location from Router */}
    </Router>
  );
};

export default App;