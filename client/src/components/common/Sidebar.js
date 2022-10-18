import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  background-color: yellow;
`;

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

export default function Sidebar({ menu }) {
  const mainMenus = [
    { name: "달력", path: "/calendar" },
    { name: "수입/지출", path: "/inout" },
    { name: "보고서", path: "/report" },
  ];

  const settingMenus = [
    { name: "프로필 변경", path: "/profile_change" },
    { name: "비밀번호 변경", path: "/password_change" },
    { name: "회원 탈퇴", path: "/signout" },
  ];

  let menus = menu === "main" ? mainMenus : settingMenus;

  return (
    <Side>
      <Menu>
        {menus.map((menu, idx) => (
          <NavLink to={menu.path} key={idx}>
            {menu.name}
          </NavLink>
        ))}
      </Menu>
    </Side>
  );
}
