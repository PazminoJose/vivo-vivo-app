import { APP_ROLES } from "@/constants/roles";

export interface Role {
  roleID: number;
  roleName: APP_ROLES;
  roleDesc: string;
}
