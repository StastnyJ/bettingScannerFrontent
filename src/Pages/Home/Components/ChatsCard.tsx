import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Snackbar, List, ListItem, IconButton, TextField, Alert } from "@mui/material";
// import DeleteIcon from "@material-ui/icons/Delete";
import { Chat } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";
import { Delete, Visibility, VisibilityOff, Email } from "@mui/icons-material";
import AddDiscordChatClientModal from "../Modals/AddDiscordChatClientModal";

export default function ChatsCard({ isAdmin }: { isAdmin: boolean }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [openSuccess, setOpenSuccess] = useState(false);

  const loadChats = () => {
    api.get(
      "notifications/v1/getChats",
      { visibleOnly: false },
      {
        success: setChats,
        error: console.log,
      }
    );
  };

  const removeChat = (chatId: String) => {
    api.delete("/notifications/v1/", { id: chatId }, null, {
      success: () => setChats(chats.filter((ch) => ch.chatId !== chatId)),
      error: () => alert("error"),
    });
  };

  const testNotification = (chatId: String) => {
    api.post(
      "notifications/v1/test",
      {
        chatId: chatId,
      },
      undefined,
      {
        success: () => setOpenSuccess(true),
        error: console.log,
      }
    );
  };

  useEffect(loadChats, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Connected notification clients</Typography>
          <br />
          <List>
            {chats
              .filter((ch) => isAdmin || ch.visible)
              .map((ch) => (
                <ListItem key={ch.chatId}>
                  {isAdmin && (
                    <>
                      <Delete onClick={() => removeChat(ch.chatId)} style={{ color: "red", cursor: "pointer", marginRight: "4px" }} />
                      <IconButton
                        aria-label="toggle visibility"
                        onClick={() =>
                          api.post("/notifications/v1/toggleVisibility", { id: ch.chatId }, null, {
                            success: () => setChats(chats.map((chat) => (chat.chatId === ch.chatId ? { ...chat, visible: !chat.visible } : chat))),
                            error: () => alert("Chyba"),
                          })
                        }
                      >
                        {ch.visible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </>
                  )}
                  <Email onClick={() => testNotification(ch.chatId)} style={{ cursor: "pointer", marginRight: "24px" }} />
                  {isAdmin ? (
                    <>
                      <TextField
                        value={ch.name}
                        onChange={(e) => setChats(chats.map((chat) => (chat.chatId === ch.chatId ? { ...chat, name: e.target.value } : chat)))}
                        onBlur={(e) => api.post("/notifications/v1/rename", { id: ch.chatId, name: ch.name }, null)}
                      />
                    </>
                  ) : (
                    ch.name
                  )}{" "}
                  ({ch.chatId})
                </ListItem>
              ))}
          </List>
          <AddDiscordChatClientModal addChat={(newChat) => setChats([...chats, newChat])} />
        </CardContent>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setOpenSuccess(false)} severity="success">
          Test notification was sent successfully.
        </Alert>
      </Snackbar>
    </>
  );
}
