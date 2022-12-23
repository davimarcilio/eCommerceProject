import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import Nav from "./Nav";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home";
import Login from "./components/UserAuth/Login";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import User from "./components/User";
import Register from "./components/UserAuth/Register";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
