// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";

import Login from "./components/login/Login";
import Signin from "./components/login/Signin";
import IdentifyEmail from "./components/login/IdentifyEmail";
import IdentifyPhone from "./components/login/IdentifyPhone";
import RecoverInitiate from "./components/login/RecoverInitiate";

import Calendar from "./components/calendar/Calendar";
import Setting from "./components/setting/Setting";
import Inout from "./components/inout/Inout";
import Report from "./components/report/Report";
import Error from "./components/Error";

import LoginSharedLayout from "./components/layout/LoginSharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSharedLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="signin" element={<Signin />}></Route>
          <Route path="identify_email" element={<IdentifyEmail />}></Route>
          <Route path="identify_phone" element={<IdentifyPhone />}></Route>
          <Route path="initiate" element={<RecoverInitiate />}></Route>
        </Route>
        <Route path="calendar" element={<Calendar />}></Route>
        <Route path="setting" element={<Setting />}></Route>
        <Route path="inout" element={<Inout />}></Route>
        <Route path="report" element={<Report />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
