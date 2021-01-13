import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Chat } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";

type propsType = {
  createRequest: (apiUrl: string, url: string, displayUrl: string, keyword: string, email: string) => void;
  isAdmin: boolean;
};

export default function ({ createRequest, isAdmin }: propsType) {
  const [newReq, setNewReq] = useState({ url: "", keyword: "" });
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChat] = useState<string>("");

  const loadEmails = () => {
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

  useEffect(loadEmails, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">New request</Typography>
        <br />
        <TextField
          label="Url address"
          value={newReq.url}
          onChange={(e) => setNewReq({ ...newReq, url: e.target.value })}
          style={{ width: "100%" }}
        />
        <TextField
          label="Keyword"
          value={newReq.keyword}
          onChange={(e) => setNewReq({ ...newReq, keyword: e.target.value })}
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
            {chats
              .filter((ch) => isAdmin || ch.visible)
              .map((chat) => (
                <MenuItem key={chat.chatId} value={chat.chatId}>
                  {chat.name} ({chat.chatId})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto", marginRight: "12px" }}
          disabled={newReq.url.length === 0 || newReq.keyword.length === 0 || selectedChatId.length === 0}
          onClick={() => {
            createRequest("/requests/v1/", newReq.url, "", newReq.keyword, selectedChatId);
            setNewReq({ keyword: "", url: "" });
          }}
        >
          Add request
        </Button>
      </CardActions>
    </Card>
  );
}
