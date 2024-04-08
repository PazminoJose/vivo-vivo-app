export interface UserInDanger {
  userID: number;
  dni: string;
  avatar: string;
  fullName: string;
  phone: string;
  incidentTypeName: string | null;
  alarmID: number;
  position: { lat: number; lng: number };
}
