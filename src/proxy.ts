import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";

const authenticatedRoute = withAuth({
  pages: {
    signIn: "/login",
  },
});

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return authenticatedRoute(request as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/home/:path*", "/perfil/:path*"],
};
