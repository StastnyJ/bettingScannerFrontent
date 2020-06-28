export type Request = {
  scanUrl: string;
  displayUrl: string;
  keyword: string;
  email: string;
  createdDate: string;
  finnished: boolean;
};

export type Match = {
  description: string;
  id: number;
  matchUrl: string;
};
