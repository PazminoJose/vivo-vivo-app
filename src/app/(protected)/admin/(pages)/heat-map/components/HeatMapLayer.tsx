"use client";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface HeatMapLayerProps {
  points: Array<number[]>;
  gradient?: string[];
}

export default function HeatMapLayer({ points, gradient }: HeatMapLayerProps) {
  const map = useMap();
  const visualization = useMapsLibrary("visualization");

  useEffect(() => {
    if (!map || !visualization) return;
    const latLngPoints = points.map((point) => new google.maps.LatLng(point[0], point[1]));
    const heatMap = new visualization.HeatmapLayer({
      data: latLngPoints,
      radius: 30,
      maxIntensity: 20
    });
    heatMap.setMap(map);
    return () => {
      heatMap.setMap(null);
    };
  }, [map, points, visualization]);
  return <></>;
}
