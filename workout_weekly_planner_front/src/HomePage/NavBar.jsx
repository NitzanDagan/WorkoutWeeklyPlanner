import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Logout, Home } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function NavBar() {
  const location = useLocation();
  // const auth = localStorage.getItem("user");
  const [navValue, setnavValue] = React.useState(0);
  const navigate = useNavigate();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/";

  if (isSignUpPage || isSignInPage) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
      </BottomNavigation>
    </Box>
  );
}
