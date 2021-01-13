import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

export default function () {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Website scanning service
        </Typography>
        {(isAuthenticated && (
          <Button style={{ color: "white" }} onClick={() => logout()}>
            Logout
          </Button>
        )) || (
          <Button style={{ color: "white" }} onClick={() => loginWithRedirect()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
