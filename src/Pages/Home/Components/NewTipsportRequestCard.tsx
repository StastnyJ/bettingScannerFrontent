import React, { useState } from "react";
import { Card, CardContent, Typography, CardActions, Button, FormControl, Select, MenuItem } from "@material-ui/core";
import MatchDetailRequest from "./Tipsport/MatchDetailRequest";
import SportsOfferRequest from "./Tipsport/SportsOfferRequest";
import MatchesOfferRequest from "./Tipsport/MatchesOfferRequest";

type propsType = {
  createRequest: (url: string, displayUrl: string, keyword: string) => void;
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
          <MatchDetailRequest newTipsportReq={newTipsportReq} setNewTipsportReq={setNewTipsportReq} />
        ) : selected === requestTypes.SportsOffer ? (
          <SportsOfferRequest newTipsportReq={newTipsportReq} setNewTipsportReq={setNewTipsportReq} />
        ) : (
          <MatchesOfferRequest newTipsportReq={newTipsportReq} setNewTipsportReq={setNewTipsportReq} />
        )}
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
