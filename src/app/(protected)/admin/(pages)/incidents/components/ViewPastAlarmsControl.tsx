import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBellRinging } from "@tabler/icons-react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import PastAlarmsTable from "./PastAlamsTable/PastAlarmsTable";

export default function ViewPastAlarmsControl() {
  const [opened, { close, open }] = useDisclosure();
  return (
    <MapControl position={ControlPosition.TOP_CENTER}>
      <div className="mt-2">
        <Button leftSection={<IconBellRinging />} onClick={open}>
          Revisar alertas pasadas
        </Button>
        <Modal size="90%" opened={opened} onClose={close}>
          <PastAlarmsTable />
        </Modal>
      </div>
    </MapControl>
  );
}
