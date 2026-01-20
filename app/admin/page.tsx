'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Package, ShoppingBag, CreditCard, Clock } from 'lucide-react';

interface AdminStats {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [stats] = useState<AdminStats>({
        totalProducts: 12,
        totalOrders: 45,
        totalRevenue: 125680,
        pendingOrders: 8,
    });

    useEffect(() => {
        const adminToken = localStorage.getItem('mynt_admin_token');
        if (!adminToken) {
            router.push('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) return null;

    return (
        <div className="p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/" target="_blank" className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                        View Store
                    </Link>
                    <button className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                        Download Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    trend="+12%"
                    color="blue"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    trend="+8%"
                    color="purple"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={CreditCard}
                    trend="+18%"
                    color="emerald"
                />
                <StatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={Clock}
                    trend="Action needed"
                    color="amber"
                    trendColor="amber"
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 text-lg">Recent Orders</h3>
                        <Link href="/admin/orders" className="text-sm font-semibold text-[#ff3f6c] hover:bg-pink-50 px-3 py-1 rounded-full transition-colors">
                            View All Orders
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {[
                            { id: 'MYN001', name: 'Rahul Sharma', amount: 2499, status: 'Delivered', date: '2 mins ago' },
                            { id: 'MYN002', name: 'Priya Patel', amount: 4599, status: 'Shipped', date: '1 hour ago' },
                            { id: 'MYN003', name: 'Amit Kumar', amount: 1299, status: 'Pending', date: '3 hours ago' },
                            { id: 'MYN004', name: 'Sneha Gupta', amount: 3799, status: 'Confirmed', date: '5 hours ago' },
                            { id: 'MYN005', name: 'Vikram Singh', amount: 899, status: 'Processing', date: '1 day ago' },
                        ].map(order => (
                            <div key={order.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                                        {order.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{order.name}</p>
                                        <p className="text-xs text-slate-400 font-medium">#{order.id} • {order.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">₹{order.amount.toLocaleString()}</p>
                                    <span className={`inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#ff3f6c] to-[#ff7b54] rounded-3xl p-8 text-white shadow-xl shadow-pink-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Add New Product</h3>
                            <p className="text-white/80 mb-6">Expand your inventory with the latest collections.</p>
                            <Link href="/admin/products" className="inline-flex items-center gap-2 bg-white text-[#ff3f6c] px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                                <Package size={18} />
                                Add Product
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Store Performance</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Sales Goal</span>
                                    <span className="font-bold text-slate-800">75%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Traffic</span>
                                    <span className="font-bold text-slate-800">45%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Component for Stats
function StatCard({ title, value, icon: Icon, trend, color, trendColor }: any) {
    const colorClasses: any = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    const trendColors: any = {
        emerald: 'text-emerald-600 bg-emerald-50',
        amber: 'text-amber-600 bg-amber-50',
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3.5 rounded-2xl ${colorClasses[color]}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${trendColors[trendColor || 'emerald']}`}>
                    {trend}
                </span>
            </div>
            <div>
                <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
                <p className="text-sm font-medium text-slate-400 mt-1">{title}</p>
            </div>
        </div>
    );
}

