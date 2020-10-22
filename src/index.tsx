import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <MuiThemeProvider
    theme={createMuiTheme({
      palette: {
        primary: { main: "#343a40" },
        secondary: { main: "#ffffff" },
      },
    })}
  >
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.register();
