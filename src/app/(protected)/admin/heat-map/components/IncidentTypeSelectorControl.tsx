import DataMultiSelect from "@/components/DataMultiSelect";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { ControlPosition, MapControl, useMap } from "@vis.gl/react-google-maps";
import dayjs from "dayjs";
import { useRef } from "react";
import { useGetIncidentTypes } from "../../incident-types/hooks/useGetIncidentTypes.hook";
import { useHeatMapContext } from "../context/HeatMapContext";

export default function IncidentTypeSelectorControl() {
  const dateRangeRef = useRef<HTMLInputElement>(null);
  const { setIncidentTypesIds, dateRange, setDateRange } = useHeatMapContext();
  const { data: incidentsTypes } = useGetIncidentTypes();
  const map = useMap();

  const handleDateRangeChange = (value: DatesRangeValue) => {
    if (value[0] && value[1]) {
      const startDate = dayjs(value[0]).toISOString();
      const endDate = dayjs(value[1]).toISOString();
      setDateRange({ startDate, endDate });
    } else setDateRange({});
  };

  return (
    <MapControl position={ControlPosition.TOP_CENTER}>
      <div className=" flex max-h-[200px] w-[600px] gap-3 pt-3">
        <DataMultiSelect
          clearable
          searchable
          hidePickedOptions
          placeholder="Seleccione los tipos de incidentes"
          data={incidentsTypes ?? []}
          accessorLabel="incidentTypeName"
          accessorValue="incidentTypeID"
          className="flex-1"
          onChange={(value) => setIncidentTypesIds(value)}
          comboboxProps={{ zIndex: 1000000 }}
          classNames={{
            input: "max-h-[80px] max-w-80 overflow-y-auto"
          }}
        />
        <DatePickerInput
          clearable
          className="flex-[.8]"
          type="range"
          placeholder="Seleccione un rango de fechas"
          onChange={handleDateRangeChange}
        />
      </div>
    </MapControl>
  );
}
