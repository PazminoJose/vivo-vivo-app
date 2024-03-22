"use client";
import { useEffect, useMemo, useState } from "react";
import Map from "../../components/Map";
import { getPointsService } from "../services/get-points.service";
import HeatMapLayer from "./HeatMapLayer";

export default function HeatMap() {
  const defaultCenter: google.maps.LatLngLiteral = useMemo(() => ({ lat: -1.253351, lng: -78.623011 }), []);
  const [points, setPoints] = useState<google.maps.LatLng[]>([]);

  const getPoints = async () => {
    const res = await getPointsService();
    const points = res.map((point) => new google.maps.LatLng(point[0], point[1]));
    setPoints(points);
  };

  useEffect(() => {
    getPoints();
  }, []);

  return (
    <Map defaultCenter={defaultCenter}>
      <HeatMapLayer points={points ?? []} />
    </Map>
  );
}
