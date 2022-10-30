import { Drawer } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export function LeftSidebar({ width, sideBarMenuItems }) {
  const loc = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          position: "static",
          width: width,
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
  );
}
