import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Allow access to all authenticated users for the app routes
    if (req.nextUrl.pathname.startsWith("/app")) {
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
        
        // Require token for app routes
        if (req.nextUrl.pathname.startsWith("/app")) {
          return !!token
        }
        
        // Allow access to other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/app/:path*", "/auth/:path*"]
}
