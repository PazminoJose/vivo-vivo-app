"use client";
import { cn } from "@/lib/utils";
import { Zone } from "@/models/zone.model";
import { ActionIcon, Card, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconClipboardList, IconDots, IconEdit, IconLocation } from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import AssignPoliceTable from "./AssingPoliceTable/AssignPoliceTable";

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
      className={cn(
        "mt-4 flex flex-row justify-between gap-3 border border-primary-400 p-2",
        isDisabled ? "bg-primary-300" : "bg-white"
      )}
    >
      <h2 className={cn("text-lg font-bold")} style={{ color: !isDisabled ? zone.zoneColor : "gray" }}>
        {zone.zoneName}
      </h2>
      <Menu>
        <Menu.Target>
          <ActionIcon variant="transparent">
            <IconDots />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconEdit />} onClick={handleSelectZone}>
            Editar
          </Menu.Item>
          <Menu.Item leftSection={<IconClipboardList />} onClick={open}>
            Asignar Policías
          </Menu.Item>
          <Menu.Item leftSection={<IconLocation />} onClick={handleMoveCamera}>
            Ver en el mapa
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
