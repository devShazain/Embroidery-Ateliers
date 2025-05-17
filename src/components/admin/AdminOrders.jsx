import React, { useState, useEffect } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../utils/api';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await fetchAllOrders();
            setOrders(data);
            setError(null);
        } catch (err) {
            setError('Failed to load orders. Please try again.');
            console.error('Error loading orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);

            // Update the local state
            setOrders(orders.map(order =>
                order.id === orderId
                    ? { ...order, status: newStatus }
                    : order
            ));
        } catch (err) {
            console.error('Error updating order status:', err);
            alert('Failed to update order status. Please try again.');
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="text-center py-10">Loading orders...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Manage Orders</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border text-left">Order ID</th>
                            <th className="py-2 px-4 border text-left">Customer</th>
                            <th className="py-2 px-4 border text-left">Date</th>
                            <th className="py-2 px-4 border text-left">Total</th>
                            <th className="py-2 px-4 border text-left">Status</th>
                            <th className="py-2 px-4 border text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">#{order.id}</td>
                                <td className="py-2 px-4 border">
                                    <div>{order.full_name}</div>
                                    <div className="text-sm text-gray-500">{order.email}</div>
                                </td>
                                <td className="py-2 px-4 border">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border">
                                    Rs. {order.total_amount.toLocaleString()}
                                </td>
                                <td className="py-2 px-4 border">
                                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeClass(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="p-1 border rounded"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;