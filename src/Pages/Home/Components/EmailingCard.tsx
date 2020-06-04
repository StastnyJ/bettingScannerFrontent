import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, CardActions, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export default function () {
  const [email, setEmail] = useState("Loading...");
  const [openSuccess, setOpenSuccess] = useState(false);

  const loadEmail = () => {
    fetch(`/emails/v1/`)
      .then((response) => {
        if (response.ok) {
          response.text().then(setEmail);
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  const saveEmail = (email: String) => {
    fetch(`/emails/v1/?email=${email}`, { method: "POST" })
      .then((response) => {
        if (response.ok) {
          setOpenSuccess(true);
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  const testEmail = (email: String) => {
    fetch(`/emails/v1/test?email=${email}`, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  useEffect(loadEmail, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Emailing service settings</Typography>
          <br />
          <TextField label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
        </CardContent>
        <CardActions style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "12px" }}
              disabled={email.length === 0}
              onClick={() => {
                saveEmail(email);
              }}
            >
              Set email address
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "12px" }}
              disabled={email.length === 0}
              onClick={() => {
                testEmail(email);
              }}
            >
              Send test email
            </Button>
          </div>
        </CardActions>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSuccess(false)} severity="success">
          Email was saved successfully.
        </MuiAlert>
      </Snackbar>
    </>
  );
}
