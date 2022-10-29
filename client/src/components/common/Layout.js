import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

import { Drawer } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

const Container = styled.div`
  display: flex;
  height: 88vh;
`;

export default function Layout() {
  const loc = useLocation();
  const navigate = useNavigate();

  const sideBarMenuItems = [
    { text: "달력", icon: <CalendarMonthOutlinedIcon />, path: "/calendar" },
    { text: "수입/지출", icon: <PaidOutlinedIcon />, path: "/inout/income" },
    { text: "보고서", icon: <AssessmentOutlinedIcon />, path: "/report" },
  ];

  return (
    <div>
      <Header />

      <Container>
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              position: "static",
              width: "180px",
            },
          }}
        >
          <List>
            {sideBarMenuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                }}
                selected={loc.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Outlet />
      </Container>
    </div>
  );
}
