import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActions, Button, FormControl, Select, MenuItem } from "@material-ui/core";
import MatchDetailRequest from "./Tipsport/MatchDetailRequest";
import SportsOfferRequest from "./Tipsport/SportsOfferRequest";
import MatchesOfferRequest from "./Tipsport/MatchesOfferRequest";
import NewMatchesWatcher from "./Tipsport/NewMatchesWatcher";
import RepetedMatchDetails from "./Tipsport/RepetedMatchDetails";
import { Chat } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";

type propsType = {
  createRequest: (apiUrl: string, url: string, displayUrl: string, keyword: string, email: string, category: string) => void;
  isAdmin: boolean;
};

enum requestTypes {
  MatchDetails,
  SportsOffer,
  MatchesOffer,
  MatchesWatcher,
  RepetedMatchDetails,
}

export enum categoryTypes {
  ROOT = "ROOT",
  CATEGORY = "CATEGORY",
  SELECTION = "SELECTION",
  SUPERSPORT = "SUPERSPORT",
  SUPERGROUP = "SUPERGROUP",
  SPORT = "SPORT",
  GROUP = "GROUP",
  COMPETITION = "COMPETITION",
  MATCH = "MATCH",
}

export default function ({ createRequest, isAdmin }: propsType) {
  const emptyRequest = { apiUrl: "/requests/v1/", url: "", displayUrl: "", keyword: "", category: categoryTypes.COMPETITION };
  const [newTipsportReq, setNewTipsportReq] = useState<{
    apiUrl: string;
    url: string;
    displayUrl: string;
    keyword: string;
    category?: categoryTypes;
  }>(emptyRequest);
  const [selected, setSelected] = useState<requestTypes>(requestTypes.MatchDetails);
  const [selectedChatId, setSelectedChat] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = () => {
    api.get(
      "notifications/v1/getChats",
      { visibleOnly: false },
      {
        success: (chats: Chat[]) => {
          setChats(chats);
          setSelectedChat(chats.filter((ch) => isAdmin || ch.visible)[0].chatId);
        },
        error: console.log,
      }
    );
  };

  useEffect(loadChats, []);

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
            <MenuItem value={requestTypes.RepetedMatchDetails}>Tipsport repeated match details</MenuItem>
          </Select>
        </FormControl>
        <br />
        {selected === requestTypes.MatchDetails ? (
          <MatchDetailRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats.filter((ch) => isAdmin || ch.visible)}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : selected === requestTypes.SportsOffer ? (
          <SportsOfferRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats.filter((ch) => isAdmin || ch.visible)}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : selected === requestTypes.MatchesOffer ? (
          <MatchesOfferRequest
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats.filter((ch) => isAdmin || ch.visible)}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : selected === requestTypes.MatchesWatcher ? (
          <NewMatchesWatcher
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats.filter((ch) => isAdmin || ch.visible)}
            selectedChatId={selectedChatId}
            setSelectedChat={setSelectedChat}
          />
        ) : (
          <RepetedMatchDetails
            newTipsportReq={newTipsportReq}
            setNewTipsportReq={setNewTipsportReq}
            chats={chats.filter((ch) => isAdmin || ch.visible)}
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
              selectedChatId,
              newTipsportReq.category || ""
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
