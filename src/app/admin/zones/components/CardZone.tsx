"use client";
import { cn } from "@/lib/utils";
import { Zone } from "@/models/zone.model";
import { Button, Card, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconMapPinUp } from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import AssignPoliceTable from "./AssignPoliceTable";

interface CardZoneProps {
  zone: Zone;
  onEdit?: (zone: Zone) => void;
}

export default function CardZone({ zone, onEdit }: CardZoneProps) {
  const [opened, { open, close }] = useDisclosure();
  const map = useMap();
  const isDisabled = zone.state !== 1;

  const handleSelectZone = () => {
    handleMoveCamera();
    onEdit?.(zone);
  };

  const handleMoveCamera = () => {
    map?.moveCamera({ center: { lat: zone.center[0], lng: zone.center[1] }, zoom: 15 });
  };

  return (
    <Card
      className={cn("min-h-32 border border-primary-400 p-2", isDisabled ? "bg-primary-300" : "bg-white")}
    >
      <h2
        className={cn("text-center text-lg font-bold")}
        style={{ color: !isDisabled ? zone.zoneColor : "gray" }}
      >
        {zone.zoneName}
      </h2>
      <div className="flex flex-col gap-2">
        <Button leftSection={<IconEdit />} onClick={handleSelectZone}>
          Editar
        </Button>
        <Button disabled={isDisabled} leftSection={<IconEdit />} onClick={open}>
          Asignar Policías
        </Button>
        <Button leftSection={<IconMapPinUp />} className="w-full" onClick={handleMoveCamera}>
          Ver en el mapa
        </Button>
      </div>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title={`Asignar oficiales en la zona ${zone.zoneName}`}
      >
        <AssignPoliceTable zoneID={zone.zoneID} />
      </Modal>
    </Card>
  );
}
