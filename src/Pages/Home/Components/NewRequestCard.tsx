import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

type propsType = {
  createRequest: (url: string, displayUrl: string, keyword: string, email: string) => void;
};

export default function ({ createRequest }: propsType) {
  const [newReq, setNewReq] = useState({ url: "", keyword: "" });
  const [emails, setEmails] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  const loadEmails = () => {
    fetch(`/emails/v1/`)
      .then((response) => {
        if (response.ok) {
          response.json().then((emails) => {
            setEmails(emails);
            setSelectedEmail(emails[0]);
          });
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  useEffect(loadEmails, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">New request</Typography>
        <br />
        <TextField
          label="Url address"
          value={newReq.url}
          onChange={(e) => setNewReq({ ...newReq, url: e.target.value })}
          style={{ width: "100%" }}
        />
        <TextField
          label="Keyword"
          value={newReq.keyword}
          onChange={(e) => setNewReq({ ...newReq, keyword: e.target.value })}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <FormControl style={{ width: "100%" }}>
          <InputLabel>Email</InputLabel>
          <Select
            value={selectedEmail}
            onChange={(e) => {
              setSelectedEmail(e.target.value as string);
            }}
          >
            {emails.map((mail) => (
              <MenuItem key={mail} value={mail}>
                {mail}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto", marginRight: "12px" }}
          disabled={newReq.url.length === 0 || newReq.keyword.length === 0 || selectedEmail.length === 0}
          onClick={() => {
            createRequest(newReq.url, "", newReq.keyword, selectedEmail);
            setNewReq({ keyword: "", url: "" });
          }}
        >
          Add request
        </Button>
      </CardActions>
    </Card>
  );
}
