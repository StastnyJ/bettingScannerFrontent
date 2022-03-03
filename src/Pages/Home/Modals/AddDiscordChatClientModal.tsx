import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Chat } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";

interface IProps {
  addChat: (chat: Chat) => void;
}

export default function AddDiscordChatClientModal({ addChat }: IProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [webhook, setWebhook] = useState("");

  const reset = () => {
    setOpen(false);
    setName("");
    setWebhook("");
  };

  const saveChanges = () => {
    if (name && webhook && webhook.length > 0 && name.length > 0) {
      api.post(
        "notifications/v1/registerDiscord",
        {
          name: name,
          webhook: webhook,
        },
        null,
        {
          success: (chatId: string) =>
            addChat({
              chatId: chatId,
              name: name,
              visible: true,
              details: webhook,
              platform: "Discord",
            }),
          error: () => alert("Error during saving chat client"),
        }
      );
      reset();
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary">
        + Add new discord client
      </Button>
      <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add new discord client</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Webhook" fullWidth value={webhook} onChange={(e) => setWebhook(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={!(name && webhook && webhook.length > 0 && name.length > 0)} color="primary" onClick={saveChanges}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
