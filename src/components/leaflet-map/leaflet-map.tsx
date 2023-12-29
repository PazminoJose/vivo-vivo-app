"use client";
import "leaflet/dist/leaflet.css";
import { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { mapConfig } from "./map-config";

export default function LeafletMap({ children }: { children?: ReactNode }) {
  return (
    <MapContainer {...mapConfig.container}>
      <TileLayer {...mapConfig.tile} />
      {children}
    </MapContainer>
  );
}
