'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/types';

const navItems = [
    { id: 'men', label: 'Men', href: '/men' },
    { id: 'women', label: 'Women', href: '/women' },
    { id: 'home', label: 'Home & Living', href: '/home' },
];

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount] = useState(0);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-menu">
            {/* Top Bar */}
            <div className="border-b border-transparent">
                <div className="container flex items-center justify-between gap-8 h-[var(--header-height)]">
                    {/* Logo - Fixed & Premium */}
                    <Link href="/" className="flex items-center select-none min-w-max">
                        <img
                            src="/myntra.svg"
                            alt="Myntra"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Navigation - Centered & Spaced */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="group relative h-[var(--header-height)] flex items-center text-xs font-bold uppercase tracking-wide text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {item.label}
                                {/* Active Indicator line */}
                                <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6 md:gap-8 ml-auto">

                        {/* Search Bar - Sleek & Modern */}
                        <div className="hidden md:flex items-center bg-[var(--bg-secondary)] rounded-md px-4 py-2.5 w-[300px] xl:w-[400px] transition-all focus-within:bg-white focus-within:shadow-md focus-within:ring-1 focus-within:ring-[var(--border-medium)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" className="mr-3">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                            />
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-6">
                            {/* Profile Removed as per request */}
                            {/* <Link href="/profile" className="flex flex-col items-center gap-1 group">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className="text-[12px] font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">Profile</span>
                            </Link> */}

                            <Link href="/wishlist" className="flex flex-col items-center gap-1 group">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <span className="text-[12px] font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">Wishlist</span>
                            </Link>

                            <Link href="/bag" className="relative flex flex-col items-center gap-1 group">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span className="text-[12px] font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">Bag</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search (Below Header) */}
            <div className="md:hidden p-3 bg-white border-b border-[var(--border-light)]">
                <div className="flex items-center bg-[var(--bg-secondary)] rounded-md px-4 py-2">
                    <svg width="18" height="18" viewBox="0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" className="mr-3">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)]"
                    />
                </div>
            </div>
        </header>
    );
}

