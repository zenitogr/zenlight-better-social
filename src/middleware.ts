import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          requestHeaders.append('Set-Cookie', 
            `${name}=${value}; Path=${options.path || '/'}; ${options.httpOnly ? 'HttpOnly;' : ''}`
          )
        },
        remove(name: string, options: CookieOptions) {
          requestHeaders.append('Set-Cookie', 
            `${name}=; Path=${options.path || '/'}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // If there's no session and the user is trying to access a protected route
  if (!session && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If there's a session and the user is trying to access auth pages
  if (session && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
    const redirectUrl = new URL('/', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 