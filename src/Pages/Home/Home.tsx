import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Request } from "../../Types/types";
import NewRequestCard from "./Components/NewRequestCard";
import NewTipsportRequestCard from "./Components/NewTipsportRequestCard";
import RequestsCard from "./Components/RequestsCard";
import ChatsCard from "./Components/ChatsCard";
import { api } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import SlavesCard from "./Components/SlavesCard";

export default function Home() {
  const admins = ["auth0|60e0de5c66d70f00715db4cf", "auth0|60e1f3d82910080070278aab"];

  const { isAuthenticated, user } = useAuth0();
  const [requests, setRequests] = useState<Request[]>([]);

  const isAdmin = isAuthenticated && admins.includes(user?.sub || "");
  const loadRequests = () => {
    api.get(
      `requests/v1/all`,
      { visibleOnly: false },
      {
        success: setRequests,
        error: console.log,
      }
    );
  };

  const createRequest = (apiUrl: string, url: string, displayUrl: string, keyword?: string, email?: string, category?: string) => {
    api.post(
      apiUrl,
      {
        url: url,
        keyword: keyword,
        matchUrl: displayUrl,
        email: email,
        category: category,
      },
      undefined,
      {
        success: (req) => setRequests([req, ...requests]),
        error: console.log,
      }
    );
  };

  const deleteRequest = (id: number) => {
    api.delete(
      "requests/v1/",
      {
        id: id,
      },
      undefined,
      {
        success: () => setRequests(requests.filter((req) => req.id !== id)),
        error: console.log,
      }
    );
  };

  useEffect(loadRequests, [isAuthenticated]);

  return (
    <Grid container className="page-container">
      {requests.length === 0 && <Grid item xs={12} lg={1}></Grid>}
      <Grid item xs={12} lg={5} style={{ padding: 16 }}>
        <NewRequestCard createRequest={createRequest} isAdmin={isAdmin} />
        <br />
        <br />
        <NewTipsportRequestCard createRequest={createRequest} isAdmin={isAdmin} />
        <br />
        <br />
        <ChatsCard isAdmin={isAdmin} />
        <br />
        <br />
        {isAdmin && <SlavesCard />}
        {isAdmin && (
          <>
            <br />
            <Button
              onClick={() =>
                api.post("/requests/v1/clear", {}, null, {
                  success: () => alert("State reset successfull"),
                  error: () => alert("Error while reseting state"),
                })
              }
              variant="contained"
              color="primary"
            >
              Reset state
            </Button>
          </>
        )}
      </Grid>
      {requests.length > 0 && (
        <Grid item xs={12} lg={7} style={{ padding: 16 }}>
          <RequestsCard requests={requests} deleteRequest={deleteRequest} setRequests={setRequests} createRequest={createRequest} isAdmin={isAdmin} />
        </Grid>
      )}
    </Grid>
  );
}
