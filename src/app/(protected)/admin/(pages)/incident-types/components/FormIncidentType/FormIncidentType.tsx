import DataSelect from "@/components/DataSelect";
import { STATE_DATA } from "@/constants/state-data";
import { Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { usePostIncidentType, usePutIncidentType } from "../../services";
import {
  IncidentTypeSchema,
  incidentTypeInitialValues,
  incidentTypeSchema
} from "./formIncidentTypeSchema";

interface FormIncidentTypeProps {
  initialValues?: IncidentTypeSchema;
}

export default function FormIncidentType({ initialValues }: FormIncidentTypeProps) {
  const form = useForm({
    initialValues: initialValues || incidentTypeInitialValues,
    validate: zodResolver(incidentTypeSchema)
  });

  const { mutate: createIncidentTypeMutation, isPending: isPendingCreate } = usePostIncidentType();
  const { mutate: editIncidentTypeMutation, isPending: isPendingEdit } = usePutIncidentType();

  const handleSubmit = (values: IncidentTypeSchema) => {
    values.incidentTypeID ? editIncidentTypeMutation(values) : createIncidentTypeMutation(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-3">
      <TextInput
        label="Nombre"
        placeholder="Nombre del tipo de incidente"
        {...form.getInputProps("incidentTypeName")}
      />
      <TextInput
        label="Descripción"
        placeholder="Descripción del tipo de incidente"
        {...form.getInputProps("incidentTypeDesc")}
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
