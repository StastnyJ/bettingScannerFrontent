import React, { Dispatch, SetStateAction } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Chat } from "../../../../Types/types";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { apiUrl: string; url: string; displayUrl: string; keyword: string }) => void;
  chats: Chat[];
  selectedChatId: string;
  setSelectedChat: Dispatch<SetStateAction<string>>;
};

export default function MatchOfferRequest({ newTipsportReq, setNewTipsportReq, chats, selectedChatId, setSelectedChat }: propsType) {
  return (
    <>
      <TextField
        label="Competition URL"
        value={newTipsportReq.displayUrl}
        onChange={(e) =>
          setNewTipsportReq({
            ...newTipsportReq,
            url: e.target.value.length > 0 ? `https://api.scanner.stastnyjakub.com/master/v1/matches?url=${e.target.value}` : "",
            displayUrl: e.target.value,
          })
        }
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
