import React, { useState, Dispatch, SetStateAction } from "react";
import { TextField, List, ListItem, ListItemText, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { Chat, Match } from "../../../../Types/types";
import { api } from "../../../../Utils/ApiService";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { apiUrl: string; url: string; displayUrl: string; keyword: string }) => void;
  chats: Chat[];
  selectedChatId: string;
  setSelectedChat: Dispatch<SetStateAction<string>>;
};

enum categoryTypes {
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

export default function ({ newTipsportReq, setNewTipsportReq, chats, selectedChatId, setSelectedChat }: propsType) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [category, setCategory] = useState<categoryTypes>(categoryTypes.COMPETITION);

  const loadMatches = (url: string) => {
    if (url.length >= 0) {
      api.get(
        "tipsport/v1/matches",
        {
          url: url,
          categoryType: category,
        },
        {
          success: setMatches,
          error: console.log,
        }
      );
    }
  };

  return (
    <>
      <br />
      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel>Category type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as categoryTypes);
          }}
        >
          <MenuItem value={categoryTypes.ROOT}>Root</MenuItem>
          <MenuItem value={categoryTypes.CATEGORY}>Category</MenuItem>
          <MenuItem value={categoryTypes.SELECTION}>Selection</MenuItem>
          <MenuItem value={categoryTypes.SUPERSPORT}>SuperSport</MenuItem>
          <MenuItem value={categoryTypes.SUPERGROUP}>SuperGroup</MenuItem>
          <MenuItem value={categoryTypes.SPORT}>Sport</MenuItem>
          <MenuItem value={categoryTypes.GROUP}>Group</MenuItem>
          <MenuItem value={categoryTypes.COMPETITION}>Competition</MenuItem>
          <MenuItem value={categoryTypes.MATCH}>Match</MenuItem>
        </Select>
      </FormControl>
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
        <InputLabel>Notification client</InputLabel>
        <Select
          value={selectedChatId}
          onChange={(e) => {
            setSelectedChat(e.target.value as string);
          }}
        >
          {chats.map((chat) => (
            <MenuItem key={chat.chatId} value={chat.chatId}>
              {chat.name} ({chat.chatId})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
