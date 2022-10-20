import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const SideButton = styled.div`
  width: 180px;
  height: 50px;
  margin-top: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLinkContainer = styled.div`
  display: flex;
`;

export default function Report() {
  return (
    <div>
      <NavLinkContainer>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  textDecoration: "none",
                  borderBottom: "1px solid red",
                }
              : { color: "black", textDecoration: "none" }
          }
          to={"/report/monthly"}
        >
          <SideButton>{"월간 보고서"}</SideButton>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { textDecoration: "none", borderBottom: "1px solid red" }
              : { color: "black", textDecoration: "none" }
          }
          to={"/report/yearly"}
        >
          <SideButton>{"연간 보고서"}</SideButton>
        </NavLink>
      </NavLinkContainer>
      <div>Report</div>
      <Link to="/profile_change">Setting</Link>
      <br />
      <Link to="/calendar">Calendar</Link>
      <br />
      <Link to="/inout">Inout</Link>
      <br />
      <Link to="/">Logout</Link>
    </div>
  );
}
