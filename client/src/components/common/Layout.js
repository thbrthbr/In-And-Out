import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Screen from "./Screen";
import ProfileChange from "../setting/ProfileChange";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 90vh;
`;

const LoginContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const mainRouterURL = ["/calendar", "/inout", "/report"];
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
