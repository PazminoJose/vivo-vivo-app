import { useGetUsersInDanger } from "../services/getUsersInDanger.service";
import UserInDangerMarker from "./UserInDangerMarker";

export default function UserInDangerMarkers() {
  const { data: usersInDanger } = useGetUsersInDanger();
  return usersInDanger?.map((user) => <UserInDangerMarker key={user.userID} user={user} />);
}
