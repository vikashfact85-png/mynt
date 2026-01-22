'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Order {
    id: string; customer_name: string; email: string; phone: string; address: string; city: string; pincode: string;
    items: { product_id: string; product_name: string; size: string; color: string; quantity: number; price: number; }[];
    total_amount: number; status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    payment_method: 'upi' | 'bank_transfer';
    payment_status?: 'pending' | 'completed' | 'disputed';
    created_at: string;
}

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/sections', label: 'Sections' },
    { href: '/admin/settings', label: 'Settings' },
];

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700', confirmed: 'bg-purple-50 text-purple-700',
    shipped: 'bg-blue-50 text-blue-700', delivered: 'bg-emerald-50 text-emerald-700', cancelled: 'bg-red-50 text-red-700',
};

const paymentMethodStyles: Record<string, string> = {
    upi: 'bg-indigo-50 text-indigo-700',
    bank_transfer: 'bg-cyan-50 text-cyan-700',
};

const paymentStatusStyles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    completed: 'bg-emerald-50 text-emerald-700',
    disputed: 'bg-red-50 text-red-700',
};

export default function AdminOrders() {
    const pathname = usePathname();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!localStorage.getItem('mynt_admin_token')) { window.location.href = '/admin'; return; }
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders', { cache: 'no-store' });
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: Order['status']) => {
        try {
            await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="p-8 pb-24">
            <div className="mb-8"><h2 className="text-2xl font-bold text-slate-900">Orders</h2><p className="text-slate-500">Manage customer orders</p></div>

            <div className="flex gap-2 mb-6 flex-wrap">
                {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
                    <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${filter === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>{s}</button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-12">Loading orders...</div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <p className="text-slate-500">No orders found</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead><tr className="border-b border-slate-100">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Order</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Items</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Payment</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4"><p className="font-semibold">#{order.id.slice(-6)}</p><p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium">{order.customer_name.charAt(0)}</div>
                                            <div><p className="font-medium">{order.customer_name}</p><p className="text-xs text-slate-500">{order.phone}</p></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><p className="text-sm text-slate-600">{order.items.length} item(s)</p></td>
                                    <td className="px-6 py-4 font-semibold">₹{order.total_amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${paymentMethodStyles[order.payment_method] || 'bg-slate-100 text-slate-700'}`}>
                                                {order.payment_method === 'upi' ? '💳 UPI' : '🏦 Bank'}
                                            </span>
                                            {order.payment_status && (
                                                <span className={`block px-2 py-1 rounded-full text-xs font-medium capitalize ${paymentStatusStyles[order.payment_status]}`}>
                                                    {order.payment_status === 'completed' ? '✅ Paid' : order.payment_status === 'disputed' ? '⚠️ Dispute' : '⏳ Pending'}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status]}`}>{order.status}</span></td>
                                    <td className="px-6 py-4">
                                        <select value={order.status} onChange={e => updateStatus(order.id, e.target.value as Order['status'])} className="px-3 py-2 text-sm border border-slate-200 rounded-lg">
                                            <option value="pending">Pending</option><option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

