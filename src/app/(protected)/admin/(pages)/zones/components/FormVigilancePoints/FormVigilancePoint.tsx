import { ActionIcon, TextInput, Tooltip } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { usePatchToggleStatusVigilancePoint } from "../../services/patchToggleStatusVigilancePoint.service";
import { usePatchVigilancePoint } from "../../services/patchVigilancePoint.service";
import { usePostVigilancePoint } from "../../services/postVigilancePoint.service";
import { VigilancePointSchema, vigilancePointSchema } from "./vigilancePointSchema";

interface FormVigilancePointProps {
  vigilancePoint: VigilancePointSchema;
  onRemove?: () => void;
}

export default function FormVigilancePoint({ vigilancePoint, onRemove }: FormVigilancePointProps) {
  const form = useForm({
    initialValues: vigilancePoint,
    validate: zodResolver(vigilancePointSchema)
  });

  const { mutate: createVigilancePointMutation, isPending: isPendingCreate } = usePostVigilancePoint();
  const { mutate: editVigilancePointMutation, isPending: isPendingUpdate } = usePatchVigilancePoint();
  const { mutate: toggleStatusMutation } = usePatchToggleStatusVigilancePoint();

  const handleRemoveVigilancePoint = () => {
    if (vigilancePoint.vigilancePointID) {
      return toggleStatusMutation(vigilancePoint.vigilancePointID);
    }
    return onRemove?.();
  };

  const onSubmit = (schema: VigilancePointSchema) => {
    if (schema.vigilancePointID) {
      return editVigilancePointMutation(schema);
    }
    return createVigilancePointMutation(schema);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="flex items-center gap-2">
      <TextInput placeholder="Nombre" {...form.getInputProps("vigilancePointName")} />
      <ActionIcon color="red" onClick={handleRemoveVigilancePoint}>
        <Tooltip label="Eliminar">
          <IconTrash />
        </Tooltip>
      </ActionIcon>
      <ActionIcon loading={isPendingCreate || isPendingUpdate} variant="primary" type="submit">
        <Tooltip label="Guardar">
          <IconDeviceFloppy />
        </Tooltip>
      </ActionIcon>
    </form>
  );
}
