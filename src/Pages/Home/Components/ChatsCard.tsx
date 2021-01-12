import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Snackbar, List, ListItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import { Chat } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";

export default function () {
  const [chats, setChats] = useState<Chat[]>([]);
  const [openSuccess, setOpenSuccess] = useState(false);

  const loadChats = () => {
    api.get("notifications/v1/getChats", undefined, {
      success: setChats,
      error: console.log,
    });
  };

  // const removeChat = (email: String) => {
  //   fetch(`/emails/v1/?email=${email}`, { method: "DELETE" })
  //     .then((response) => {
  //       if (response.ok) {
  //         setEmails(emails.filter((e) => email !== e));
  //       } else {
  //         console.log(response.statusText);
  //       }
  //     })
  //     .catch(console.log);
  // };

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
            {chats.map((ch) => (
              <ListItem key={ch.chatId}>
                {/* <DeleteIcon
                  // onClick={() => removeChat(e)}
                  style={{ color: "red", cursor: "pointer", marginRight: "4px" }}
                ></DeleteIcon>{" "} */}
                <EmailIcon
                  onClick={() => testNotification(ch.chatId)}
                  style={{ cursor: "pointer", marginRight: "24px" }}
                ></EmailIcon>
                {ch.name} ({ch.chatId})
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSuccess(false)} severity="success">
          Test notification was sent successfully.
        </MuiAlert>
      </Snackbar>
    </>
  );
}
