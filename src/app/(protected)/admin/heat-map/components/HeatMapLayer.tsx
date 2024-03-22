"use client";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface HeatMapLayerProps {
  points: google.maps.LatLng[];
}

export default function HeatMapLayer({ points }: HeatMapLayerProps) {
  const map = useMap();
  const visualization = useMapsLibrary("visualization");

  useEffect(() => {
    if (!map || !visualization) return;
    const heatMap = new visualization.HeatmapLayer({
      data: points,
      gradient: ["rgba(0, 255, 255, 0)", "rgba(0, 255, 255, 1)"]
    });
    heatMap.setMap(map);
  }, [map, points, visualization]);
  return <></>;
}
