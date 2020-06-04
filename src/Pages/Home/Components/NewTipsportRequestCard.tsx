import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, List, ListItem, ListItemText, CardActions, Button } from "@material-ui/core";
import { Match } from "../../../Types/types";

type propsType = {
  createRequest: (url: string, displayUrl: string, keyword: string) => void;
};

export default function ({ createRequest }: propsType) {
  const [newTipsportReq, setNewTipsportReq] = useState({ url: "", displayUrl: "", keyword: "" });
  const [matches, setMatches] = useState<Match[]>([]);

  const loadMatches = (url: string) => {
    fetch(`/tipsport/v1/matches?url=${url}`)
      .then((response) => {
        if (response.ok) {
          response.json().then(setMatches);
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">New request for tipsport match details</Typography>
        <br />
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
      </CardContent>
      <CardActions style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={newTipsportReq.url.length === 0 || newTipsportReq.keyword.length === 0}
          style={{ marginLeft: "auto", marginRight: "12px" }}
          onClick={() => {
            createRequest(newTipsportReq.url, newTipsportReq.displayUrl, newTipsportReq.keyword);
            setNewTipsportReq({ keyword: "", url: "", displayUrl: "" });
          }}
        >
          Add request
        </Button>
      </CardActions>
    </Card>
  );
}
