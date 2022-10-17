// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Calendar from "./components/calendar/Calendar";
import Setting from "./components/setting/Setting";
import Inout from "./components/inout/Inout";
import Report from "./components/report/Report";
import Error from "./components/Error";

// import LoginSharedLayout from "./components/layout/LoginSharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginSharedLayout />}> */}
        <Route path="/login" element={<Login />}></Route>
        {/* </Route> */}
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
