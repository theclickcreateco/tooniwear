const { saveUser, getUsers } = require('./src/lib/userStorage.ts');
const { saveOrder, getOrders } = require('./src/lib/orderStorage.ts');

try {
    console.log('Testing User Storage...');
    saveUser({ id: 'test', fullName: 'Test User', email: 'test@example.com' });
    const users = getUsers();
    console.log('Users count:', users.length);

    console.log('Testing Order Storage...');
    saveOrder({ orderId: 'test-order', total: 100 });
    const orders = getOrders();
    console.log('Orders count:', orders.length);

    console.log('Smoke test PASSED');
} catch (err) {
    console.error('Smoke test FAILED:', err);
}
