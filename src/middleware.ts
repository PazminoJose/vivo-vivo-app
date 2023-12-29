import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/login") return true;
      if (!token) return false;
      // const roles = token?.roles.map((rol) => rol.roleName.toUpperCase());
      // const currentPathRole = req.nextUrl.pathname.split("/")[1].toLocaleUpperCase();
      // const isRolMatch = roles?.includes(currentPathRole);
      // return isRolMatch ?? false;
      return true;
    }
  }
});

export const config = {
  matcher: ["/login", "/admin/:path*"]
};
