import { Badge, Tabs } from "@mantine/core";
import { useEffect } from "react";
import { useGetUsersInDangerByIncidentTypeHierarchy } from "../services/getUsersInDangerByIncidentTypeHierarchy.service";
import { useIncidentsStore } from "../store/incidents.store";
import UserInDangerCard from "./UserInDangerCard";

export default function UsersInDangerHierarchyTabs() {
  const { data: usersInDanger } = useGetUsersInDangerByIncidentTypeHierarchy();
  const selectedUserInDanger = useIncidentsStore((store) => store.selectedUserInDanger);
  const removeSelectedUserInDanger = useIncidentsStore((store) => store.removeSelectedUserInDanger);

  useEffect(() => {
    const isSelectedUserInList = usersInDanger?.some((user) =>
      user.usersInDanger.some((u) => u.userID === selectedUserInDanger?.userID)
    );
    if (!isSelectedUserInList) {
      removeSelectedUserInDanger();
    }
  }, [usersInDanger?.length]);

  if (!usersInDanger || usersInDanger.length === 0) {
    return <div className="text-center font-bold">No hay reportes de incidentes</div>;
  }

  return (
    <Tabs defaultValue={usersInDanger[0].incidentTypeHierarchyName}>
      <Tabs.List>
        {usersInDanger?.map((u) => (
          <Tabs.Tab
            key={u.incidentTypeHierarchyID}
            value={u.incidentTypeHierarchyName}
            rightSection={
              <Badge color="red" size="sm" circle>
                {u.usersInDanger.length}
              </Badge>
            }
          >
            {u.incidentTypeHierarchyName}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {usersInDanger?.map((u) => (
        <Tabs.Panel key={`panel-${u.incidentTypeHierarchyID}`} value={u.incidentTypeHierarchyName}>
          {u.usersInDanger.map((user) => (
            <UserInDangerCard key={user.userID} userInDanger={user} />
          ))}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
