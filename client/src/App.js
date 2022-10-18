// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Login from "./components/login/Login";
import Signin from "./components/login/Signin";
import IdentifyEmail from "./components/login/IdentifyEmail";
import IdentifyPhone from "./components/login/IdentifyPhone";
import RecoverInitiate from "./components/login/RecoverInitiate";

import Calendar from "./components/main/Calendar";

import ProfileChange from "./components/setting/ProfileChange";
import PasswordChange from "./components/setting/PasswordChange";
import Signout from "./components/setting/Signout";

import Inout from "./components/main/Inout";
import Report from "./components/main/Report";
import Error from "./components/Error";

import LoginSharedLayout from "./components/layout/LoginSharedLayout";
import SettingSharedLayout from "./components/layout/SettingSharedLayout";
import MainSharedLayout from "./components/layout/MainSharedLayout";
import Layout from "./components/common/Layout";

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/identify_email" element={<IdentifyEmail />}></Route>
          <Route path="/identify_phone" element={<IdentifyPhone />}></Route>
          <Route path="/initiate" element={<RecoverInitiate />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/inout" element={<Inout />}></Route>
          <Route path="/profile_change" element={<ProfileChange />}></Route>
          <Route path="/password_change" element={<PasswordChange />}></Route>
          <Route path="/signout" element={<Signout />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>

        {/* <Route path="main" element={<MainSharedLayout />}>
          <Route index element={<Calendar />}></Route>
          <Route path="report" element={<Report />}></Route>
          <Route path="inout" element={<Inout />}></Route>
        </Route> */}

        {/* <Route path="setting" element={<SettingSharedLayout />}>
          <Route index element={<ProfileChange />}></Route>
          <Route path="password_change" element={<PasswordChange />}></Route>
          <Route path="signout" element={<Signout />}></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
