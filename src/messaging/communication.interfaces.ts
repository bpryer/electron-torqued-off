
export enum ComType {
  PortList,
  ComData,
  Message,
  Error,
  Disconnect
}

export interface ICom {
  buffer?: any;
  type: ComType;
  payload: string | Error;
}
