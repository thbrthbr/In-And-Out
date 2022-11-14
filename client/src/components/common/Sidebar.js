import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  width: 200px;
  height: 100%;
  background-color: #d9d9d9;
`;

const SideButton = styled.div`
  width: 180px;
  height: 50px;
  margin-top: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Sidebar({ menu }) {
  const loc = useLocation();
  const mainMenus = [
    { name: "달력", path: ["/calendar"] },
    { name: "수입/지출", path: ["/inout/income", "/inout/expense"] },
    { name: "보고서", path: ["/report"] },
  ];

  const settingMenus = [
    { name: "프로필 변경", path: ["/profile_change"] },
    { name: "비밀번호 변경", path: ["/password_change"] },
    { name: "회원 탈퇴", path: ["/signout"] },
  ];

  let menus = menu === "main" ? mainMenus : settingMenus;

  return (
    <Side>
      {menus.map((menu, idx) => (
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to={menu.path[0]}
          key={idx}
        >
          <SideButton
            style={
              menu.name === "달력"
                ? loc.pathname === menu.path[0]
                  ? { backgroundColor: "pink" }
                  : { backgroundColor: "white" }
                : menu.path.reduce((prev, path) => {
                    if (loc.pathname === path) {
                      if (
                        !prev.backgroundColor ||
                        prev.backgroundColor === "white"
                      )
                        prev.backgroundColor = "pink";
                    } else {
                      if (
                        !prev.backgroundColor ||
                        prev.backgroundColor === "white"
                      )
                        prev.backgroundColor = "white";
                    }
                    return prev;
                  }, {})
            }
          >
            {menu.name}
          </SideButton>
        </NavLink>
      ))}
    </Side>
  );
}
