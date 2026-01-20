'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerSections = [
    {
        title: 'Online Shopping',
        links: ['Men', 'Women', 'Home & Living'],
    },
    {
        title: 'Customer Policies',
        links: ['Contact Us', 'FAQ', 'T&C', 'Terms Of Use', 'Track Orders', 'Shipping', 'Cancellation', 'Returns', 'Privacy Policy', 'Grievance Officer'],
    },
    {
        title: 'Experience Mynt App On Mobile',
        isApp: true,
    },
    {
        title: 'Keep In Touch',
        isSocial: true,
    },
];

const popularSearches = [
    'Makeup', 'Dresses For Girls', 'T-Shirts', 'Sandals', 'Headphones', 'Babydolls', 'Blazers For Men', 'Handbags', 'Ladies Watches', 'Bags', 'Sport Shoes', 'Reebok Shoes', 'Puma Shoes', 'Boxers', 'Wallets', 'Tops', 'Earrings', 'Fastrack Watches', 'Kurtis', 'Nike', 'Smart Watches', 'Titan Watches', 'Designer Blouse', 'Gowns', 'Rings', 'Cricket Shoes', 'Forever 21', 'Eye Makeup', 'Photo Frames', 'Punjabi Suits', 'Bikini', 'Myntra Fashion Show', 'Lipstick', 'Saree', 'Watches', 'Dresses', 'Lehenga', 'Nike Shoes', 'Goggles', 'Bras', 'Suit', 'Chinos', 'Shoes', 'Adidas Shoes', 'Woodland Shoes', 'Jewellery', 'Designers', 'Kurta Men', 'Kidswear', 'Sarees', 'Scarf',
];

const socialLinks = [
    { name: 'Facebook', icon: '/assets/fb.png', fallback: 'F' }, // Using fallback text for now if icon missing, or refined SVG
    { name: 'Twitter', icon: '/assets/tw.png', fallback: 'T' },
    { name: 'Instagram', icon: '/assets/ig.png', fallback: 'I' },
    { name: 'Youtube', icon: '/assets/yt.png', fallback: 'Y' },
];

export default function Footer() {
    return (
        <footer className="bg-[#FAFBFC] border-t border-[#eaeaec] pt-24 pb-12 mt-auto">
            <div className="container max-w-[1280px] mx-auto px-4 md:px-0">
                {/* Top Section: Links & App */}
                {/* Top Section: Links & App */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12 border-b border-[#eaeaec] pb-12">
                    {/* Columns 1 & 2: Shopping & Policies */}
                    <div className="md:col-span-1">
                        <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wide mb-6">
                            {footerSections[0].title}
                        </h4>
                        <div className="flex flex-col gap-1">
                            {footerSections[0].links?.map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    className="text-[14px] text-[#696b79] hover:text-[#282c3f] hover:underline transition-colors no-underline"
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wide mb-6">
                            {footerSections[1].title}
                        </h4>
                        <div className="flex flex-col gap-1">
                            {footerSections[1].links?.map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    className="text-[14px] text-[#696b79] hover:text-[#282c3f] hover:underline transition-colors no-underline"
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: App Links (Separated) */}
                    <div className="md:col-span-2">
                        <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wide mb-6">
                            Experience Mynt App On Mobile
                        </h4>
                        <div className="flex gap-4">
                            <Link href="#" className="w-[140px] opacity-90 hover:opacity-100 transition-opacity">
                                <Image
                                    src="/assets/play-store.png"
                                    alt="Get it on Google Play"
                                    width={140}
                                    height={42}
                                    className="h-[42px] w-auto"
                                />
                            </Link>
                            <Link href="#" className="w-[140px] opacity-90 hover:opacity-100 transition-opacity">
                                <Image
                                    src="/assets/app-store.png"
                                    alt="Download on App Store"
                                    width={140}
                                    height={42}
                                    className="h-[42px] w-auto"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Column 4: Social Links */}
                    <div className="md:col-span-2">
                        <h4 className="text-[12px] font-bold text-[#282c3f] uppercase tracking-wide mb-6">
                            Keep in touch
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map(s => (
                                <Link key={s.name} href="#" className="text-[#696b79] hover:text-[#282c3f] transition-colors">
                                    <div className="w-6 h-6 flex items-center justify-center transform hover:scale-110 duration-200">
                                        {s.name === 'Facebook' && <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.13 22 17 22 12z" /></svg>}
                                        {s.name === 'Twitter' && <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 1.92 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>}
                                        {s.name === 'Instagram' && <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>}
                                        {s.name === 'Youtube' && <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" /></svg>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Promises Section - NOW SPACES OUT PROPERLY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-[#eaeaec] pb-8">
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-12 h-12 border rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Image src="/assets/original.png" alt="" width={24} height={24} className="object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <span className="text-[10px] font-bold text-[#282c3f]">100%</span>
                        </div>
                        <div>
                            <p className="text-[#282c3f] font-bold text-[14px]">100% ORIGINAL guarantee</p>
                            <p className="text-[#696b79] text-[13px]">for all products at mynt.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-12 h-12 border rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <span className="text-[10px] font-bold text-[#282c3f]">14</span>
                        </div>
                        <div>
                            <p className="text-[#282c3f] font-bold text-[14px]">Return within 14days</p>
                            <p className="text-[#696b79] text-[13px]">of receiving your order</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-12 h-12 border rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            {/* Truck Icon for delivery */}
                            <svg className="w-6 h-6 text-[#282c3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div>
                            <p className="text-[#282c3f] font-bold text-[14px]">Get free delivery</p>
                            <p className="text-[#696b79] text-[13px]">for every order above Rs. 799</p>
                        </div>
                    </div>
                </div>

                {/* Popular Searches */}
                <div className="border-t border-[#eaeaec] pt-6 pb-8">
                    <h5 className="flex items-center gap-2 text-[12px] font-bold text-[#282c3f] uppercase tracking-wide mb-4">
                        <span>Popular Searches</span>
                        <span className="flex-1 h-[1px] bg-[#eaeaec]"></span>
                    </h5>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#696b79] text-[14px]">
                        {popularSearches.map((term, i) => (
                            <span key={i}>
                                <Link href="#" className="hover:text-[#282c3f] hover:underline transition-colors">{term}</Link>
                                {i < popularSearches.length - 1 && <span className="text-[#eaeaec] mx-1">|</span>}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#eaeaec] pt-8">
                    <div>
                        <p className="text-[#282c3f] font-bold text-[14px] mb-2">Myntra</p>
                        <p className="text-[#696b79] text-[14px]">
                            © 2026 www.mynt.com. All rights reserved.
                        </p>
                    </div>
                    <div className="text-[#696b79] text-[14px]">
                        <p className="mb-2"><span className="font-bold text-[#282c3f]">Registered Office Address:</span></p>
                        <p>Buildings Alyssa, Begonia and Clover situated in Embassy Tech Village,</p>
                        <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                        <p>Varthur Hobli, Bengaluru - 560103, India</p>
                        <p className="mt-2">CIN: U72300KA2007PTC041799</p>
                        <p>Telephone: <span className="text-[#282c3f] font-bold">+91-80-61561999</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
