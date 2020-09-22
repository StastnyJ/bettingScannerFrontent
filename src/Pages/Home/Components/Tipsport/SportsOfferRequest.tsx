import React, { Dispatch, SetStateAction } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Chat } from "../../../../Types/types";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { apiUrl: string; url: string; displayUrl: string; keyword: string }) => void;
  chats: Chat[];
  selectedChatId: string;
  setSelectedChat: Dispatch<SetStateAction<string>>;
};

export default function ({ newTipsportReq, setNewTipsportReq, chats, selectedChatId, setSelectedChat }: propsType) {
  const tipsportApiUrl = "https://m.tipsport.cz/rest/offer/v2/sports?fromResults=false";
  if (newTipsportReq.url !== tipsportApiUrl)
    setNewTipsportReq({ ...newTipsportReq, url: tipsportApiUrl, displayUrl: "Sports offer in left menu", keyword: "" });

  return (
    <>
      <TextField
        label="Keyword"
        value={newTipsportReq.keyword}
        onChange={(e) => setNewTipsportReq({ ...newTipsportReq, keyword: e.target.value })}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <FormControl style={{ width: "100%" }}>
        <InputLabel>Notification clinet</InputLabel>
        <Select
          value={selectedChatId}
          onChange={(e) => {
            setSelectedChat(e.target.value as string);
          }}
        >
          {chats.map((chat) => (
            <MenuItem key={chat.chatId} value={chat.chatId}>
              {chat.userName} ({chat.chatId})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
