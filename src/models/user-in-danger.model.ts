export interface UserInDanger {
  userID: number;
  dni: string;
  avatar: string;
  fullName: string;
  phone: string;
  position: { lat: number; lng: number };
}
