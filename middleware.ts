import { NextResponse, NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
    const session = request.cookies.get('next-auth.session-token');

    if (!session) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/issues/new",
        "/issues/edit/:id"
    ]
}