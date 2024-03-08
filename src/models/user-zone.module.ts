export interface UserZone {
  userZoneID?: number;
  userID: number;
  zoneID: number;
}

export interface UserZoneData {
  userZoneID: number;
  userID: number;
  personID: number;
  dni: string;
  avatar: string;
  firstName: string;
  middleName: string;
  lastNames: string;
}
