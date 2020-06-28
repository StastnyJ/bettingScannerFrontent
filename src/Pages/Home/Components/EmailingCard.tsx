import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, CardActions, Button, Snackbar, List, ListItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";

export default function () {
  const [emails, setEmails] = useState<String[]>([]);
  const [newMail, setNewMail] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const loadEmails = () => {
    fetch(`/emails/v1/`)
      .then((response) => {
        if (response.ok) {
          response.json().then(setEmails);
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  const addEmail = (email: String) => {
    fetch(`/emails/v1/?email=${email}`, { method: "POST" })
      .then((response) => {
        if (response.ok) {
          setEmails([...emails, email]);
          setNewMail("");
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  const removeEmail = (email: String) => {
    fetch(`/emails/v1/?email=${email}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setEmails(emails.filter((e) => email !== e));
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  const testEmail = (email: String) => {
    fetch(`/emails/v1/test?email=${email}`, { method: "POST" })
      .then((response) => {
        if (response.ok) {
          setOpenSuccess(true);
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  useEffect(loadEmails, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Emailing service settings</Typography>
          <br />
          <List>
            {emails.map((e) => (
              <ListItem>
                <DeleteIcon
                  onClick={() => removeEmail(e)}
                  style={{ color: "red", cursor: "pointer", marginRight: "4px" }}
                ></DeleteIcon>{" "}
                <EmailIcon onClick={() => testEmail(e)} style={{ cursor: "pointer", marginRight: "24px" }}></EmailIcon>
                {e}
              </ListItem>
            ))}
          </List>
          <TextField
            label="Email address"
            value={newMail}
            onChange={(e) => setNewMail(e.target.value)}
            style={{ width: "100%" }}
          />
        </CardContent>
        <CardActions style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "12px" }}
              disabled={newMail.length === 0}
              onClick={() => {
                addEmail(newMail);
              }}
            >
              Add email address
            </Button>
          </div>
        </CardActions>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSuccess(false)} severity="success">
          Test email was sent successfully.
        </MuiAlert>
      </Snackbar>
    </>
  );
}
