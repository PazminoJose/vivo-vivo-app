"use client";
import { createRandomHeatmapGradient } from "@/lib/utils/createRandomGradient.util";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo } from "react";

interface HeatMapLayerProps {
  points: Array<number[]>;
  gradient: string[];
}

export default function HeatMapLayer({ points, gradient }: HeatMapLayerProps) {
  const map = useMap();
  const visualization = useMapsLibrary("visualization");
  const randomGradient = useMemo(() => {
    return createRandomHeatmapGradient();
  }, []);

  useEffect(() => {
    if (!map || !visualization) return;
    const latLngPoints = points.map((point) => new google.maps.LatLng(point[0], point[1]));
    const heatMap = new visualization.HeatmapLayer({
      data: latLngPoints,
      gradient,
      radius: 10
    });
    heatMap.setMap(map);
    return () => {
      heatMap.setMap(null);
    };
  }, [map, points, visualization, gradient]);
  return <></>;
}
