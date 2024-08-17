export interface IncidentType {
  incidentTypeID: number;
  incidentTypeName: string;
  incidentTypeHierarchyID: number;
  incidentTypeHierarchyName: string;
  incidentTypeDesc: string;
  state: 0 | 1;
}

export interface IncidentTypeData
  extends Omit<
    IncidentType,
    | "incidentTypeDesc"
    | "state"
    | "incidentTypeID"
    | "incidentTypeHierarchyID"
    | "incidentTypeHierarchyName"
  > {
  incidentTypeID?: number;
}
