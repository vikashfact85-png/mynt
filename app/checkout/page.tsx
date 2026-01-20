'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CartItem, DEFAULT_BANK_DETAILS, BankDetails } from '@/lib/types';

type CheckoutStep = 'details' | 'payment-method' | 'payment-confirm' | 'payment-status' | 'success';

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('details');
    const [bagItems, setBagItems] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank_transfer'>('upi');
    const [paymentStatus, setPaymentStatus] = useState<'completed' | 'disputed'>('completed');
    const [disputeReason, setDisputeReason] = useState('');
    const [orderId, setOrderId] = useState('');
    const [bankDetails, setBankDetails] = useState<BankDetails>(DEFAULT_BANK_DETAILS);

    useEffect(() => {
        const savedBag = localStorage.getItem('mynt_bag');
        if (savedBag) {
            setBagItems(JSON.parse(savedBag));
        }
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setBankDetails(data);
        } catch (error) {
            console.error('Error fetching bank details:', error);
        }
    };

    const subtotal = bagItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const deliveryFee = subtotal >= 799 ? 0 : 79;
    const total = subtotal + deliveryFee;

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep('payment-method');
    };

    const handlePaymentMethodSubmit = () => {
        setCurrentStep('payment-confirm');
    };

    const handlePaymentConfirm = () => {
        setCurrentStep('payment-status');
    };

    const handleFinalSubmit = () => {
        // Generate order ID
        const newOrderId = 'MYN' + Date.now().toString().slice(-6);

        // Create order
        const order = {
            id: newOrderId,
            ...formData,
            items: bagItems.length,
            total_amount: total,
            status: 'pending',
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            dispute_reason: paymentStatus === 'disputed' ? disputeReason : undefined,
            created_at: new Date().toISOString(),
        };

        // Save order
        const existingOrders = JSON.parse(localStorage.getItem('mynt_orders') || '[]');
        existingOrders.unshift(order);
        localStorage.setItem('mynt_orders', JSON.stringify(existingOrders));

        // Clear bag
        localStorage.setItem('mynt_bag', '[]');

        setOrderId(newOrderId);
        setCurrentStep('success');
    };

    // Empty bag check
    if (bagItems.length === 0 && currentStep !== 'success') {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)]">
                <Header />
                <main className="container py-20 text-center">
                    <p className="text-lg text-[var(--text-secondary)]">Your bag is empty</p>
                    <Link href="/" className="btn-primary mt-4 inline-block">Start Shopping</Link>
                </main>
                <Footer />
            </div>
        );
    }

    // Success screen
    if (currentStep === 'success') {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)]">
                <Header />
                <main className="container py-20 text-center">
                    <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Order Placed Successfully!</h2>
                        <p className="text-[var(--text-secondary)] mb-4">
                            Your order ID is <span className="font-bold text-[var(--primary)]">#{orderId}</span>
                        </p>

                        <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 text-left mb-6">
                            <h4 className="font-bold text-[var(--text-primary)] mb-3">Order Summary</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Amount</span>
                                    <span className="font-bold text-[var(--text-primary)]">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Payment Method</span>
                                    <span className="font-bold text-[var(--primary)]">
                                        {paymentMethod === 'upi' ? 'UPI Payment' : 'Bank Transfer'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Payment Status</span>
                                    <span className={`font-bold ${paymentStatus === 'completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {paymentStatus === 'completed' ? 'Completed' : 'Disputed'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link href="/" className="flex-1 btn-primary">
                                CONTINUE SHOPPING
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-secondary)]">
            <Header />

            <main className="container py-8">
                {/* Progress Indicator */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center ${currentStep === 'details' ? 'text-pink-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'details' ? 'bg-pink-600 text-white' : 'bg-slate-200'}`}>1</div>
                            <span className="ml-2 text-sm font-medium">Details</span>
                        </div>
                        <div className="flex-1 h-1 mx-4 bg-slate-200"></div>
                        <div className={`flex items-center ${['payment-method', 'payment-confirm', 'payment-status'].includes(currentStep) ? 'text-pink-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['payment-method', 'payment-confirm', 'payment-status'].includes(currentStep) ? 'bg-pink-600 text-white' : 'bg-slate-200'}`}>2</div>
                            <span className="ml-2 text-sm font-medium">Payment</span>
                        </div>
                        <div className="flex-1 h-1 mx-4 bg-slate-200"></div>
                        <div className={`flex items-center ${currentStep === 'payment-status' ? 'text-pink-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'payment-status' ? 'bg-pink-600 text-white' : 'bg-slate-200'}`}>3</div>
                            <span className="ml-2 text-sm font-medium">Confirm</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-6">
                            {/* Step 1: Delivery Details */}
                            {currentStep === 'details' && (
                                <>
                                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Delivery Address</h2>
                                    <form onSubmit={handleDetailsSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Address</label>
                                            <textarea
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                                rows={3}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">City</label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">PIN Code</label>
                                                <input
                                                    type="text"
                                                    value={formData.pincode}
                                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                    className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--primary)]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full btn-primary py-4 mt-6">
                                            CONTINUE TO PAYMENT
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* Step 2: Payment Method Selection */}
                            {currentStep === 'payment-method' && (
                                <>
                                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Select Payment Method</h2>
                                    <div className="space-y-4">
                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-pink-500 bg-pink-50' : 'border-slate-200 hover:border-pink-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment-method"
                                                value="upi"
                                                checked={paymentMethod === 'upi'}
                                                onChange={(e) => setPaymentMethod(e.target.value as 'upi')}
                                                className="mr-3"
                                            />
                                            <span className="text-lg font-semibold">💳 UPI Payment</span>
                                            <p className="text-sm text-slate-600 ml-6 mt-1">Pay using UPI QR code or UPI ID</p>
                                        </label>

                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'bank_transfer' ? 'border-pink-500 bg-pink-50' : 'border-slate-200 hover:border-pink-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment-method"
                                                value="bank_transfer"
                                                checked={paymentMethod === 'bank_transfer'}
                                                onChange={(e) => setPaymentMethod(e.target.value as 'bank_transfer')}
                                                className="mr-3"
                                            />
                                            <span className="text-lg font-semibold">🏦 Bank Transfer</span>
                                            <p className="text-sm text-slate-600 ml-6 mt-1">Transfer directly to our bank account</p>
                                        </label>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={() => setCurrentStep('details')} className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
                                            BACK
                                        </button>
                                        <button onClick={handlePaymentMethodSubmit} className="flex-1 btn-primary py-4">
                                            CONTINUE
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Step 3: Payment Confirmation */}
                            {currentStep === 'payment-confirm' && (
                                <>
                                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                                        {paymentMethod === 'upi' ? 'UPI Payment Details' : 'Bank Transfer Details'}
                                    </h2>

                                    {paymentMethod === 'upi' ? (
                                        <div className="space-y-6">
                                            {bankDetails.upi_qr_code_url ? (
                                                <div className="flex flex-col items-center">
                                                    <p className="text-sm text-slate-600 mb-4">Scan the QR code below to pay</p>
                                                    <div className="w-64 h-64 border-2 border-slate-200 rounded-xl overflow-hidden bg-white p-4">
                                                        <img
                                                            src={bankDetails.upi_qr_code_url}
                                                            alt="UPI QR Code"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                                                    <p className="text-amber-800">QR Code not available. Please use UPI ID below.</p>
                                                </div>
                                            )}

                                            <div className="bg-slate-50 rounded-lg p-4">
                                                <p className="text-sm text-slate-600 mb-2">Or pay using UPI ID:</p>
                                                <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3">
                                                    <span className="font-bold text-lg text-pink-600">{bankDetails.upi_id}</span>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(bankDetails.upi_id)}
                                                        className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Amount to pay:</strong> ₹{total.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <p className="text-sm text-slate-600 mb-4">Transfer the amount to the following bank account:</p>

                                            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                                                <div className="flex justify-between py-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Bank Name</span>
                                                    <span className="font-semibold">{bankDetails.bank_name}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Account Holder</span>
                                                    <span className="font-semibold">{bankDetails.account_holder}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Account Number</span>
                                                    <span className="font-semibold">{bankDetails.account_number}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-600">IFSC Code</span>
                                                    <span className="font-semibold">{bankDetails.ifsc_code}</span>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Amount to transfer:</strong> ₹{total.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={() => setCurrentStep('payment-method')} className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
                                            BACK
                                        </button>
                                        <button onClick={handlePaymentConfirm} className="flex-1 btn-primary py-4">
                                            I HAVE PAID
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Step 4: Payment Status */}
                            {currentStep === 'payment-status' && (
                                <>
                                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Confirm Payment Status</h2>
                                    <div className="space-y-4">
                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentStatus === 'completed' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment-status"
                                                value="completed"
                                                checked={paymentStatus === 'completed'}
                                                onChange={(e) => setPaymentStatus(e.target.value as 'completed')}
                                                className="mr-3"
                                            />
                                            <span className="text-lg font-semibold">✅ Payment Done</span>
                                            <p className="text-sm text-slate-600 ml-6 mt-1">I have successfully completed the payment</p>
                                        </label>

                                        <label className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentStatus === 'disputed' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment-status"
                                                value="disputed"
                                                checked={paymentStatus === 'disputed'}
                                                onChange={(e) => setPaymentStatus(e.target.value as 'disputed')}
                                                className="mr-3"
                                            />
                                            <span className="text-lg font-semibold">⚠️ Dispute</span>
                                            <p className="text-sm text-slate-600 ml-6 mt-1">I faced an issue with the payment</p>
                                        </label>

                                        {paymentStatus === 'disputed' && (
                                            <div className="ml-6 mt-4">
                                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Reason for dispute (optional)</label>
                                                <textarea
                                                    value={disputeReason}
                                                    onChange={(e) => setDisputeReason(e.target.value)}
                                                    className="w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-amber-500"
                                                    rows={3}
                                                    placeholder="Please describe the issue you faced..."
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={() => setCurrentStep('payment-confirm')} className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
                                            BACK
                                        </button>
                                        <button onClick={handleFinalSubmit} className="flex-1 btn-primary py-4">
                                            PLACE ORDER
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 sticky top-24">
                            <h3 className="font-bold text-[var(--text-primary)] text-lg border-b border-[var(--border-light)] pb-4 mb-4">
                                ORDER SUMMARY
                            </h3>

                            <div className="space-y-3 text-sm border-b border-[var(--border-light)] pb-4 mb-4">
                                {bagItems.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-[var(--text-secondary)]">
                                            {item.product.brand} × {item.quantity}
                                        </span>
                                        <span className="font-semibold text-[var(--text-primary)]">
                                            ₹{(item.product.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Subtotal</span>
                                    <span className="text-[var(--text-primary)]">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Delivery</span>
                                    <span className={deliveryFee === 0 ? 'text-[var(--success)]' : 'text-[var(--text-primary)]'}>
                                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-[var(--border-light)] mt-4 pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span className="text-[var(--text-primary)]">Total</span>
                                    <span className="text-[var(--text-primary)]">₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
