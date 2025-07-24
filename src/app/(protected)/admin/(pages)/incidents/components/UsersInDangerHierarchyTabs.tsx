import { Badge, Tabs, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import { useGetUsersInDangerByIncidentTypeHierarchy } from "../services/getUsersInDangerByIncidentTypeHierarchy.service";
import { useIncidentsStore } from "../store/incidents.store";
import UserInDangerCard from "./UserInDangerCard";

export default function UsersInDangerHierarchyTabs() {
  const selectedUserInDanger = useIncidentsStore((store) => store.selectedUserInDanger);
  const removeSelectedUserInDanger = useIncidentsStore((store) => store.removeSelectedUserInDanger);

  const { data: usersInDanger } = useGetUsersInDangerByIncidentTypeHierarchy();

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
          <Tooltip label={u.incidentTypeHierarchyName} key={u.incidentTypeHierarchyID}>
            <Tabs.Tab
              style={{ backgroundColor: u.color }}
              value={u.incidentTypeHierarchyName}
              rightSection={
                <Badge color="white" className="text-black" size="sm" circle>
                  {u.usersInDanger.length}
                </Badge>
              }
            />
          </Tooltip>
        ))}
      </Tabs.List>
      {usersInDanger?.map((u, i) => (
        <Tabs.Panel key={`panel-${u.incidentTypeHierarchyID}-${i}`} value={u.incidentTypeHierarchyName}>
          {u.usersInDanger.map((user, index) => (
            <UserInDangerCard key={`${user.userID}${index}`} userInDanger={user} />
          ))}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
