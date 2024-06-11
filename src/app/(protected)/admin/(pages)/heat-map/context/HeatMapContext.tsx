import { HeatMapData } from "@/models/heat-map-data.model";
import { DateRange } from "@/types/date-range";
import { createContext, useContext, useState } from "react";

interface HeatMapContextState {
  heatMapData: HeatMapData[];
  setHeatMapData: (data: HeatMapData[]) => void;
  dateRange?: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  incidentTypesIds?: number[];
  setIncidentTypesIds: (ids: number[]) => void;
  alarmStatusID: number;
  setAlarmStatusID: (id: number) => void;
}

const initState: HeatMapContextState = {
  heatMapData: [],
  setHeatMapData: () => {},
  setDateRange: () => {},
  setIncidentTypesIds: () => {},
  alarmStatusID: 2,
  setAlarmStatusID: () => {}
};

const HeatMapContext = createContext<HeatMapContextState>(initState);

export function HeatMapContextProvider({ children }: { children: React.ReactNode }) {
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [incidentTypesIds, setIncidentTypesIds] = useState<number[]>();
  const [alarmStatusID, setAlarmStatusID] = useState<number>(initState.alarmStatusID);

  return (
    <HeatMapContext.Provider
      value={{
        heatMapData,
        dateRange,
        setDateRange,
        setHeatMapData,
        incidentTypesIds,
        setIncidentTypesIds,
        alarmStatusID,
        setAlarmStatusID
      }}
    >
      {children}
    </HeatMapContext.Provider>
  );
}

export const useHeatMapContext = () => {
  return useContext(HeatMapContext);
};
