export interface IncidentType {
  incidentTypeID: number;
  incidentTypeName: string;
  incidentTypeDesc: string;
  state: number;
}

export interface IncidentTypeData
  extends Omit<IncidentType, "incidentTypeDesc" | "state" | "incidentTypeID"> {
  incidentTypeID?: number;
}
