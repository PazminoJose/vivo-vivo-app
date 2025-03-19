import { VigilancePoint } from "@/models/zone.model";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceCctv } from "@tabler/icons-react";
import {
  AdvancedMarker,
  AdvancedMarkerProps,
  InfoWindow,
  useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import { useMemo, useState } from "react";
import { useZoneControlStore } from "../store/zoneControl.store";
import FormVigilancePoint from "./FormVigilancePoints/FormVigilancePoint";

interface VigilancePointMarkerProps extends AdvancedMarkerProps {
  vigilancePoint: VigilancePoint;
  onPositionChange?: (path: google.maps.LatLng) => void;
  onRemove?: () => void;
  onSave?: () => void;
  onEdit?: () => void;
}

export default function VigilancePointMarker({
  vigilancePoint,
  onPositionChange,
  onRemove,
  ...props
}: VigilancePointMarkerProps) {
  // State
  const [isDraggingMarker, setIsDraggingMarker] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [opened, { toggle, close }] = useDisclosure(true);
  // Store
  const isAddingOrEditingVigilancePoint = useZoneControlStore(
    (state) => state.isAddingOrEditingVigilancePoint
  );

  const headerContent = useMemo(() => {
    if (!isAddingOrEditingVigilancePoint) return vigilancePoint.vigilancePointName;
    return vigilancePoint?.vigilancePointID
      ? "Editar punto de vigilancia"
      : "Añadir punto de vigilancia";
  }, [vigilancePoint?.vigilancePointID]);

  const handleOnDragEndMarker = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) onPositionChange?.(e.latLng);
    setIsDraggingMarker(false);
  };

  return (
    <AdvancedMarker
      clickable={!isDraggingMarker}
      ref={markerRef}
      draggable={isAddingOrEditingVigilancePoint}
      {...props}
      onDragStart={() => setIsDraggingMarker(true)}
      onDragEnd={handleOnDragEndMarker}
      position={new google.maps.LatLng(vigilancePoint.latitude, vigilancePoint.longitude)}
    >
      {opened && (
        <InfoWindow
          onClose={() => close()}
          anchor={marker}
          headerContent={<span className="font-bold">{headerContent}</span>}
        >
          {isAddingOrEditingVigilancePoint && (
            <FormVigilancePoint vigilancePoint={vigilancePoint} onRemove={onRemove} />
          )}
        </InfoWindow>
      )}
      <ActionIcon
        onClick={() => {
          if (!isDraggingMarker) toggle();
        }}
        radius="xl"
      >
        <IconDeviceCctv />
      </ActionIcon>
    </AdvancedMarker>
  );
}
