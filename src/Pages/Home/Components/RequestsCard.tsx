import React from "react";
import { Card, CardContent, Typography, Table, TableRow, TableCell, TableHead, TableBody, Chip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Request } from "../../../Types/types";

type propsType = {
  requests: Request[];
  loadRequests: () => void;
  deleteRequest: (createdDate: string) => void;
  createRequest: (apiUrl: string, url: string, displayUrl: string, keyword: string, email: string) => void;
};

export default function ({ requests, loadRequests, deleteRequest, createRequest }: propsType) {
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
            {requests.map((req) => (
              <TableRow key={req.createdDate}>
                <TableCell>
                  <a href={req.displayUrl} target="blank">
                    {req.displayUrl}
                  </a>
                </TableCell>
                <TableCell>{req.keyword}</TableCell>
                <TableCell>{req.chatId}</TableCell>
                <TableCell>{req.finnished ? <Chip label="Finnished" color="primary" /> : <Chip label="Waiting" />}</TableCell>
                <TableCell>
                  <DeleteIcon
                    style={{ color: "red", cursor: "pointer", float: "right" }}
                    onClick={() => deleteRequest(req.createdDate)}
                  />
                  {req.finnished && (
                    <AutorenewIcon
                      style={{ color: "blue", cursor: "pointer", float: "right" }}
                      onClick={() => createRequest("/requests/v1/", req.scanUrl, req.displayUrl, req.keyword, req.chatId)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
