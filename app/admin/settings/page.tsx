'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BankDetails, DEFAULT_BANK_DETAILS } from '@/lib/types';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/sections', label: 'Sections' },
    { href: '/admin/settings', label: 'Settings' },
];

export default function AdminSettings() {
    const pathname = usePathname();
    const [bankDetails, setBankDetails] = useState<BankDetails>(DEFAULT_BANK_DETAILS);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('mynt_admin_token')) { window.location.href = '/admin'; return; }
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setBankDetails(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bankDetails),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    return (
        <div className="p-8 pb-24">
            <div className="mb-8"><h2 className="text-2xl font-bold text-slate-900">Settings</h2><p className="text-slate-500">Configure store settings</p></div>

            <div className="max-w-2xl space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Payment Details</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        {/* UPI QR Code URL */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">UPI QR Code Image URL</label>
                            <div className="space-y-3">
                                <input
                                    type="url"
                                    value={bankDetails.upi_qr_code_url}
                                    onChange={e => setBankDetails({ ...bankDetails, upi_qr_code_url: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="https://example.com/qr-code.png"
                                />
                                <p className="text-xs text-slate-500">Enter the URL of your UPI QR code image (e.g., from Cloudinary, Imgur, or any image hosting service)</p>

                                {bankDetails.upi_qr_code_url && (
                                    <div className="mt-3">
                                        <p className="text-sm font-medium text-slate-700 mb-2">Preview:</p>
                                        <div className="relative w-48 h-48 border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                                            <img
                                                src={bankDetails.upi_qr_code_url}
                                                alt="UPI QR Code Preview"
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f1f5f9" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-family="sans-serif" font-size="14"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div><label className="block text-sm font-medium text-slate-700 mb-2">UPI ID</label>
                            <input type="text" value={bankDetails.upi_id} onChange={e => setBankDetails({ ...bankDetails, upi_id: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="yourname@upi" /></div>

                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="font-medium text-slate-900 mb-3">Bank Transfer Details</h4>
                        </div>

                        <div><label className="block text-sm font-medium text-slate-700 mb-2">Bank Name</label>
                            <input type="text" value={bankDetails.bank_name} onChange={e => setBankDetails({ ...bankDetails, bank_name: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 mb-2">Account Holder</label>
                            <input type="text" value={bankDetails.account_holder} onChange={e => setBankDetails({ ...bankDetails, account_holder: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-slate-700 mb-2">Account Number</label>
                                <input type="text" value={bankDetails.account_number} onChange={e => setBankDetails({ ...bankDetails, account_number: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-2">IFSC Code</label>
                                <input type="text" value={bankDetails.ifsc_code} onChange={e => setBankDetails({ ...bankDetails, ifsc_code: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" /></div>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600">Save Settings</button>
                            {saved && <span className="text-emerald-600 font-medium">✓ Saved!</span>}
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Store Information</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Store Name</span><span className="font-medium">Mynt Fashion Store</span></div>
                        <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Admin Username</span><span className="font-medium">admin</span></div>
                        <div className="flex justify-between py-2"><span className="text-slate-500">Version</span><span className="font-medium">1.0.0</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
