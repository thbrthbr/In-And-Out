import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useStore2 } from "../../store/store";
import { LeftSidebar } from "./LeftSidebar";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 93vh;
`;

const settingUrl = ["/profile_change", "/password_change", "/signout"];

let sideBarWidth = "240px";

export default function Layout() {
  const { logState } = useStore2();
  const loc = useLocation();

  const mainSideBarMenuItems = [
    { text: "달력", icon: <CalendarMonthOutlinedIcon />, path: "/calendar" },
    { text: "수입/지출", icon: <PaidOutlinedIcon />, path: "/inout" },
    { text: "보고서", icon: <AssessmentOutlinedIcon />, path: "/report" },
  ];

  const settingSideBarMenuItems = [
    {
      text: "프로필 변경",
      icon: <AccountCircleOutlinedIcon />,
      path: "/profile_change",
    },
    {
      text: "비밀번호 변경",
      icon: <HttpsOutlinedIcon />,
      path: "/password_change",
    },
    { text: "회원탈퇴", icon: <ExitToAppOutlinedIcon />, path: "/signout" },
  ];

  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <Container>
        {logState && !settingUrl.includes(loc.pathname) && (
          <LeftSidebar
            width={sideBarWidth}
            sideBarMenuItems={mainSideBarMenuItems}
          />
        )}
        {logState && settingUrl.includes(loc.pathname) && (
          <LeftSidebar
            width={sideBarWidth}
            sideBarMenuItems={settingSideBarMenuItems}
          />
        )}
        <Outlet />
      </Container>
    </div>
  );
}
