import "next-auth";

export type Roles = {
  _id: string;
  rolName: AppRoles;
};

declare module "next-auth" {
  interface Session {
    user: {
      idUser: string;
      idPerson: string;
      names: string;
      email: string;
      phone: string;
      avatar: string;
      roles: Roles[];
    };
    token: string;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      idUser: string;
      idPerson: string;
      names: string;
      email: string;
      phone: string;
      avatar: string;
      roles: Roles[];
    };
    token: string;
  }
}
