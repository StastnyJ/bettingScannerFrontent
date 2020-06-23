import React from "react";
import { TextField } from "@material-ui/core";

type propsType = {
  newTipsportReq: { url: string; displayUrl: string; keyword: string };
  setNewTipsportReq: (req: { url: string; displayUrl: string; keyword: string }) => void;
};

export default function ({ newTipsportReq, setNewTipsportReq }: propsType) {
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
    </>
  );
}
