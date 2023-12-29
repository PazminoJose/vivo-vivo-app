"use client";
import { heatLayer } from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function HeatMapLayer({ points }: any) {
  const map = useMap();
  useEffect(() => {
    heatLayer(points, {}).addTo(map);
  }, [map, points]);
  return <></>;
}
