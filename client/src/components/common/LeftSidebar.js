import { Drawer } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnsLogStateStore } from "../../store/store.js";
import colors from "../../utils/color.js";

export function LeftSidebar({ width, sideBarMenuItems }) {
  const loc = useLocation();
  const navigate = useNavigate();
  const { snsLogState, setSnsLogState } = useSnsLogStateStore();

  console.log(snsLogState);
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
      <List
        sx={{
          // selected and (selected + hover) states
          "&& .Mui-selected, && .Mui-selected:hover": {
            bgcolor: colors.blue500,
            "&, & .MuiListItemIcon-root": {
              color: "pink",
            },
          },
        }}
        style={{ margin: 0, padding: 0 }}
      >
        {sideBarMenuItems.map(
          (item) =>
            !snsLogState && (
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
            )
        )}
        {sideBarMenuItems.map((item) =>
          snsLogState && item.path !== "/password_change" ? (
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
          ) : (
            <></>
          )
        )}
      </List>
    </Drawer>
  );
}
