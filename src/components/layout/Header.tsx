import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { LoginModal } from "../auth/LoginModal";
import { SignupModal } from "../auth/SignupModal";
import { AddBookModal } from "../books/AddBookModal";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();
  const { isAuthenticated, logout } = useAuth();

  const getModeIcon = () => {
    switch (mode) {
      case "light":
        return <Brightness7Icon />;
      case "dark":
        return <Brightness4Icon />;
      default:
        return <SettingsBrightnessIcon />;
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Modal states
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [addBookOpen, setAddBookOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
  };

  const handleAddBookClick = () => {
    setAddBookOpen(true);
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            Library
          </Typography>

          <Tooltip
            title={`Theme: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
          >
            <IconButton
              color="inherit"
              onClick={toggleColorMode}
              sx={{ mr: 1 }}
            >
              {getModeIcon()}
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>Display Name</MenuItem>
                <MenuItem onClick={handleAddBookClick}>Add Book</MenuItem>
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />

      <AddBookModal open={addBookOpen} onClose={() => setAddBookOpen(false)} />
    </>
  );
};
