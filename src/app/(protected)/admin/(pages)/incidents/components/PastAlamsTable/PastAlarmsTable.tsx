import DataTable from "@/components/DataTable/DataTable";
import { useGetPastAlarms } from "../../services/getPastAlarms.service";
import usePastAlarmsColumns from "./usePastAlarmsColumns";

export default function PastAlarmsTable() {
  const { data: pastAlarms, isLoading } = useGetPastAlarms();
  const columns = usePastAlarmsColumns();

  return (
    <DataTable
      state={{
        isLoading
      }}
      mantineTableContainerProps={{ className: "max-h-[450px]" }}
      renderTopToolbarCustomActions={() => (
        <h2 className="text-xl font-bold text-primary-900">Registro de alarmas</h2>
      )}
      data={pastAlarms ?? []}
      columns={columns}
    />
  );
}
