export interface Request {
  id: number;
  scanUrl: string;
  displayUrl: string;
  keyword?: string;
  chatId: string;
  userId?: string;
  finnished: boolean;
  visibe: boolean;
  createdDate: string;
  tipsportCategory?: string;
  state?: string;
  requestType: "NORMAL" | "STATE" | "GENERATED" | "REPEATED";
}

export type Match = {
  description: string;
  id: number;
  matchUrl: string;
};

export type Chat = {
  chatId: string;
  name: string;
  visible: Boolean;
  platform: string;
  details: string;
};

export type Slave = {
  ipAddress: string;
  port: number;
  enabled: boolean;
  lastUsed?: Date;
};
