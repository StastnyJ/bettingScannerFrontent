import React, { useEffect, useState } from "react";
import { Card, CardContent, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { Slave } from "../../../Types/types";
import { api } from "../../../Utils/ApiService";
import { PowerSettingsNew, Public } from "@mui/icons-material";

export default function SlavesCard() {
  const [slaves, setSlaves] = useState<Slave[]>([]);

  useEffect(() => {
    api.get(
      "/master/v1/getSlaves",
      {},
      {
        success: setSlaves,
        error: console.log,
      }
    );
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Slave servers</Typography>
        <br />
        <List>
          {slaves.map((s) => (
            <ListItem key={s.ipAddress}>
              <ListItemText primary={`${s.ipAddress}:${s.port}`} secondary={s.lastUsed ? `Last used: ${new Date(s.lastUsed).toLocaleString()}` : ""} />
              <Tooltip title="Test server">
                <ListItemIcon>
                  <IconButton
                    onClick={() =>
                      api.post("/master/v1/testSlave", { slaveAddress: s.ipAddress }, null, {
                        success: (res: { active: boolean; tipsportConnected: boolean }) =>
                          alert(
                            `Server is running: ${res.active ? "YES" : "NO"}\nServer can communicate with TipSport: ${res.tipsportConnected ? "YES" : "NO"}`
                          ),
                        error: () => alert("Error while testing this server."),
                      })
                    }
                  >
                    <Public color="primary" />
                  </IconButton>
                </ListItemIcon>
              </Tooltip>
              <Tooltip title={s.enabled ? "Disable this server" : "Enable this server"}>
                <ListItemIcon>
                  <IconButton
                    onClick={() =>
                      api.post("/master/v1/changeEnabled", { slaveAddress: s.ipAddress, enabled: !s.enabled }, null, {
                        success: () => setSlaves(slaves.map((ss) => (ss.ipAddress === s.ipAddress ? { ...ss, enabled: !s.enabled } : ss))),
                        error: console.log,
                      })
                    }
                  >
                    <PowerSettingsNew color={s.enabled ? "error" : "primary"} />
                  </IconButton>
                </ListItemIcon>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
