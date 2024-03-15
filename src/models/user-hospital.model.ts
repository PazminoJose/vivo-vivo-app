export interface UserHospital {
  userHospitalID?: number;
  userID: number;
  hospitalID: number;
}

export interface UserHospitalData {
  userHospitalID: number;
  userID: number;
  personID: number;
  dni: string;
  avatar: string;
  firstName: string;
  middleName: string;
  lastNames: string;
}
