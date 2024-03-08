import API from "@/lib/axios/api";
import { User } from "@/models/user.model";

interface PutRegisterServiceProps {
  userID: number;
  personID: number;
  data: FormData;
}

export async function putRegisterService({ userID, personID, data }: PutRegisterServiceProps) {
  const url = `/auth/register/${userID}/${personID}`;
  const res = await API.put<User>({ url, data });
  return res;
}
