'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('mynt_admin_token', 'logged_in');
            router.push('/admin');
        } else {
            setError('Invalid credentials');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">

                {/* Visual Side */}
                <div className="md:w-1/2 bg-gradient-to-br from-[#ff3f6c] to-[#ff7b54] p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-12 right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 mb-8">
                            <span className="text-3xl font-black tracking-tight">MYNT</span>
                            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Admin</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Welcome Back!
                        </h1>
                        <p className="text-white/80 text-lg">
                            Manage your products, orders, and stats in one beautiful dashboard.
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                        <p className="text-gray-500">Enter your details to access the workspace</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff3f6c]/20 focus:border-[#ff3f6c] transition-all"
                                placeholder="e.g. admin"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff3f6c]/20 focus:border-[#ff3f6c] transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r text-red-600 text-sm font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-[#ff3f6c] to-[#ff527b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] hover:shadow-[#ff3f6c]/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                "Sign In to Dashboard"
                            )}
                        </button>
                    </form>

                   
                </div>
            </div>
        </div>
    );
}
