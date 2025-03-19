import { Position } from "./position.model";

export interface WatchmanLocation {
  watchmanUserID: number;
  // phone: string;
  // avatar: string;
  // fullName: string;
  position: Position;
}

export interface WatchmanInfo {
  watchmanUserID: number;
  phone: string;
  avatar: string;
  fullName: string;
}
