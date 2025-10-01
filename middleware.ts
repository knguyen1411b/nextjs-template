import { NextResponse } from 'next/dist/server/web/spec-extension/response'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images (public images folder and subdirectories)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)'
  ]
}

/**
 * Middleware function to handle requests
 * @returns NextResponse
 */
export function middleware() {
  return NextResponse.next()
}
