import { useState } from "react";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { useStore, useStore2 } from "../../store/store.js";
import defaultUser from "../../img/default-user.jpg";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const settings = ["Setting", "Logout"];

export default function Header() {
  const { profileImage } = useStore();
  const navigate = useNavigate();
  const { logState, setLogState } = useStore2();

  function loginHandler() {
    setLogState(true);
  }
  function logoutHandler() {
    setLogState(false);
  }

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    console.log(e.target.innerText);
    setAnchorElUser(null);
    switch (e.target.innerText) {
      case "Setting":
        navigate("/profile_change");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <AppBar position="static" style={{ background: "gray" }}>
        <Container maxWidth="100%">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <img
              alt="로고"
              onClick={() => navigate("/")}
              style={{ width: "200px", cursor: "pointer" }}
              src={logo}
            />
            {logState ? (
              <button onClick={logoutHandler}>logoutState</button>
            ) : (
              <button onClick={loginHandler}>loginState</button>
            )}
            {logState && (
              <Box sx={{ flexDirection: "row" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="profileImage"
                      src={profileImage ? profileImage : defaultUser}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
