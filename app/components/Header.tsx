'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount] = useState(0);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#f5f5f6]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-8">
                
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <img
                        src="/myntra.svg"
                        alt="Myntra"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Search Bar - Centered & Wide */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
                    <div className="w-full flex items-center bg-[#f5f5f6] rounded-md px-4 py-3 focus-within:bg-white focus-within:shadow-md focus-within:ring-1 focus-within:ring-[#d4d5d9] transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94969f" strokeWidth="2" className="mr-3">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full text-[#282c3f] placeholder:text-[#94969f]"
                        />
                    </div>
                </div>

                {/* Right Actions - Bag Only */}
                <div className="flex items-center gap-6">
                    <Link href="/bag" className="relative flex flex-col items-center gap-1 group">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#282c3f] group-hover:text-[#ff3f6c] transition-colors">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span className="text-[12px] font-bold text-[#282c3f] group-hover:text-[#ff3f6c] transition-colors uppercase tracking-tight">Bag</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff3f6c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-4 pb-4 bg-white border-b border-[#f5f5f6]">
                <div className="flex items-center bg-[#f5f5f6] rounded-md px-4 py-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94969f" strokeWidth="2" className="mr-3">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-full text-[#282c3f]"
                    />
                </div>
            </div>
        </header>
    );
}


