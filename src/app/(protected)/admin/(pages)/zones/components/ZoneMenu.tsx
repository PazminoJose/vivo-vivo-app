import { Zone } from "@/models/zone.model";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconClipboardList,
  IconDots,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconLocation,
  IconMapPinCog,
  IconMapPinOff
} from "@tabler/icons-react";
import { useMap } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { toast } from "sonner";
import { useZoneControlStore } from "../store/zoneControl.store";
import AssignWatchmanTable from "./AssingWatchmanTable/AssignWatchmanTable";

interface ZoneMenuProps {
  onSelectedOption?: () => void;
  zone: Zone;
  withMenuComponent?: boolean;
  showViewOnMap?: boolean;
}

export default function ZoneMenu({
  zone,
  onSelectedOption,
  showViewOnMap = true,
  withMenuComponent = true // If true, it will use the Menu component with button and dropdown popover
}: ZoneMenuProps) {
  const map = useMap();
  // Store
  const setSelectedZone = useZoneControlStore((state) => state.setSelectedZone);
  const setCurrentColor = useZoneControlStore((state) => state.setCurrentColor);
  const setIsEditingOrCreating = useZoneControlStore((state) => state.setIsEditingOrCreating);
  const setCanAddVigilancePoints = useZoneControlStore(
    (state) => state.setIsAddingOrEditingVigilancePoint
  );
  const isAddingOrEditingVigilancePoint = useZoneControlStore(
    (state) => state.isAddingOrEditingVigilancePoint
  );
  const showVigilancePointsInZone = useZoneControlStore((state) => state.showVigilancePointsInZone);
  const setShowVigilancePointsInZone = useZoneControlStore(
    (state) => state.setShowVigilancePointsInZone
  );

  const handleOnSelectedOption = () => {
    onSelectedOption?.();
  };

  const handleEditZone = () => {
    handleMoveCamera();
    setSelectedZone(zone);
    setCurrentColor(zone.zoneColor);
    setIsEditingOrCreating(true);
  };

  const handleAssignWatchman = () => {
    modals.open({
      size: "xl",
      children: <AssignWatchmanTable zoneID={zone.zoneID} />,
      title: `Asignar oficiales en la zona ${zone.zoneName}`
    });
  };

  const handleModifyVigilancePoints = () => {
    let currentZone: Zone | null = zone;
    let canAddPoints = true;
    let message = `Haz clic en la zona: ${zone.zoneName} para agregar puntos de vigilancia`;
    if (isAddingOrEditingVigilancePoint) {
      currentZone = null;
      canAddPoints = false;
      message = `Se canceló el modificar puntos vigilancia en la zona: ${zone.zoneName}`;
    }
    setSelectedZone(currentZone);
    setCanAddVigilancePoints(canAddPoints);
    setShowVigilancePointsInZone(zone.zoneID, canAddPoints);
    toast.message(message);
  };

  const handleViewVigilancePoints = () => {
    setShowVigilancePointsInZone(zone.zoneID, !showVigilancePointsInZone[zone.zoneID]);
    if (showVigilancePointsInZone[zone.zoneID]) setCanAddVigilancePoints(false);
  };

  const handleMoveCamera = () => {
    map?.moveCamera({ center: { lat: zone.center[0], lng: zone.center[1] }, zoom: 15 });
  };

  const menuItems = useMemo(() => {
    const items = [
      {
        icon: <IconEdit />,
        label: "Editar",
        onClick: handleEditZone
      },
      {
        icon: <IconClipboardList />,
        label: "Asignar Vigilantes",
        onClick: handleAssignWatchman
      },
      {
        icon: isAddingOrEditingVigilancePoint ? <IconMapPinOff /> : <IconMapPinCog />,
        label: isAddingOrEditingVigilancePoint ? "Cancelar" : "Modificar puntos de vigilancia",
        onClick: handleModifyVigilancePoints
      },
      {
        icon: showVigilancePointsInZone[zone.zoneID] ? <IconEyeOff /> : <IconEye />,
        label: `${showVigilancePointsInZone[zone.zoneID] ? "Ocultar" : "Mostrar"} puntos de vigilancia`,
        onClick: handleViewVigilancePoints
      }
    ];
    if (showViewOnMap) {
      items.push({
        icon: <IconLocation />,
        label: "Ver en el mapa",
        onClick: handleMoveCamera
      });
    }
    return items;
  }, [showViewOnMap, isAddingOrEditingVigilancePoint, showVigilancePointsInZone[zone.zoneID]]);

  return withMenuComponent ? (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {menuItems.map((item, index) => (
          <Menu.Item
            key={index}
            leftSection={item.icon}
            onClick={() => {
              item.onClick();
              handleOnSelectedOption();
            }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  ) : (
    <div className="flex flex-col gap-2">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          leftSection={item.icon}
          onClick={() => {
            item.onClick();
            handleOnSelectedOption();
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
