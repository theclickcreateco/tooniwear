import fs from 'fs';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Ensure orders file exists
if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

export function getOrders() {
    try {
        const data = fs.readFileSync(ORDERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading orders file:', error);
        return [];
    }
}

export function saveOrder(order: any) {
    try {
        const orders = getOrders();
        orders.push({
            ...order,
            createdAt: new Date().toISOString(),
            status: 'pending' // Initial status
        });
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving order:', error);
        return false;
    }
}

export function findOrderById(orderId: string) {
    const orders = getOrders();
    return orders.find((o: any) => o.orderId === orderId);
}
