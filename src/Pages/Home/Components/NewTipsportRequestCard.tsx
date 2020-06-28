import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActions, Button, FormControl, Select, MenuItem } from "@material-ui/core";
import MatchDetailRequest from "./Tipsport/MatchDetailRequest";
import SportsOfferRequest from "./Tipsport/SportsOfferRequest";
import MatchesOfferRequest from "./Tipsport/MatchesOfferRequest";

type propsType = {
  createRequest: (url: string, displayUrl: string, keyword: string, email: string) => void;
};

enum requestTypes {
  MatchDetails,
  SportsOffer,
  MatchesOffer,
}

export default function ({ createRequest }: propsType) {
  const emptyRequest = { url: "", displayUrl: "", keyword: "" };
  const [newTipsportReq, setNewTipsportReq] = useState(emptyRequest);
  const [selected, setSelected] = useState(requestTypes.MatchDetails);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);

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
        <Typography variant="h6" style={{ float: "left" }}>
          New request for Tipsport
        </Typography>
        <FormControl style={{ float: "right" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value as requestTypes);
              setNewTipsportReq(emptyRequest);
            }}
          >
            <MenuItem value={requestTypes.MatchDetails}>Tipsport match details</MenuItem>
            <MenuItem value={requestTypes.SportsOffer}>Tipsport sports offer</MenuItem>
            <MenuItem value={requestTypes.MatchesOffer}>Tipsport matches offer</MenuItem>
          </Select>
        </FormControl>
        <br />
        {selected === requestTypes.MatchDetails ? (
          <MatchDetailRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            emails={emails}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />
        ) : selected === requestTypes.SportsOffer ? (
          <SportsOfferRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            emails={emails}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />
        ) : (
          <MatchesOfferRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            emails={emails}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />
        )}
      </CardContent>
      <CardActions style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={newTipsportReq.url.length === 0 || newTipsportReq.keyword.length === 0 || selectedEmail.length === 0}
          style={{ marginLeft: "auto", marginRight: "12px" }}
          onClick={() => {
            createRequest(newTipsportReq.url, newTipsportReq.displayUrl, newTipsportReq.keyword, selectedEmail);
            setNewTipsportReq({ keyword: "", url: "", displayUrl: "" });
          }}
        >
          Add request
        </Button>
      </CardActions>
    </Card>
  );
}
