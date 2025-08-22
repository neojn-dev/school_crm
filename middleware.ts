import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Allow access to all authenticated users for the app routes
    if (req.nextUrl.pathname.startsWith("/dashboard") || 
        req.nextUrl.pathname.startsWith("/mydata") ||
        req.nextUrl.pathname.startsWith("/role1") ||
        req.nextUrl.pathname.startsWith("/role2") ||
        req.nextUrl.pathname.startsWith("/role3") ||
        req.nextUrl.pathname.startsWith("/all-roles")) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without token
        if (req.nextUrl.pathname.startsWith("/auth")) {
          return true
        }
        
        // Require token for protected routes
        if (req.nextUrl.pathname.startsWith("/dashboard") || 
            req.nextUrl.pathname.startsWith("/mydata") ||
            req.nextUrl.pathname.startsWith("/role1") ||
            req.nextUrl.pathname.startsWith("/role2") ||
            req.nextUrl.pathname.startsWith("/role3") ||
            req.nextUrl.pathname.startsWith("/all-roles")) {
          return !!token
        }
        
        // Allow access to other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/mydata/:path*", 
    "/role1/:path*",
    "/role2/:path*",
    "/role3/:path*",
    "/all-roles/:path*",
    "/auth/:path*"
  ]
}
