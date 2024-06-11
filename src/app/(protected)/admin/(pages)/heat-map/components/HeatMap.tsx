"use client";
import { useMemo } from "react";
import Map from "../../../components/Map";
import { useHeatMapContext } from "../context/HeatMapContext";
import { useGetPoints } from "../services/getPoints.service";
import HeatMapLayer from "./HeatMapLayer";
import IncidentTypeSelectorControl from "./IncidentTypeSelectorControl";
import IncidentsIndicatorControl from "./IncidentsIndicatorControl";

export default function HeatMap() {
  const defaultCenter: google.maps.LatLngLiteral = useMemo(
    () => ({ lat: -1.253351, lng: -78.623011 }),
    []
  );
  // const [points, setPoints] = useState<google.maps.LatLng[]>([]);
  const { alarmStatusID, incidentTypesIds, dateRange } = useHeatMapContext();
  const { data: heatMapData } = useGetPoints({
    alarmStatusID,
    incidentTypeIDs: incidentTypesIds,
    dateRange
  });

  return (
    <Map defaultCenter={defaultCenter} streetViewControl={false}>
      <IncidentTypeSelectorControl />
      <IncidentsIndicatorControl heatMapData={heatMapData ?? []} />
      {heatMapData &&
        heatMapData.length > 0 &&
        heatMapData.map((value) => (
          <HeatMapLayer key={value.incidentTypeID} points={value.points} gradient={value.gradient} />
        ))}
    </Map>
  );
}
