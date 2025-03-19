import { useZoneControlStore } from "../store/zoneControl.store";
import ZonePolygon from "./ZonePolygon";

export default function ZonesPolygons() {
  // Store
  const zones = useZoneControlStore((state) => state.zones);

  return (
    zones &&
    zones.length > 0 &&
    zones.map((zone) => {
      return <ZonePolygon zone={zone} key={zone.zoneID} />;
    })
  );
}
