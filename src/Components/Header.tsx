import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";

export default function () {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Website scanning service</Typography>
      </Toolbar>
    </AppBar>
  );
}
