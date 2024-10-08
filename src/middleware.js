import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/api/review",
    "/auth/signup",
    "/api/clerk/webhooks/user-created",
  ], // Ensure that GET /api/review is public
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/api/review/:path*"],
};
