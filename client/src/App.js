// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Signin from "./components/login/Signin";
import IdentifyEmail from "./components/login/IdentifyEmail";
import IdentifyPhone from "./components/login/IdentifyPhone";
import RecoverInitiate from "./components/login/RecoverInitiate";

import Calendar from "./components/main/Calendar";

// import ProfileChange from "./components/setting/ProfileChange";
// import PasswordChange from "./components/setting/PasswordChange";
// import Signout from "./components/setting/Signout";

import Inout from "./components/main/Inout";
import Report from "./components/main/Report";
import Error from "./components/Error";

import Layout from "./components/common/Layout";

import Screen from "./components/common/Screen";
// import { createStore } from "redux";

// import { Provider, useSelector, useDispatch, connect } from "react-redux";

// function reducer(currentState, action) {
//   if (currentState === undefined) {
//     return {};
//   }
//   const newState = { ...currentState };

//   return newState;
// }

// const store = createStore(reducer);

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/identify_email" element={<IdentifyEmail />}></Route>
          <Route path="/identify_phone" element={<IdentifyPhone />}></Route>
          <Route path="/initiate" element={<RecoverInitiate />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/report/monthly" element={<Report />}></Route>
          <Route path="/report/yearly" element={<Report />}></Route>
          <Route path="/inout" element={<Inout />}></Route>
          <Route path="/profile_change" element={<Screen />}></Route>
          <Route path="/password_change" element={<Screen />}></Route>
          <Route path="/signout" element={<Screen />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
