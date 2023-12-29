"use client";
import LeafletMap from "@/components/leaflet-map/leaflet-map";
import { HeatLatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { getPointsService } from "../services/get-points.service";
import HeatMapLayer from "./heat-map-layer";

export default function HeatMap() {
  const [points, setPoints] = useState<HeatLatLngTuple[]>([]);

  const getPoints = async () => {
    const res = await getPointsService();
    setPoints(res.points);
  };
  useEffect(() => {
    getPoints();
  }, []);

  return (
    <LeafletMap>
      <HeatMapLayer points={points ?? []} />
    </LeafletMap>
  );
}
