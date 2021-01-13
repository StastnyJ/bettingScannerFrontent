import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-2n6jj94y.eu.auth0.com"
    clientId="kOfW593XTkBylZBXBqDoLjIydtemk5Fo"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <MuiThemeProvider
      theme={createMuiTheme({
        palette: {
          primary: { main: "#343a40" },
          secondary: { main: "#ffffff" },
        },
      })}
    >
      <App />
    </MuiThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.register();
