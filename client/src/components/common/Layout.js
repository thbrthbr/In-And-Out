import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Screen from "./Screen";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 90vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 25px;
  width: 35%;
  height: 95%;
  background-color: #d9d9d9;
`;

export default function Layout() {
  const loc = useLocation();
  const loginRouterURL = [
    "/",
    "/initiate",
    "/signin",
    "/identify_email",
    "/identify_phone",
  ];
  const mainRouterURL = [
    "/calendar",
    "/inout",
    "/report/monthly",
    "/report/yearly",
  ];
  const settingRouterURL = ["/profile_change", "/password_change", "/signout"];

  return (
    <div>
      <Header />
      <main>
        <Container>
          {mainRouterURL.includes(loc.pathname) && (
            <Sidebar menu={"main"}></Sidebar>
          )}
          {settingRouterURL.includes(loc.pathname) && (
            <Sidebar menu={"setting"}></Sidebar>
          )}

          {loginRouterURL.includes(loc.pathname) ? (
            <LoginContainer>
              <Outlet />
            </LoginContainer>
          ) : (
            <Outlet />
          )}
        </Container>
      </main>
    </div>
  );
}
