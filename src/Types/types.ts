export type Request = {
  scanUrl: string;
  displayUrl: string;
  keyword: string;
  chatId: string;
  createdDate: string;
  finnished: boolean;
};

export type Match = {
  description: string;
  id: number;
  matchUrl: string;
};

export type Chat = {
  chatId: string;
  userName: string;
};
