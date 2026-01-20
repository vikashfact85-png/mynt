'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Product } from '@/lib/types';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToBag, setAddedToBag] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [resolvedParams.id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${resolvedParams.id}`);
            if (!res.ok) throw new Error('Product not found');
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToBag = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const currentBag = JSON.parse(localStorage.getItem('mynt_bag') || '[]');
        const existingIndex = currentBag.findIndex(
            (item: any) => item.product_id === product?.id && item.size === selectedSize
        );

        if (existingIndex > -1) {
            currentBag[existingIndex].quantity += 1;
        } else {
            currentBag.push({
                product_id: product?.id,
                product: product,
                size: selectedSize,
                color: product?.colors[0] || 'Default',
                quantity: 1,
            });
        }

        localStorage.setItem('mynt_bag', JSON.stringify(currentBag));
        setAddedToBag(true);
        setTimeout(() => setAddedToBag(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)]">
                <Header />
                <div className="container py-20 text-center">
                    <p className="text-lg text-[var(--text-secondary)]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)]">
                <Header />
                <div className="container py-20 text-center">
                    <p className="text-lg text-[var(--text-secondary)]">Product not found</p>
                    <Link href="/" className="btn-primary mt-4 inline-block">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-secondary)]">
            <Header />

            <main className="container py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
                    <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
                    <span>/</span>
                    <Link href={`/${product.category}`} className="capitalize hover:text-[var(--primary)]">{product.category}</Link>
                    <span>/</span>
                    <span className="text-[var(--text-secondary)]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Images */}
                    <div className="flex gap-4">
                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex flex-col gap-2">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-16 h-20 rounded overflow-hidden cursor-pointer border-2 transition-colors ${selectedImage === index ? 'border-[var(--primary)]' : 'border-transparent'
                                            }`}
                                    >
                                        <Image src={image} alt={product.name} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Main Image */}
                        <div className="flex-1 relative aspect-[3/4] bg-white rounded-lg overflow-hidden">
                            <Image
                                src={product.images[selectedImage] || product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white rounded-lg p-6">
                        {/* Brand & Name */}
                        <h1 className="text-xl font-bold text-[var(--text-primary)]">{product.brand}</h1>
                        <p className="text-lg text-[var(--text-secondary)] mt-1">{product.name}</p>

                        {/* Rating */}
                        {product.rating > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                                <span className="badge-rating">
                                    {product.rating.toFixed(1)} ★
                                </span>
                                <span className="text-sm text-[var(--text-muted)]">
                                    {product.reviews_count.toLocaleString()} Ratings
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="border-t border-[var(--border-light)] mt-4 pt-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold text-[var(--text-primary)]">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                <span className="text-lg text-[var(--text-muted)] line-through">
                                    MRP ₹{product.original_price.toLocaleString()}
                                </span>
                                <span className="text-lg font-semibold text-[var(--primary)]">
                                    ({product.discount_percent}% OFF)
                                </span>
                            </div>
                            <p className="text-sm text-[var(--success)] mt-1">inclusive of all taxes</p>
                        </div>

                        {/* Size Selection */}
                        {(() => {
                            // Default sizes for clothing categories
                            const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];
                            const clothingCategories = ['men', 'women', 'kids'];

                            // Use product sizes if available, otherwise use defaults for clothing
                            const availableSizes = product.sizes && product.sizes.length > 0
                                ? product.sizes
                                : (clothingCategories.includes(product.category) ? defaultSizes : []);

                            if (availableSizes.length > 0) {
                                return (
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-[var(--text-primary)]">SELECT SIZE</h3>
                                        </div>
                                        <div className="flex gap-3 flex-wrap">
                                            {availableSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all ${selectedSize === size
                                                        ? 'border-[var(--primary)] text-[var(--primary)] bg-pink-50'
                                                        : 'border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })()}

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleAddToBag}
                                className="flex-1 btn-secondary py-4 gap-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {addedToBag ? 'ADDED!' : 'ADD TO BAG'}
                            </button>
                            <button
                                onClick={() => {
                                    if (!selectedSize) {
                                        alert('Please select a size');
                                        return;
                                    }
                                    handleAddToBag();
                                    setTimeout(() => {
                                        window.location.href = '/checkout';
                                    }, 300);
                                }}
                                className="flex-1 btn-primary py-4 gap-2"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                                BUY NOW
                            </button>
                        </div>

                        {/* Delivery */}
                        <div className="mt-6 p-4 bg-[var(--bg-tertiary)] rounded-lg">
                            <h4 className="font-bold text-[var(--text-primary)] mb-2">DELIVERY OPTIONS</h4>
                            <div className="flex items-center gap-2 text-sm">
                                <span>🚚</span>
                                <span className="text-[var(--text-secondary)]">Free delivery on orders above ₹799</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm mt-2">
                                <span>↩️</span>
                                <span className="text-[var(--text-secondary)]">Easy 14 days return & exchange</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6 border-t border-[var(--border-light)] pt-6">
                            <h4 className="font-bold text-[var(--text-primary)] mb-3">PRODUCT DETAILS</h4>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {product.description}
                            </p>
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex">
                                    <span className="w-32 text-[var(--text-muted)]">Category</span>
                                    <span className="text-[var(--text-primary)] capitalize">{product.category}</span>
                                </div>
                                {product.subcategory && (
                                    <div className="flex">
                                        <span className="w-32 text-[var(--text-muted)]">Subcategory</span>
                                        <span className="text-[var(--text-primary)]">{product.subcategory}</span>
                                    </div>
                                )}
                                {product.colors && product.colors.length > 0 && (
                                    <div className="flex">
                                        <span className="w-32 text-[var(--text-muted)]">Available Colors</span>
                                        <span className="text-[var(--text-primary)]">{product.colors.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
