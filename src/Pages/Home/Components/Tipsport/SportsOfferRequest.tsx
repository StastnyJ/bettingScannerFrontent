import React from "react";
import { TextField } from "@material-ui/core";

type propsType = {
  newTipsportReq: { url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { url: string; displayUrl: string; keyword: string }) => void;
};

export default function ({ newTipsportReq, setNewTipsportReq }: propsType) {
  const apiUrl = "https://m.tipsport.cz/rest/offer/v2/sports?fromResults=false";
  if (newTipsportReq.url !== apiUrl) setNewTipsportReq({ url: apiUrl, displayUrl: "Sports offer in left menu", keyword: "" });

  return (
    <TextField
      label="Keyword"
      value={newTipsportReq.keyword}
      onChange={(e) => setNewTipsportReq({ ...newTipsportReq, keyword: e.target.value })}
      style={{ width: "100%" }}
    />
  );
}
