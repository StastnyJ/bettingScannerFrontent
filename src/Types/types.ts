export type Request = {
  scanUrl: string;
  displayUrl: string;
  keyword: string;
  createdDate: string;
  finnished: boolean;
};

export type Match = {
  description: string;
  id: number;
  matchUrl: string;
};
