export interface Zone {
  VigilancePoint: VigilancePoint[];
  zoneID: number;
  zoneName: string;
  zoneColor: string;
  state: number;
  polygon: Array<number[]>;
  center: number[];
}

export interface VigilancePoint {
  vigilancePointID?: number;
  vigilancePointName: string;
  zoneID: number;
  latitude: number;
  longitude: number;
}
