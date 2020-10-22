import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Request } from "../../Types/types";
import NewRequestCard from "./Components/NewRequestCard";
import NewTipsportRequestCard from "./Components/NewTipsportRequestCard";
import RequestsCard from "./Components/RequestsCard";
import ChatsCard from "./Components/ChatsCard";
import { api } from "../../Utils/ApiService";

export default function () {
  const [requests, setRequests] = useState<Request[]>([]);

  const loadRequests = () => {
    api.get(`requests/v1/all`, undefined, {
      success: setRequests,
      error: console.log,
    });
  };

  const createRequest = (apiUrl: string, url: string, displayUrl: string, keyword: string, email: string) => {
    api.post(
      apiUrl,
      {
        url: url,
        keyword: keyword,
        matchUrl: displayUrl,
        email: email,
      },
      undefined,
      {
        success: (req) => setRequests([req, ...requests]),
        error: console.log,
      }
    );
  };

  const deleteRequest = (createdDate: string) => {
    api.delete(
      "requests/v1/",
      {
        date: createdDate,
      },
      undefined,
      {
        success: () => setRequests(requests.filter((req) => req.createdDate !== createdDate)),
        error: console.log,
      }
    );
  };

  useEffect(loadRequests, []);

  return (
    <Grid container className="page-container">
      {requests.length === 0 && <Grid item xs={12} lg={1}></Grid>}
      <Grid item xs={12} lg={5} style={{ padding: 16 }}>
        <NewRequestCard createRequest={createRequest} />
        <br />
        <br />
        <NewTipsportRequestCard createRequest={createRequest} />
      </Grid>
      {requests.length > 0 && (
        <Grid item xs={12} lg={7} style={{ padding: 16 }}>
          <RequestsCard
            requests={requests}
            deleteRequest={deleteRequest}
            loadRequests={loadRequests}
            createRequest={createRequest}
          />
        </Grid>
      )}
      <Grid item xs={12} lg={5} style={{ padding: 16 }}>
        <ChatsCard />
      </Grid>
    </Grid>
  );
}
