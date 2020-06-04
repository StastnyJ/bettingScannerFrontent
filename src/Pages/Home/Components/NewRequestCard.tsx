import React, { useState } from "react";
import { Card, CardContent, TextField, Typography, CardActions, Button } from "@material-ui/core";

type propsType = {
  createRequest: (url: string, displayUrl: string, keyword: string) => void;
};

export default function ({ createRequest }: propsType) {
  const [newReq, setNewReq] = useState({ url: "", keyword: "" });

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
      </CardContent>
      <CardActions style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto", marginRight: "12px" }}
          disabled={newReq.url.length === 0 || newReq.keyword.length === 0}
          onClick={() => {
            createRequest(newReq.url, "", newReq.keyword);
            setNewReq({ keyword: "", url: "" });
          }}
        >
          Add request
        </Button>
      </CardActions>
    </Card>
  );
}
