import React, { Dispatch, SetStateAction } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { apiUrl: string; url: string; displayUrl: string; keyword: string }) => void;
  emails: string[];
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
};

export default function ({ newTipsportReq, setNewTipsportReq, emails, selectedEmail, setSelectedEmail }: propsType) {
  if (newTipsportReq.apiUrl !== "/requests/v1/withStatus/")
    setNewTipsportReq({ ...newTipsportReq, apiUrl: "/requests/v1/withStatus/" });

  return (
    <>
      <TextField
        label="Category URL"
        value={newTipsportReq.url}
        onChange={(e) =>
          setNewTipsportReq({ ...newTipsportReq, url: e.target.value, displayUrl: e.target.value, keyword: "Watchnig changes" })
        }
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <FormControl style={{ width: "100%" }}>
        <InputLabel>Email</InputLabel>
        <Select
          value={selectedEmail}
          onChange={(e) => {
            setSelectedEmail(e.target.value as string);
          }}
        >
          {emails.map((mail) => (
            <MenuItem key={mail} value={mail}>
              {mail}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
