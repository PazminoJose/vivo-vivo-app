import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { defaultRoutes } from "./app/(protected)/admin/components/NavLinks/paths";
import { ADMIN_ROLES, APP_ROLES, USER_ROLES } from "./constants/roles";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const session = req.nextauth.token;
    const hasAdminRole =
      session && session.user.roles.some((role) => ADMIN_ROLES.includes(role.roleName));
    if (hasAdminRole && req.nextUrl.pathname === "/login") {
      const fistRole = session.user.roles[0];
      const defaultRoute = defaultRoutes[fistRole.roleName as APP_ROLES];
      return NextResponse.redirect(new URL(defaultRoute, req.url));
    }
    const hasUserRole = session && session.user.roles.some((role) => USER_ROLES.includes(role.roleName));
    if (hasUserRole && req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/user/incidents", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === "/login") return true;
        if (!token) return false;
        if (
          req.nextUrl.pathname.startsWith("/admin") &&
          token.user.roles.some((role) => ADMIN_ROLES.includes(role.roleName))
        )
          return true;
        if (
          req.nextUrl.pathname.startsWith("/user") &&
          token.user.roles.some((role) => USER_ROLES.includes(role.roleName))
        )
          return true;
        return false;
      }
    }
  }
);

export const config = {
  matcher: ["/login", "/admin/:path*", "/user/:path*"]
};
