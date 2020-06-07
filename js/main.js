import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

const wrapper = document.getElementById("svg-maker-app-wrapper");
wrapper ? ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, wrapper
) : false;
