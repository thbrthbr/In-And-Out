import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfileChange from "../setting/ProfileChange";
import PasswordChange from "../setting/PasswordChange";
import Signout from "../setting/Signout";
import colors from "../../utils/color";

export default function Screen() {
  const loc = useLocation();
  return (
    <ScreenDefault style={{ margin: 0, padding: 0 }}>
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

  background-color: ${colors.blue300};
  font-size: 15px;
  position: relative;
`;
