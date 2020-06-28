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
  const apiUrl = "https://m.tipsport.cz/rest/offer/v2/sports?fromResults=false";
  if (newTipsportReq.url !== apiUrl) setNewTipsportReq({ url: apiUrl, displayUrl: "Sports offer in left menu", keyword: "" });

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
