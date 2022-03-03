import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-2n6jj94y.eu.auth0.com"
    clientId="kOfW593XTkBylZBXBqDoLjIydtemk5Fo"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: { main: "#343a40" },
          secondary: { main: "#ffffff" },
        },
        components: {
          MuiFormControl: {
            defaultProps: {
              variant: "standard",
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: "standard",
            },
          },
        },
      })}
    >
      <App />
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.register();
