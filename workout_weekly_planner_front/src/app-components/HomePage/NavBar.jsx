import * as React from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
} from "@mui/material";
import { Logout, Home } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const [navValue, setnavValue] = React.useState(0);
  const navigate = useNavigate();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/";
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  if (isSignUpPage || isSignInPage) {
    return null;
  }

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:3006/routes/users/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response) {
      localStorage.clear();
      navigate("/");
    } else {
      throw new Error("Logout failed");
    }
  };

  return (
    <Box>
      <BottomNavigation
        showLabels
        sx={{ width: "100%", position: "absolute", bottom: "0" }}
        value={navValue}
        onChange={(event, newValue) => {
          setnavValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          component={Link}
          to="/homepage"
        />
        <BottomNavigationAction
          label="Logout"
          icon={<Logout />}
          onClick={handleLogout}
        />
        <BottomNavigationAction
          icon={<Avatar sx={{ bgcolor: '#b042ff' }}>{initials}</Avatar>}
          component={Link}
          to="/userslist"
        />
      </BottomNavigation>
    </Box>
  );
}
