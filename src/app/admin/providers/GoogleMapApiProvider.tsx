"use client";
import { APIProvider } from "@vis.gl/react-google-maps";

const mapApiKey = process.env.NEXT_PUBLIC_GMAP_API_KEY ?? "";

interface GoogleMapApiProvider {
  children: React.ReactNode;
}
export default function GoogleMapApiProvider({ children }: GoogleMapApiProvider) {
  return <APIProvider apiKey={mapApiKey}>{children}</APIProvider>;
}
