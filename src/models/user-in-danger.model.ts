export interface UserInDanger {
  userID: number;
  dni: string;
  avatar: string;
  fullName: string;
  phone: string;
  incidentTypeName: string | null;
  alarmID: number;
  position: { lat: number; lng: number };
  closestVigilancePointName: string;
  color: string;
}

export interface UserInDangerByIncidentHierarchy {
  incidentTypeHierarchyID: number;
  incidentTypeHierarchyName: string;
  usersInDanger: UserInDanger[];
  color: string;
}
