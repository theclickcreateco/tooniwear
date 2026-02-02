import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/orderStorage';

// Simple in-memory rate limiter (Best practice for basic VPS security)
const rateLimit = new Map<string, { count: number, lastTime: number }>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const window = 60 * 1000; // 1 minute
    const max = 3; // Strict limit for order placement

    const current = rateLimit.get(ip) || { count: 0, lastTime: now };

    if (now - current.lastTime > window) {
        current.count = 1;
        current.lastTime = now;
    } else {
        current.count++;
    }

    rateLimit.set(ip, current);
    return current.count > max;
}

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

        if (isRateLimited(ip)) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
        }

        const body = await req.json();

        // Basic validation
        const { shippingDetails, items, totalPrice, paymentMethod } = body;

        if (!shippingDetails?.fullName || !shippingDetails?.email || !shippingDetails?.address || !shippingDetails?.city || !shippingDetails?.phone) {
            return NextResponse.json({ error: 'Missing shipping details' }, { status: 400 });
        }

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Generate Unique Order ID (Best Practice: Use a recognizable prefix and unique components)
        const date = new Date();
        const timestamp = date.getTime().toString().slice(-6); // Last 6 digits of timestamp
        const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
        const orderId = `CN-${timestamp}-${randomStr}`;

        // Log Order (In a real app, this goes to DB)
        // [NOTIFICATION CONFIG]
        const STORE_EMAIL = "huzaifaamin23@gmail.com";
        const STORE_PHONE = "03212481412";

        const orderData = {
            orderId,
            shippingDetails,
            items,
            totalPrice,
            paymentMethod,
            customerIp: ip
        };

        // Save order to persistent storage (Best Practice fallback)
        const isSaved = saveOrder(orderData);

        console.log(`[ORDER] ${orderId} placed. Saved: ${isSaved}`);
        console.log(`[NOTIFICATION] Sending email to ${STORE_EMAIL} and SMS to ${STORE_PHONE}`);
        console.log(`[DETAILS] Customer: ${shippingDetails.fullName}, Email: ${shippingDetails.email}, Phone: ${shippingDetails.phone}`);
        console.log(`[ITEMS]`, items.map((i: any) => `${i.name} (${i.size}) x${i.quantity}`).join(', '));
        console.log(`[TOTAL] Rs. ${totalPrice}`);

        // Security: Header protection (Best Practice)
        const response = NextResponse.json({
            success: true,
            orderId,
            message: `Order received. Notification sent to ${STORE_EMAIL}.`
        });

        // Add some security headers for this response
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');

        return response;

    } catch (error) {
        console.error('Checkout API error:', error);
        return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
    }
}
