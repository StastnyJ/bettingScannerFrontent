import React, { Dispatch, SetStateAction } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Chat } from "../../../../Types/types";
import { categoryTypes } from "../NewTipsportRequestCard";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string; category?: categoryTypes };
  setNewTipsportReq: (req: {
    apiUrl: string;
    url: string;
    displayUrl: string;
    keyword: string;
    category?: categoryTypes;
  }) => void;
  chats: Chat[];
  selectedChatId: string;
  setSelectedChat: Dispatch<SetStateAction<string>>;
};

export default function ({ newTipsportReq, setNewTipsportReq, chats, selectedChatId, setSelectedChat }: propsType) {
  if (newTipsportReq.apiUrl !== "/requests/v1/withStatus/")
    setNewTipsportReq({ ...newTipsportReq, apiUrl: "/requests/v1/withStatus/" });

  return (
    <>
      <br />
      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel>Category type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newTipsportReq.category}
          onChange={(e) => {
            setNewTipsportReq({ ...newTipsportReq, category: e.target.value as categoryTypes });
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
      <TextField
        label="Category URL"
        value={newTipsportReq.url}
        onChange={(e) =>
          setNewTipsportReq({
            ...newTipsportReq,
            url: e.target.value,
            displayUrl: e.target.value,
            keyword: "Watchnig changes",
          })
        }
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
