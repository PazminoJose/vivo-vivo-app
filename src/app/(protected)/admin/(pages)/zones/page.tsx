import { Suspense } from "react";
import ZonesMap from "./components/ZonesMap";

export default function ZonesPage() {
  return (
    <Suspense>
      <ZonesMap />
    </Suspense>
  );
}
