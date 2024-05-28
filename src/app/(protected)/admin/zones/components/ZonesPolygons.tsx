import { Zone } from "@/models/zone.model";
import { useZoneControlStore } from "../store/zoneControl.store";
import { Polygon } from "./Polygon";

interface ZonesPolygonsProps {
  zones: Zone[];
  onPathChange: (path: google.maps.LatLng[]) => void;
  debouncedZonePath: number[][];
}

export default function ZonesPolygons({ zones, onPathChange, debouncedZonePath }: ZonesPolygonsProps) {
  const isEditingOrCreating = useZoneControlStore((state) => state.isEditingOrCreating);
  const selectedZone = useZoneControlStore((state) => state.selectedZone);
  const currentColor = useZoneControlStore((state) => state.currentColor);

  return (
    zones &&
    zones?.length > 0 &&
    zones.map((zone) => {
      const isEditingOrCreatingCurrentZone = isEditingOrCreating && zone.zoneID === selectedZone?.zoneID;
      const isActive = zone.state === 1;
      const path = zone.polygon.map((p) => {
        return new google.maps.LatLng(p[0], p[1]);
      });
      return (
        <Polygon
          editable={isEditingOrCreatingCurrentZone}
          draggable={isEditingOrCreatingCurrentZone}
          fillColor={
            isActive ? (isEditingOrCreatingCurrentZone ? currentColor : zone.zoneColor) : "grey"
          }
          strokeColor={
            isActive ? (isEditingOrCreatingCurrentZone ? currentColor : zone.zoneColor) : "grey"
          }
          onPathChange={onPathChange}
          key={zone.zoneID}
          paths={
            isEditingOrCreatingCurrentZone && debouncedZonePath.length > 0
              ? debouncedZonePath.map((p) => {
                  return new google.maps.LatLng(p[0], p[1]);
                })
              : path
          }
        />
      );
    })
  );
}
