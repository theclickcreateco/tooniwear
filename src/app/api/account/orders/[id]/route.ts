import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { findOrderById } from '@/lib/orderStorage';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const order = findOrderById(id);

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Security check: Ensure the order belongs to the logged-in user
        if (order.shippingDetails?.email !== session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ order });

    } catch (error) {
        console.error('Order details API error:', error);
        return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 });
    }
}
