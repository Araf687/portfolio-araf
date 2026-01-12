import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// ✅ Export default middleware function
export const proxy = withAuth({
  // Callback to check if user is logged in
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/login", // redirect here if not logged in
  },
});

// ✅ Protect only /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
