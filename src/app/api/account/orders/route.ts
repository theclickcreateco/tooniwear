import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getOrders } from '@/lib/orderStorage';

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userEmail = session.user.email;
        const allOrders = getOrders();

        // Filter orders by user email
        const userOrders = allOrders.filter((order: any) =>
            order.shippingDetails?.email === userEmail
        ).sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return NextResponse.json({ orders: userOrders });

    } catch (error) {
        console.error('Account orders API error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
