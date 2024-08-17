import { Card } from "@mantine/core";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import UsersInDangerHierarchyTabs from "./UsersInDangerHierarchyTabs";

export default function UsersInDangerControl() {
  return (
    <MapControl position={ControlPosition.RIGHT_TOP}>
      <Card className="mr-4 flex h-[75vh] max-h-[75vh] w-[17rem] flex-col gap-1 border border-primary-400 bg-primary-100 p-2 pr-0 shadow-lg">
        <h2 className="text-center text-xl font-bold">Ciudadanos en peligro</h2>
        <div className="mt-2 block overflow-y-scroll rounded-b-lg">
          <UsersInDangerHierarchyTabs />
        </div>
      </Card>
    </MapControl>
  );
}
