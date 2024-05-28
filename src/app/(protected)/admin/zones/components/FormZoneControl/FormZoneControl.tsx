"use client";
import { ColorInput } from "@/components/ColorInput/ColorInput";
import { cn } from "@/lib/utils";
import { ActionIcon, Button, Radio, TextInput, Tooltip } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDebouncedState } from "@mantine/hooks";
import { IconBan, IconDeviceFloppy, IconMapPlus, IconPolygon } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDrawingManager } from "../../hooks/useDrawingManager";
import { postZoneService } from "../../services/postZone.service";
import { putZoneService } from "../../services/putZones.service";
import { useZoneControlStore } from "../../store/zoneControl.store";
import { ZoneSchema, zoneInitialValues, zoneSchema } from "./formZoneControlSchema";

export default function FormZoneControl() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [debouncedColor, setDebouncedColor] = useDebouncedState(zoneInitialValues.zoneColor, 200);
  // Store
  const selectedZone = useZoneControlStore((state) => state.selectedZone);
  const setSelectedZone = useZoneControlStore((state) => state.setSelectedZone);
  const isEditingOrCreating = useZoneControlStore((state) => state.isEditingOrCreating);
  const setIsEditingOrCreating = useZoneControlStore((state) => state.setIsEditingOrCreating);
  const setCurrentColor = useZoneControlStore((state) => state.setCurrentColor);
  const currentColor = useZoneControlStore((state) => state.currentColor);
  // Query
  const queryClient = useQueryClient();

  // Manage drawing manager and selected shape
  const { drawingManager, selectedShape, clearSelectedShape } = useDrawingManager({
    drawingControl: false,
    polygonOptions: {
      editable: true,
      draggable: true,
      fillColor: debouncedColor,
      strokeColor: debouncedColor
    },
    events: {
      onPathChange: (e) => handleUpdatePolygonPoints(e)
    }
  });

  // Configure form
  const form = useForm({
    initialValues: zoneInitialValues,
    validate: zodResolver(zoneSchema)
  });

  const handleUpdatePolygonPoints = (points: google.maps.LatLng[]) => {
    const polygon = points.map((p) => [p.lat(), p.lng()]);
    form.setValues({ polygon });
  };

  // Handlers
  const handleChangeColor = (color: string) => {
    selectedShape?.setOptions({ fillColor: color, strokeColor: color });
    setDebouncedColor(color);
  };

  const handleDrawing = () => {
    setIsDrawing(true);
    setSelectedZone(null);
    drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  };

  const handleCancel = () => {
    setIsDrawing(false);
    setIsEditingOrCreating(false);
    clearSelectedShape();
    setSelectedZone(null);
    setDebouncedColor(zoneInitialValues.zoneColor);
    form.reset();
  };

  const handleSubmitSuccess = () => {
    clearSelectedShape();
    setIsDrawing(false);
    setIsEditingOrCreating(false);
    setSelectedZone(null);
    setCurrentColor(null);
    setDebouncedColor(zoneInitialValues.zoneColor);
    form.reset();
  };

  const handleSubmit = async (values: ZoneSchema) => {
    if (selectedZone?.zoneID) updateZoneMutation(values);
    else createZoneMutation(values);
  };

  // Mutation
  const { isPending: isPendingCreate, mutate: createZoneMutation } = useMutation({
    mutationFn: postZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      handleSubmitSuccess();
      toast.success("Zona creada correctamente");
    }
  });

  const { isPending: isPendingUpdate, mutate: updateZoneMutation } = useMutation({
    mutationFn: putZoneService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      handleSubmitSuccess();
      toast.success("Zona editada correctamente");
    }
  });

  // Effects
  // Update form values when selected zone changes
  useEffect(() => {
    if (selectedZone) {
      form.setValues(selectedZone);
    }
  }, [selectedZone]);
  // Update current color when debounced color changes
  useEffect(() => {
    setCurrentColor(debouncedColor);
  }, [debouncedColor]);

  return (
    <MapControl position={ControlPosition.TOP_CENTER}>
      <div className={cn("flex w-[600px] items-center justify-center rounded-lg p-1")}>
        {isEditingOrCreating ? (
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex items-center justify-center gap-2 rounded-lg border border-primary-400 bg-primary-100 p-2 shadow-lg"
          >
            {selectedZone === null && (
              <ActionIcon
                disabled={isDrawing || isPendingCreate || isPendingUpdate}
                variant="primary"
                onClick={handleDrawing}
              >
                <Tooltip label="Crear">
                  <IconPolygon />
                </Tooltip>
              </ActionIcon>
            )}
            <TextInput placeholder="Nombre" {...form.getInputProps("zoneName")} />
            {selectedZone !== null && (
              <Radio.Group
                {...form.getInputProps("state")}
                onChange={(value) => {
                  form.getInputProps("state").onChange(parseInt(value));
                }}
              >
                <div className="flex gap-3">
                  <Radio value={1} label="Activo" />
                  <Radio value={0} label="Inactivo" />
                </div>
              </Radio.Group>
            )}
            <Tooltip label="Color">
              <ColorInput
                value={currentColor == null ? form.getInputProps("zoneColor").value : currentColor}
                onChange={(e) => {
                  handleChangeColor(e.currentTarget.value);
                  form.getInputProps("zoneColor").onChange(e);
                }}
              />
            </Tooltip>
            <ActionIcon variant="primary" onClick={handleCancel}>
              <Tooltip label="Cancelar">
                <IconBan />
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              disabled={selectedZone === null ? selectedShape === null : false}
              loading={isPendingCreate || isPendingUpdate}
              variant="primary"
              type="submit"
            >
              <Tooltip label="Guardar">
                <IconDeviceFloppy />
              </Tooltip>
            </ActionIcon>
          </form>
        ) : (
          <Button
            className="mt-1"
            leftSection={<IconMapPlus />}
            onClick={() => setIsEditingOrCreating(true)}
          >
            Agregar Zona
          </Button>
        )}
      </div>
    </MapControl>
  );
}
