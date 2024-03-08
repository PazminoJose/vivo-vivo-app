export interface Zone {
  zoneID: number;
  zoneName: string;
  zoneColor: string;
  state: number;
  polygon: Array<number[]>;
  center: number[];
}
