import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActions, Button, FormControl, Select, MenuItem } from "@material-ui/core";
import MatchDetailRequest from "./Tipsport/MatchDetailRequest";
import SportsOfferRequest from "./Tipsport/SportsOfferRequest";
import MatchesOfferRequest from "./Tipsport/MatchesOfferRequest";
import NewMatchesWatcher from "./Tipsport/NewMatchesWatcher";
import { Chat } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";

type propsType = {
  createRequest: (apiUrl: string, url: string, displayUrl: string, keyword: string, email: string) => void;
};

enum requestTypes {
  MatchDetails,
  SportsOffer,
  MatchesOffer,
  MatchesWatcher,
}

export default function ({ createRequest }: propsType) {
  const emptyRequest = { apiUrl: "/requests/v1/", url: "", displayUrl: "", keyword: "" };
  const [newTipsportReq, setNewTipsportReq] = useState(emptyRequest);
  const [selected, setSelected] = useState<requestTypes>(requestTypes.MatchDetails);
  const [selectedChatId, setSelectedChat] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);

  const loadEmails = () => {
    api.get("notifications/v1/getChats", undefined, {
      success: (chats) => {
        setChats(chats);
        setSelectedChat(chats[0].chatId);
      },
      error: console.log,
    });
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
            <MenuItem value={requestTypes.MatchesWatcher}>Tipsport new matches watcher</MenuItem>
          </Select>
        </FormControl>
        <br />
        {selected === requestTypes.MatchDetails ? (
          <MatchDetailRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : selected === requestTypes.SportsOffer ? (
          <SportsOfferRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : selected === requestTypes.MatchesOffer ? (
          <MatchesOfferRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : (
          <NewMatchesWatcher
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        )}
      </CardContent>
      <CardActions style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={newTipsportReq.url.length === 0 || newTipsportReq.keyword.length === 0 || selectedChatId.length === 0}
          style={{ marginLeft: "auto", marginRight: "12px" }}
          onClick={() => {
            createRequest(
              newTipsportReq.apiUrl,
              newTipsportReq.url,
              newTipsportReq.displayUrl,
              newTipsportReq.keyword,
              selectedChatId
            );
            setNewTipsportReq(emptyRequest);
          }}
        >
          Add request
        </Button>
      </CardActions>
    </Card>
  );
}
