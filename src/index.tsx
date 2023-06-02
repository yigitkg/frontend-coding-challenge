import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import CoreLayout from "./common/layouts/CoreLayout";
import "./styles/_main.scss";
import reportWebVitals from "./reportWebVitals";
import store from "./common/redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
