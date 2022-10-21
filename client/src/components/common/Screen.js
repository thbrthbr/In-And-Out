import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfileChange from "../setting/ProfileChange";
import PasswordChange from "../setting/PasswordChange";
import Signout from "../setting/Signout";

export default function Screen() {
  const loc = useLocation();
  return (
    <ScreenDefault>
      {loc.pathname === "/profile_change" && <ProfileChange />}
      {loc.pathname === "/password_change" && <PasswordChange />}
      {loc.pathname === "/signout" && <Signout />}
    </ScreenDefault>
  );
}

const ScreenDefault = styled.div`
  margin-left: 25px;
  margin-top: 25px;
  width: 2048px;

  background-color: #d9d9d9;
  font-size: 100px;
  position: relative;
`;
