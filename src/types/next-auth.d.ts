import { APP_ROLES } from "@/constants/roles";
import "next-auth";

type SessionRole = {
  roleID: number;
  roleName: APP_ROLES;
};

declare module "next-auth" {
  interface Session {
    user: {
      userID: number;
      personID: number;
      names: string;
      email: string;
      phone: string;
      avatar: string;
      roles: SessionRole[];
    };
    token: string;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      userID: number;
      personID: number;
      names: string;
      email: string;
      phone: string;
      avatar: string;
      roles: SessionRole[];
    };
    token: string;
  }
}
