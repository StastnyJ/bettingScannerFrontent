import React, { Dispatch, SetStateAction } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

type propsType = {
  newTipsportReq: { url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { url: string; displayUrl: string; keyword: string }) => void;
  emails: string[];
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
};

export default function ({ newTipsportReq, setNewTipsportReq, emails, selectedEmail, setSelectedEmail }: propsType) {
  return (
    <>
      <TextField
        label="Competition URL"
        value={newTipsportReq.displayUrl}
        onChange={(e) =>
          setNewTipsportReq({
            ...newTipsportReq,
            url:
              e.target.value.length > 0
                ? `https://betting-scanner-api.herokuapp.com/tipsport/v1/matches?url=${e.target.value}`
                : "",
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
