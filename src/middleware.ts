import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // Refresh the session if it exists
    const refreshedSessionResponse = await updateSession(request);

    // Protected routes logic
    const path = request.nextUrl.pathname;
    const session = request.cookies.get('session')?.value;

    // Redirect to login if accessing protected route without session
    if (path.startsWith('/account/orders') && !session) {
        return NextResponse.redirect(new URL('/account/login', request.url));
    }

    // Redirect to home if accessing login/register with active session
    if ((path.startsWith('/account/login') || path.startsWith('/account/register')) && session) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return refreshedSessionResponse || NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*', '/api/auth/me'],
};
