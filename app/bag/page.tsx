'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CartItem, BankDetails, DEFAULT_BANK_DETAILS } from '@/lib/types';

export default function BagPage() {
    const [bagItems, setBagItems] = useState<CartItem[]>([]);
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetails>(DEFAULT_BANK_DETAILS);

    useEffect(() => {
        const savedBag = localStorage.getItem('mynt_bag');
        if (savedBag) {
            setBagItems(JSON.parse(savedBag));
        }

        const savedBankDetails = localStorage.getItem('mynt_bank_details');
        if (savedBankDetails) {
            setBankDetails(JSON.parse(savedBankDetails));
        }
    }, []);

    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updatedBag = [...bagItems];
        updatedBag[index].quantity = newQuantity;
        setBagItems(updatedBag);
        localStorage.setItem('mynt_bag', JSON.stringify(updatedBag));
    };

    const removeItem = (index: number) => {
        const updatedBag = bagItems.filter((_, i) => i !== index);
        setBagItems(updatedBag);
        localStorage.setItem('mynt_bag', JSON.stringify(updatedBag));
    };

    const subtotal = bagItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = bagItems.reduce((sum, item) =>
        sum + ((item.product.original_price - item.product.price) * item.quantity), 0
    );
    const deliveryFee = subtotal >= 799 ? 0 : 79;
    const total = subtotal + deliveryFee;

    if (bagItems.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)]">
                <Header />
                <main className="container py-20 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Your bag is empty</h2>
                    <p className="text-[var(--text-secondary)] mb-6">Time to fill it up with some amazing fashion picks!</p>
                    <Link href="/" className="btn-primary inline-block">
                        CONTINUE SHOPPING
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-secondary)]">
            <Header />

            <main className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Bag Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-lg p-4">
                            <h2 className="font-bold text-lg text-[var(--text-primary)]">
                                My Bag ({bagItems.length} items)
                            </h2>
                        </div>

                        {bagItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 flex gap-4">
                                {/* Image */}
                                <div className="relative w-28 h-36 rounded overflow-hidden bg-[var(--bg-tertiary)] flex-shrink-0">
                                    <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-bold text-[var(--text-primary)]">{item.product.brand}</h3>
                                            <p className="text-sm text-[var(--text-secondary)]">{item.product.name}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="text-[var(--text-muted)] hover:text-red-500 text-xl"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="flex gap-4 mt-2 text-sm text-[var(--text-secondary)]">
                                        <span>Size: {item.size}</span>
                                        {item.color && <span>Color: {item.color}</span>}
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                                className="w-8 h-8 border border-[var(--border-light)] rounded flex items-center justify-center hover:border-[var(--primary)]"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                                className="w-8 h-8 border border-[var(--border-light)] rounded flex items-center justify-center hover:border-[var(--primary)]"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="font-bold text-[var(--text-primary)]">
                                                ₹{(item.product.price * item.quantity).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-[var(--text-muted)] line-through">
                                                ₹{(item.product.original_price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 sticky top-24">
                            <h3 className="font-bold text-[var(--text-primary)] text-lg border-b border-[var(--border-light)] pb-4 mb-4">
                                PRICE DETAILS ({bagItems.length} Items)
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Total MRP</span>
                                    <span className="text-[var(--text-primary)]">₹{(subtotal + discount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Discount on MRP</span>
                                    <span className="text-[var(--success)]">-₹{discount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Delivery Fee</span>
                                    <span className={deliveryFee === 0 ? 'text-[var(--success)]' : 'text-[var(--text-primary)]'}>
                                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-[var(--border-light)] mt-4 pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span className="text-[var(--text-primary)]">Total Amount</span>
                                    <span className="text-[var(--text-primary)]">₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPaymentInfo(true)}
                                className="w-full btn-primary py-4 mt-6"
                            >
                                PLACE ORDER
                            </button>

                            <p className="text-xs text-center text-[var(--text-muted)] mt-4">
                                By placing order, you agree to Mynt&apos;s Terms & Conditions
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Payment Info Modal */}
            {showPaymentInfo && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md">
                        <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between">
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">Payment Details</h3>
                            <button
                                onClick={() => setShowPaymentInfo(false)}
                                className="text-2xl text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                Transfer ₹{total.toLocaleString()} to complete your order:
                            </p>

                            <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--text-muted)]">Bank Name</span>
                                    <span className="font-semibold text-[var(--text-primary)]">{bankDetails.bank_name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--text-muted)]">Account Holder</span>
                                    <span className="font-semibold text-[var(--text-primary)]">{bankDetails.account_holder}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--text-muted)]">Account Number</span>
                                    <span className="font-semibold text-[var(--text-primary)]">{bankDetails.account_number}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--text-muted)]">IFSC Code</span>
                                    <span className="font-semibold text-[var(--text-primary)]">{bankDetails.ifsc_code}</span>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-[#fef3cd] rounded-lg">
                                <p className="text-sm font-semibold text-[#856404]">Or pay via UPI</p>
                                <p className="text-lg font-bold text-[#856404] mt-1">{bankDetails.upi_id}</p>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full btn-primary py-4 mt-6 block text-center"
                            >
                                CONTINUE TO CHECKOUT
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
