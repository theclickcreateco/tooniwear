import { NextResponse } from 'next/server';
import { comparePassword, login } from '@/lib/auth';
import { findUserByEmail } from '@/lib/userStorage';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const user = findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Login user (sets session cookie)
        const { password: _, ...userWithoutPassword } = user;
        await login(userWithoutPassword);

        return NextResponse.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
    }
}
