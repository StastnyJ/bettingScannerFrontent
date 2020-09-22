import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Request } from "../../Types/types";
import NewRequestCard from "./Components/NewRequestCard";
import NewTipsportRequestCard from "./Components/NewTipsportRequestCard";
import RequestsCard from "./Components/RequestsCard";
import ChatsCard from "./Components/ChatsCard";

export default function () {
  const [requests, setRequests] = useState<Request[]>([]);

  const loadRequests = () => {
    fetch(`/requests/v1/all`)
      .then((response) => {
        if (response.ok) {
          response.json().then(setRequests);
        } else {
          console.log(response.statusText);
        }
      })
      .catch(console.log);
  };

  const createRequest = (apiUrl: string, url: string, displayUrl: string, keyword: string, email: string) => {
    fetch(`${apiUrl}?url=${url}&keyword=${keyword}&matchUrl=${displayUrl}&email=${email}`, {
      method: "post",
    })
      .then((response) => {
        if (response.ok)
          response.json().then((req: Request) => {
            setRequests([req, ...requests]);
          });
        else {
          console.log(response.statusText);
          alert("There was an error during creating a request");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("There was an error during creating a request");
      });
  };

  const deleteRequest = (createdDate: string) => {
    fetch(`/requests/v1/?date=${createdDate}`, {
      method: "delete",
    })
      .then((response) => {
        if (response.ok) {
          setRequests(requests.filter((req) => req.createdDate !== createdDate));
        } else {
          console.log(response.statusText);
          alert("There was an error during deleting a request");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("There was an error during deleting a request");
      });
  };

  useEffect(loadRequests, []);

  return (
    <Grid container spacing={3} className="page-container">
      {requests.length === 0 && <Grid item xs={12} lg={1}></Grid>}
      <Grid item xs={12} lg={5}>
        <NewRequestCard createRequest={createRequest} />
        <br />
        <br />
        <NewTipsportRequestCard createRequest={createRequest} />
      </Grid>
      {requests.length > 0 && (
        <Grid item xs={12} lg={7}>
          <RequestsCard
            requests={requests}
            deleteRequest={deleteRequest}
            loadRequests={loadRequests}
            createRequest={createRequest}
          />
        </Grid>
      )}
      <Grid item xs={12} lg={5}>
        <ChatsCard />
      </Grid>
    </Grid>
  );
}
