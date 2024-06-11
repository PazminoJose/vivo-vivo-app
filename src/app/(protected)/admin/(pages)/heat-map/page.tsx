"use client";
import dynamic from "next/dynamic";
import GoogleMapApiProvider from "../../providers/GoogleMapApiProvider";
import { HeatMapContextProvider } from "./context/HeatMapContext";

const DynamicHeatMap = dynamic(() => import("./components/HeatMap"), {
  ssr: false
});

export default function HeatMapPage() {
  return (
    <HeatMapContextProvider>
      <GoogleMapApiProvider>
        <DynamicHeatMap />
      </GoogleMapApiProvider>
    </HeatMapContextProvider>
  );
}
