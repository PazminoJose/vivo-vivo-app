"use client";
import { Map as GoogleMap, MapProps, useApiIsLoaded } from "@vis.gl/react-google-maps";

interface GoogleMapProps extends MapProps {
  children?: React.ReactNode;
}

export default function Map({ children, mapId, ...props }: GoogleMapProps) {
  const isApiLoaded = useApiIsLoaded();
  return isApiLoaded ? (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom ?? 8}
      style={{ borderRadius: "0.5rem" }}
      mapId={mapId ?? "google-map"}
      id={mapId ?? "google-map"}
      {...props}
    >
      {children}
    </GoogleMap>
  ) : (
    <div>Cargando...</div>
  );
}
