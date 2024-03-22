import dynamic from "next/dynamic";
import GoogleMapApiProvider from "../providers/GoogleMapApiProvider";

const DynamicHeatMap = dynamic(() => import("./components/HeatMap"), {
  ssr: false
});

export default function HeatMapPage() {
  return (
    <GoogleMapApiProvider>
      <DynamicHeatMap />
    </GoogleMapApiProvider>
  );
}
