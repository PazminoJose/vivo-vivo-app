export interface UserInDanger {
  userID: number;
  dni: string;
  avatar: string;
  fullName: string;
  phone: string;
  incidentTypeID: number | null;
  alarmID: number;
  position: { lat: number; lng: number };
}
