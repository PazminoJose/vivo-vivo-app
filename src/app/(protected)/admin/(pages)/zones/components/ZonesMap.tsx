"use client";
import dynamic from "next/dynamic";
import GoogleMapApiProvider from "../../../providers/GoogleMapApiProvider";
import FormZoneControl from "./FormZoneControl/FormZoneControl";
import ZonesControl from "./ZonesControl";
import ZonesPolygons from "./ZonesPolygons";

const DynamicMap = dynamic(() => import("../../../components/Map"), {
  ssr: false
});

const defaultMapCenter: google.maps.LatLngLiteral = {
  lat: -1.253351,
  lng: -78.623011
};

export default function ZonesMap() {
  return (
    <GoogleMapApiProvider>
      <DynamicMap
        defaultCenter={defaultMapCenter}
        defaultZoom={13}
        zoomControl={false}
        streetViewControl={false}
      >
        <FormZoneControl />
        <ZonesControl />
        <ZonesPolygons />
      </DynamicMap>
    </GoogleMapApiProvider>
  );
}
