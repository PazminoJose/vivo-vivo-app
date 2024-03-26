"use client";
import SearchInput from "@/components/SearchInput";
import { Zone } from "@/models/zone.model";
import { Card, Radio } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { getZoneService } from "../services/getZones.service";
import { useZoneControlStore } from "../store/zoneControl.store";
import CardZone from "./CardZone";
import { Polygon } from "./Polygon";

type ViewZoneMode = "all" | "active" | "inactive";

export default function ZonesControl() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [zoneViewMode, setZoneViewMode] = useState<ViewZoneMode>("all");
  // const [debouncedZonePath, setDebouncedZonePath] = useState<number[][]>([]);
  const [debouncedZonePath, setDebouncedZonePath] = useDebouncedState<number[][]>([], 200);
  // Store
  const selectedZone = useZoneControlStore((state) => state.selectedZone);
  const setSelectedZone = useZoneControlStore((state) => state.setSelectedZone);
  const isEditingOrCreating = useZoneControlStore((state) => state.isEditingOrCreating);
  const setIsEditingOrCreating = useZoneControlStore((state) => state.setIsEditingOrCreating);
  const currentColor = useZoneControlStore((state) => state.currentColor);
  const setCurrentColor = useZoneControlStore((state) => state.setCurrentColor);
  // Query
  const { data } = useQuery({
    queryKey: ["zones"],
    queryFn: getZoneService
  });

  const handleSearch = (query: string) => {
    if (query) {
      const filteredZones = data?.filter((zone) =>
        zone.zoneName.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
      setZones(filteredZones ?? []);
    } else {
      setZones(data ?? []);
    }
  };

  const handleZoneViewModeChange = (mode: string) => {
    if (mode === "all") {
      setZones(data ?? []);
    } else {
      const filteredZones = data?.filter((zone) =>
        mode === "active" ? zone.state === 1 : zone.state === 0
      );
      setZones(filteredZones ?? []);
    }
    if (mode != zoneViewMode) setZoneViewMode(mode as ViewZoneMode);
  };

  const handleOnPathChange = (path: google.maps.LatLng[]) => {
    const points = path.map((p) => [p.lat(), p.lng()]);
    setDebouncedZonePath(points);
  };

  const handleOnEdit = (zone: Zone) => {
    setSelectedZone(zone);
    setCurrentColor(zone.zoneColor);
    setIsEditingOrCreating(true);
  };

  useEffect(() => {
    if (data) handleZoneViewModeChange(zoneViewMode);
  }, [data]);

  useEffect(() => {
    if (!isEditingOrCreating) setDebouncedZonePath([]);
  }, [isEditingOrCreating]);

  useEffect(() => {
    if (selectedZone) setSelectedZone({ ...selectedZone, polygon: debouncedZonePath });
  }, [debouncedZonePath]);

  return (
    <>
      {zones &&
        zones?.length > 0 &&
        zones.map((zone) => {
          const isEditingOrCreatingCurrentZone =
            isEditingOrCreating && zone.zoneID === selectedZone?.zoneID;
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
              onPathChange={handleOnPathChange}
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
        })}
      <MapControl position={ControlPosition.RIGHT_TOP}>
        <Card className="mr-4 flex max-h-[75vh] w-[17rem] flex-col gap-1 border border-primary-400 bg-primary-100 p-2 pr-0 shadow-lg">
          <h2 className="text-center text-lg font-bold">Zonas:</h2>
          <SearchInput className="pr-2" placeholder="Buscar zona" onSearch={handleSearch} />
          <Radio.Group label="Mostrar" value={zoneViewMode} onChange={handleZoneViewModeChange}>
            <div className="flex gap-3">
              <Radio value="all" label="Todas" />
              <Radio value="active" label="Activas" />
              <Radio value="inactive" label="Inactivas" />
            </div>
          </Radio.Group>
          <div className="mt-2 block overflow-y-scroll rounded-b-lg ">
            {zones && zones.length > 0 ? (
              zones.map((zone) => <CardZone key={zone.zoneID} zone={zone} onEdit={handleOnEdit} />)
            ) : (
              <p className="text-center">No hay zonas disponibles</p>
            )}
          </div>
        </Card>
      </MapControl>
    </>
  );
}
