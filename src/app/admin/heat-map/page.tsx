import dynamic from "next/dynamic";

const DynamicHeatMap = dynamic(() => import("./components/heat-map"), {
  ssr: false
});

export default function HeatMapPage() {
  return <DynamicHeatMap />;
}
