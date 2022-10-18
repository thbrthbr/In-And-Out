import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 90vh;
`;

export default function Layout() {
  const loc = useLocation();
  const mainRouterURL = ["/calendar", "/inout", "/report"];
  const settingRouterURL = ["/profile_change", "/password_change", "/signout"];
  console.log(loc);
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
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
