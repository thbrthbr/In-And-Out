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

import styled from "styled-components";

import Inout from "./components/main/Inout";
import Report from "./components/main/Report";
import Error from "./components/Error";

import Layout from "./components/common/Layout";

import Screen from "./components/common/Screen";

import { QueryClientProvider, QueryClient } from "react-query";

import PublicRoute from "./components/route/publicRoute";
import PrivateRoute from "./components/route/privateRoute";

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
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Font>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              ></Route>
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <Signin />
                  </PublicRoute>
                }
              ></Route>
              <Route
                path="/identify_email"
                element={
                  <PublicRoute>
                    <IdentifyEmail />
                  </PublicRoute>
                }
              ></Route>
              <Route
                path="/identify_phone"
                element={
                  <PublicRoute>
                    <IdentifyPhone />
                  </PublicRoute>
                }
              ></Route>
              <Route
                path="/initiate"
                element={
                  <PublicRoute>
                    <RecoverInitiate />
                  </PublicRoute>
                }
              ></Route>
              <Route
                path="/calendar"
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/report"
                element={
                  <PrivateRoute>
                    <Report />
                  </PrivateRoute>
                }
              ></Route>
              {/* <Route path="/report/yearly" element={<Report />}></Route> */}
              <Route
                path="/inout"
                element={
                  <PrivateRoute>
                    <Inout />
                  </PrivateRoute>
                }
              ></Route>
              {/* <Route path="/inout/expense" element={<Inout />}></Route> */}
              <Route
                path="/profile_change"
                element={
                  <PrivateRoute>
                    <Screen />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/password_change"
                element={
                  <PrivateRoute>
                    <Screen />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/signout"
                element={
                  <PrivateRoute>
                    <Screen />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="*" element={<Error />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Font>
    </QueryClientProvider>
  );
}

export default App;

const Font = styled.div`
  font-family: "OTWelcomeRA";
  line-height: 40px;
`;
