import { Suspense } from "react";
import IncidentsMap from "./components/IncidentsMap";

export default function IncidentsPage() {
  return (
    <Suspense fallback={<div>Cargando</div>}>
      <IncidentsMap />
    </Suspense>
  );
}
