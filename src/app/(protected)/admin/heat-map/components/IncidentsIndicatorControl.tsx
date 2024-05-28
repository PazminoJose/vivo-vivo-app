import { createRadialGradientBackground } from "@/lib/utils";
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
        <Card className="mr-1 flex flex-col gap-3 ">
          {heatMapData.map((value) => (
            <div key={value.incidentTypeID} className="container flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-full"
                style={{
                  background: createRadialGradientBackground(value.gradient)
                }}
              ></div>
              <h2 className="max-w-36 font-semibold">{value.incidentTypeName}</h2>

              <span className="text-sm">
                {value.points.length} {value.points.length > 1 ? "incidentes" : "incidente"}
              </span>
            </div>
          ))}
        </Card>
      )}
    </MapControl>
  );
}
