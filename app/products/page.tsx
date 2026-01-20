'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEMO_PRODUCTS } from '@/lib/types';

export default function ProductsPage() {
    const [products] = useState(DEMO_PRODUCTS);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', 'men', 'women', 'home'];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b sticky top-0 bg-white z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/" className="text-2xl font-bold">
                        MYNT<sup className="text-sm">RA</sup>
                    </Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">All Products</h1>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat
                                        ? 'bg-[#ff3f6c] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map(product => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group"
                        >
                            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    {product.discount_percent > 0 && (
                                        <div className="absolute top-2 left-2 bg-[#ff3f6c] text-white text-xs font-bold px-2 py-1 rounded">
                                            {product.discount_percent}% OFF
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                                        {product.brand}
                                    </h3>
                                    <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                                        {product.name}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm">
                                            ₹{product.price}
                                        </span>
                                        {product.discount_percent > 0 && (
                                            <>
                                                <span className="text-gray-400 text-xs line-through">
                                                    ₹{product.original_price}
                                                </span>
                                                <span className="text-[#ff3f6c] text-xs font-medium">
                                                    ({product.discount_percent}% OFF)
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="text-xs">⭐ {product.rating}</span>
                                        <span className="text-gray-400 text-xs">
                                            ({product.reviews_count})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
