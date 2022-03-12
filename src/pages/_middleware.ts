import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {

  const token = req.cookies['token']

  const url = req.nextUrl.clone()

  if (!req.url.includes("/app")) {
    if (token) {
      url.pathname = '/app/dashboard'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  if (!token) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
