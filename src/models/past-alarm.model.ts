export interface PastAlarm {
  userID: number;
  fullName: string;
  dni: string;
  phone: string;
  avatar: string;
  startCanton: string;
  startDate: string;
  startDistrict: string;
  endCanton: string;
  endDistrict: string;
  endDate: string;
  incidentType?: string;
}
