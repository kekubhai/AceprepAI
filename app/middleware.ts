import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Add your middleware logic here
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
