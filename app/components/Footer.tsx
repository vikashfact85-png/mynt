'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#FAFBFC] border-t border-[#eaeaec] pt-16 pb-12 mt-auto font-sans">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                    
                    {/* Shopping Sections */}
                    <div className="flex gap-16 flex-wrap md:flex-nowrap">
                        <div className="min-w-[150px]">
                            <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wider mb-6">Online Shopping</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="/products?category=men" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Men</Link>
                                <Link href="/products?category=women" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Women</Link>
                                <Link href="/products?category=kids" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Kids</Link>
                                <Link href="/products?category=home" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Home & Living</Link>
                                <Link href="/products?category=beauty" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Beauty</Link>
                            </div>
                        </div>

                        <div className="min-w-[150px]">
                            <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wider mb-6">Customer Policies</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="#" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Contact Us</Link>
                                <Link href="#" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">FAQ</Link>
                                <Link href="#" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">T&C</Link>
                                <Link href="#" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Terms Of Use</Link>
                                <Link href="#" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Track Orders</Link>
                                <Link href="#" className="text-[14px] text-[#696b79] hover:text-[#282c3f] transition-colors">Shipping</Link>
                            </div>
                        </div>
                    </div>

                    {/* App & Social */}
                    <div className="flex flex-col gap-10">
                        <div>
                            <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wider mb-6">Experience Mynt App</h4>
                            <div className="flex gap-4">
                                <Link href="#" className="w-[140px] opacity-90 hover:opacity-100 transition-opacity">
                                    <img src="/assets/play-store.png" alt="Google Play" className="h-[42px] w-auto border border-[#d4d5d9] rounded-md" />
                                </Link>
                                <Link href="#" className="w-[140px] opacity-90 hover:opacity-100 transition-opacity">
                                    <img src="/assets/app-store.png" alt="App Store" className="h-[42px] w-auto border border-[#d4d5d9] rounded-md" />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wider mb-4">Keep In Touch</h4>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-[#94969f] hover:text-[#282c3f] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                </a>
                                <a href="#" className="text-[#94969f] hover:text-[#282c3f] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                                <a href="#" className="text-[#94969f] hover:text-[#282c3f] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promises Section */}
                <div className="flex flex-col md:flex-row gap-8 border-t border-[#eaeaec] pt-10 mb-10">
                    <div className="flex-1 flex gap-4 items-center">
                        <div className="w-12 h-12 flex-shrink-0 border border-[#d4d5d9] rounded-full flex items-center justify-center text-[10px] font-black text-[#282c3f]">100%</div>
                        <p className="text-[14px] text-[#282c3f]"><span className="font-bold block">100% ORIGINAL</span> guarantee for all products</p>
                    </div>
                    <div className="flex-1 flex gap-4 items-center">
                        <div className="w-12 h-12 flex-shrink-0 border border-[#d4d5d9] rounded-full flex items-center justify-center text-[10px] font-black text-[#282c3f]">14</div>
                        <p className="text-[14px] text-[#282c3f]"><span className="font-bold block">Return within 14days</span> of receiving your order</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#eaeaec] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <img src="/myntra.svg" alt="Myntra" className="h-6 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                        </Link>
                        <p className="text-[#94969f] text-[14px]">© 2026 www.mynt.com. All rights reserved.</p>
                    </div>
                    <p className="text-[#94969f] text-[14px] font-medium">A Flipkart Company</p>
                </div>

            </div>
        </footer>
    );
}
