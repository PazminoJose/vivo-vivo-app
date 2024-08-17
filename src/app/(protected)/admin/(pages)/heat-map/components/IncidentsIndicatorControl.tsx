import { HeatMapData } from "@/models/heat-map-data.model";
import { Card } from "@mantine/core";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";

interface IncidentsIndicatorControlProps {
  heatMapData: HeatMapData[];
}

export default function IncidentsIndicatorControl({ heatMapData }: IncidentsIndicatorControlProps) {
  return (
    <MapControl position={ControlPosition.RIGHT_TOP}>
      {heatMapData && heatMapData.length > 0 && (
        <Card className="mr-1 flex w-64 flex-col gap-3">
          <h1 className="text-sm font-semibold">Número de incidentes:</h1>
          {heatMapData.map((value) => (
            <div
              key={value.incidentTypeID}
              className="container flex w-full items-center justify-between gap-2"
            >
              {/* <div
                className="h-7 w-7 rounded-full"
                style={{
                  background: createRadialGradientBackground(value.gradient)
                }}
              ></div> */}
              <h2 className="font-semibold">{value.incidentTypeName}:</h2>
              <span className="text-sm">{value.points.length}</span>
            </div>
          ))}
        </Card>
      )}
    </MapControl>
  );
}
