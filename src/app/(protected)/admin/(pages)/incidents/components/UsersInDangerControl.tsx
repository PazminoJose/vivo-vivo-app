import { Card } from "@mantine/core";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import UsersInDangerHierarchyTabs from "./UsersInDangerHierarchyTabs";

export default function UsersInDangerControl() {
  return (
    <MapControl position={ControlPosition.RIGHT_TOP}>
      <Card className="border-primary-400 bg-primary-100 mr-4 flex h-[75vh] max-h-[75vh] w-[17rem] flex-col gap-1 border p-2 shadow-lg">
        <h2 className="text-center text-xl font-bold">Ciudadanos en peligro</h2>
        <div className="mt-2 block h-full overflow-y-auto rounded-b-lg px-2">
          <UsersInDangerHierarchyTabs />
        </div>
      </Card>
    </MapControl>
  );
}
