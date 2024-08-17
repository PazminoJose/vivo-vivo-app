import DataSelect from "@/components/DataSelect";
import { STATE_DATA } from "@/constants/state-data";
import { Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { usePostIncidentTypeHierarchy } from "../../services/postIncidentTypeHierarchy.service";
import { usePutIncidentTypeHierarchy } from "../../services/putIncidentTypeHierarchy.service";
import {
  incidentTypeHierarchySchema,
  IncidentTypeHierarchySchema,
  incidentTypeInitialHierarchyValues
} from "./formIncidentTypeHierarchySchema";

interface FormIncidentTypeProps {
  initialValues?: IncidentTypeHierarchySchema;
}

export default function FormIncidentTypeHierarchy({ initialValues }: FormIncidentTypeProps) {
  const form = useForm({
    initialValues: initialValues || incidentTypeInitialHierarchyValues,
    validate: zodResolver(incidentTypeHierarchySchema)
  });

  const { mutate: createIncidentTypeHierarchyMutation, isPending: isPendingCreate } =
    usePostIncidentTypeHierarchy();
  const { mutate: editIncidentTypeHierarchyMutation, isPending: isPendingEdit } =
    usePutIncidentTypeHierarchy();

  const handleSubmit = (values: IncidentTypeHierarchySchema) => {
    values.incidentTypeHierarchyID
      ? editIncidentTypeHierarchyMutation(values)
      : createIncidentTypeHierarchyMutation(values);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-3">
      <TextInput
        label="Nombre"
        placeholder="Nombre del tipo de incidente"
        {...form.getInputProps("incidentTypeHierarchyName")}
      />
      <DataSelect
        label="Estado"
        accessorLabel="label"
        accessorValue="value"
        placeholder="Seleccione el estado"
        data={STATE_DATA}
        {...form.getInputProps("state")}
      />
      <Button loading={isPendingCreate || isPendingEdit} type="submit">
        Guardar
      </Button>
    </form>
  );
}
