import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // Protect the route (redirects to sign-in if not authenticated)
    await auth.protect();

    // Role-based auth limitation:
    // Note: To make this strict, configure your Clerk Session Token 
    // to include `metadata` and assign the `admin` role in public metadata.
    // For now, we enforce that ONLY an authenticated user with the 'admin' role can proceed.
    // If you get locked out because you haven't set up the role yet, comment this check out!
    const authObj = await auth();
    const role = (authObj.sessionClaims?.metadata as any)?.role;
    if (role !== 'admin') {
       return NextResponse.redirect(new URL('/', req.url))
    }
  }
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}