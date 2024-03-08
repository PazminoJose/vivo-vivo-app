import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const session = req.nextauth.token;
    const hasAdminRole =
      session &&
      session.user.roles.some((role) => role.roleName === "ADMIN" || role.roleName === "SUPER_ADMIN");
    if (hasAdminRole && req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/admin/users", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === "/login") return true;
        if (!token) return false;
        const isRolMatch = token?.user.roles.some(
          (role) => role.roleName === "ADMIN" || role.roleName === "SUPER_ADMIN"
        );
        return isRolMatch ?? false;
      }
    }
  }
);

export const config = {
  matcher: ["/login", "/admin/:path*"]
};
