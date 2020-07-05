import React, { useState, Dispatch, SetStateAction } from "react";
import { TextField, List, ListItem, ListItemText, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { Match } from "../../../../Types/types";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { apiUrl: string; url: string; displayUrl: string; keyword: string }) => void;
  emails: string[];
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
};

export default function ({ newTipsportReq, setNewTipsportReq, emails, selectedEmail, setSelectedEmail }: propsType) {
  const [matches, setMatches] = useState<Match[]>([]);

  const loadMatches = (url: string) => {
    if (url.length >= 0) {
      fetch(`/tipsport/v1/matches?url=${url}`)
        .then((response) => {
          if (response.ok) {
            response.json().then(setMatches);
          } else {
            console.log(response.statusText);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <>
      <TextField label="Category URL" style={{ width: "100%" }} onBlur={(e) => loadMatches(e.target.value)} />
      {matches.length === 0 ? (
        <>
          <br />
          <br />
        </>
      ) : (
        <List>
          {matches.map((match) => (
            <ListItem
              key={match.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setNewTipsportReq({
                  ...newTipsportReq,
                  url: `https://m.tipsport.cz/rest/offer/v1/matches/${match.id}/event-tables?fromResults=false`,
                  displayUrl: match.matchUrl,
                });
              }}
            >
              <ListItemText primary={match.description} />
            </ListItem>
          ))}
        </List>
      )}

      <TextField
        label="Url address"
        disabled={true}
        value={newTipsportReq.url}
        onChange={(e) => setNewTipsportReq({ ...newTipsportReq, url: e.target.value })}
        style={{ width: "100%" }}
      />
      <TextField
        label="Keyword"
        value={newTipsportReq.keyword}
        onChange={(e) => setNewTipsportReq({ ...newTipsportReq, keyword: e.target.value })}
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
    </>
  );
}
