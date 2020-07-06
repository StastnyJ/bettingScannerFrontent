import React, { Dispatch, SetStateAction, useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

type propsType = {
  newTipsportReq: { apiUrl: string; url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { apiUrl: string; url: string; displayUrl: string; keyword: string }) => void;
  emails: string[];
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
};

enum categoryTypes {
  ROOT = "ROOT",
  CATEGORY = "CATEGORY",
  SELECTION = "SELECTION",
  SUPERSPORT = "SUPERSPORT",
  SUPERGROUP = "SUPERGROUP",
  SPORT = "SPORT",
  GROUP = "GROUP",
  COMPETITION = "COMPETITION",
  MATCH = "MATCH",
}

export default function ({ newTipsportReq, setNewTipsportReq, emails, selectedEmail, setSelectedEmail }: propsType) {
  if (newTipsportReq.apiUrl !== "/requests/v1/withStatus/")
    setNewTipsportReq({ ...newTipsportReq, apiUrl: "/requests/v1/withStatus/" });

  const [category, setCategory] = useState<categoryTypes>(categoryTypes.COMPETITION);

  return (
    <>
      <br />
      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel>Category type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as categoryTypes);
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
            url: e.target.value + "<categorySeparator>" + category,
            displayUrl: e.target.value,
            keyword: "Watchnig changes",
          })
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
