import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/main.css';      //Use for production version
import './styles/Register.css'
import './styles/Navbar.css'
import { Provider } from "react-redux";
import store from './store'
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);



