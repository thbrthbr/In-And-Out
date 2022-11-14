import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Signin from "./components/login/Signin";
import IdentifyEmail from "./components/login/IdentifyEmail";
import IdentifyPhone from "./components/login/IdentifyPhone";
import RecoverInitiate from "./components/login/RecoverInitiate";
import Calendar from "./components/main/Calendar";
import styled from "styled-components";
import Inout from "./components/main/Inout";
import Report from "./components/main/Report";
import Error from "./components/Error";
import Layout from "./components/common/Layout";
import Screen from "./components/common/Screen";
import SignupCheck from "./components/login/SignupCheck";

import { QueryClientProvider, QueryClient } from "react-query";

import PublicRoute from "./components/route/publicRoute";
import PrivateRoute from "./components/route/privateRoute";

import SocialLoginCheck from "./components/login/SocialLoginCheck";

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
                path="/password_reset/sending"
                element={
                  <PublicRoute>
                    <RecoverInitiate />
                  </PublicRoute>
                }
              ></Route>

              <Route
                path="/signup_check/sending"
                element={
                  <PublicRoute>
                    <SignupCheck />
                  </PublicRoute>
                }
              ></Route>
              <Route
                path="/social_check/sending"
                element={
                  <PublicRoute>
                    <SocialLoginCheck />
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
              <Route
                path="/inout"
                element={
                  <PrivateRoute>
                    <Inout />
                  </PrivateRoute>
                }
              ></Route>
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
