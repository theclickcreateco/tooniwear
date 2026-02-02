import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { saveUser, findUserByEmail } from '@/lib/userStorage';

export async function POST(req: Request) {
    try {
        const { fullName, email, password } = await req.json();

        if (!fullName || !email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        if (findUserByEmail(email)) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = {
            id: Date.now().toString(),
            fullName,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        saveUser(newUser);

        return NextResponse.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Register API error:', error);
        return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
    }
}
