"use client";
import SearchInput from "@/components/SearchInput";
import { Card, Radio } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useGetZones } from "../services/getZones.service";
import { useZoneControlStore } from "../store/zoneControl.store";
import CardZone from "./CardZone";

type ViewZoneMode = "all" | "active" | "inactive";

export default function ZonesControl() {
  const [zoneViewMode, setZoneViewMode] = useState<ViewZoneMode>("active");
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Store
  const zones = useZoneControlStore((state) => state.zones);
  const setZones = useZoneControlStore((state) => state.setZones);
  const showVigilancePointsInZone = useZoneControlStore((state) => state.showVigilancePointsInZone);
  const setShowVigilancePointsInZone = useZoneControlStore(
    (state) => state.setShowVigilancePointsInZone
  );

  // Query
  const { data } = useGetZones();

  const handleSearch = (query: string) => {
    let zoneData = zones;
    if (query) {
      zoneData = zones?.filter((zone) =>
        zone.zoneName.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
    }
    zoneData = zoneData;
    setZones(zoneData ?? []);
    setSearchQuery(query);
  };

  const handleZoneViewModeChange = (mode: string) => {
    let zonesData = data;
    if (mode !== "all") {
      setZones(zonesData ?? []);
      zonesData = data?.filter((zone) => (mode === "active" ? zone.state === 1 : zone.state === 0));
    }
    setZones(zonesData ?? []);
    zonesData?.forEach((zone) =>
      setShowVigilancePointsInZone(zone.zoneID, showVigilancePointsInZone[zone.zoneID] ?? false)
    );
    if (mode != zoneViewMode) setZoneViewMode(mode as ViewZoneMode);
  };

  useShallowEffect(() => {
    if (data) handleZoneViewModeChange(zoneViewMode);
  }, [data]);

  return (
    <MapControl position={ControlPosition.RIGHT_TOP}>
      <Card className="border-primary-400 bg-primary-100 mr-4 flex max-h-[75vh] w-[17rem] flex-col gap-1 border p-2 pr-0 shadow-lg">
        <h2 className="text-center text-lg font-bold">Zonas:</h2>
        <SearchInput className="pr-2" placeholder="Buscar zona" onSearch={handleSearch} />
        <Radio.Group label="Mostrar" value={zoneViewMode} onChange={handleZoneViewModeChange}>
          <div className="flex gap-3">
            <Radio value="all" label="Todas" />
            <Radio value="active" label="Activas" />
            <Radio value="inactive" label="Inactivas" />
          </div>
        </Radio.Group>
        <div className="mt-2 block overflow-y-scroll rounded-b-lg">
          {zones && zones.length > 0 ? (
            zones.map((zone) => <CardZone key={zone.zoneID} zone={zone} />)
          ) : (
            <p className="text-center">No hay zonas disponibles</p>
          )}
        </div>
      </Card>
    </MapControl>
  );
}
