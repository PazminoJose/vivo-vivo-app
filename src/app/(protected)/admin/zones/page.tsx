import dynamic from "next/dynamic";
import { useMemo } from "react";
import GoogleMapApiProvider from "../providers/GoogleMapApiProvider";
import FormZoneControl from "./components/FormZoneControl";
import ZonesControl from "./components/ZonesControl";
const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false
});
export default function ZonesPage() {
  const defaultCenter: google.maps.LatLngLiteral = useMemo(() => ({ lat: -1.253351, lng: -78.623011 }), []);

  return (
    <GoogleMapApiProvider>
      <DynamicMap
        defaultCenter={defaultCenter}
        defaultZoom={13}
        zoomControl={false}
        streetViewControl={false}
      >
        <FormZoneControl />
        <ZonesControl />
      </DynamicMap>
    </GoogleMapApiProvider>
  );
}
