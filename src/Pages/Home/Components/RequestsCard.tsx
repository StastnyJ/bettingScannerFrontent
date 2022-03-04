import React from "react";
import { Card, CardContent, Typography, Table, TableRow, TableCell, TableHead, TableBody, Chip } from "@mui/material";
import { Request } from "../../../Types/types";
import { Visibility, VisibilityOff, Delete, Autorenew } from "@mui/icons-material";
import { api } from "../../../Utils/ApiService";

type propsType = {
  requests: Request[];
  setRequests: (requests: Request[]) => void;
  deleteRequest: (id: number) => void;
  createRequest: (apiUrl: string, url: string, displayUrl: string, keyword?: string, email?: string) => void;
  isAdmin: boolean;
};

export default function RequestsCard({ requests, setRequests, deleteRequest, createRequest, isAdmin }: propsType) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Current requests</Typography>
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>Notification Id</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .filter((r) => (isAdmin || r.visibe) && r.requestType !== "GENERATED")
              .map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    <a href={req.displayUrl} target="blank">
                      {req.displayUrl}
                    </a>
                  </TableCell>
                  <TableCell>
                    {req.requestType === "REPEATED" && <b>Repeated </b>}
                    {req.keyword || "Watching status"}
                  </TableCell>
                  <TableCell>{req.chatId}</TableCell>
                  <TableCell>{req.finnished ? <Chip label="Finnished" color="primary" /> : <Chip label="Waiting" />}</TableCell>
                  <TableCell style={{ minWidth: 64 }}>
                    <Delete style={{ color: "red", cursor: "pointer", float: "right" }} onClick={() => deleteRequest(req.id)} />
                    {req.finnished && (
                      <Autorenew
                        style={{ color: "blue", cursor: "pointer", float: "right" }}
                        onClick={() => createRequest("/requests/v1/", req.scanUrl, req.displayUrl, req.keyword, req.chatId)}
                      />
                    )}
                    {isAdmin &&
                      (req.visibe ? (
                        <Visibility
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            api.post("/requests/v1/toggleVisibility", { id: req.id }, null, {
                              success: () => setRequests(requests.map((r) => (r.id === req.id ? { ...r, visibe: !r.visibe } : r))),
                              error: () => alert("Chyba"),
                            })
                          }
                        />
                      ) : (
                        <VisibilityOff
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            api.post("/requests/v1/toggleVisibility", { id: req.id }, null, {
                              success: () => setRequests(requests.map((r) => (r.id === req.id ? { ...r, visibe: !r.visibe } : r))),
                              error: () => alert("Chyba"),
                            })
                          }
                        />
                      ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
