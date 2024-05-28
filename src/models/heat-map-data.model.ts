export interface HeatMapData {
  incidentTypeID: number;
  incidentTypeName: string;
  points: Array<number[]>;
  gradient: string[];
}
