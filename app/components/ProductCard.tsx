'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/product/${product.id}`}>
            <div
                className="product-card group relative flex flex-col h-full bg-white transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--bg-secondary)]">
                    <Image
                        src={product.images[0] || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Rating Badge */}
                    {product.rating > 0 && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-[var(--text-primary)] shadow-sm">
                            <span className="font-bold">{product.rating.toFixed(1)}</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--success)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            <span className="text-[var(--text-tertiary)] hidden group-hover:inline ml-1 border-l pl-1">
                                {product.reviews_count > 1000 ? '1k+' : product.reviews_count}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info Container */}
                <div className="p-3">
                    {/* Brand Name */}
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)] truncate mb-0.5 leading-tight">
                        {product.brand || 'Brand'}
                    </h3>

                    {/* Product Name */}
                    <p className="text-[13px] font-normal text-[var(--text-secondary)] truncate mb-2">
                        {product.name}
                    </p>

                    {/* Price Block */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-bold text-[var(--text-primary)]">
                            ₹{product.price.toLocaleString()}
                        </span>

                        {product.discount_percent > 0 && (
                            <>
                                <span className="text-[11px] text-[var(--text-tertiary)] line-through">
                                    ₹{product.original_price.toLocaleString()}
                                </span>
                                <span className="text-[11px] font-bold text-[#ff905a] uppercase">
                                    ({product.discount_percent}% OFF)
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Hover Action - Replaces Wishlist on Mobile, Adds to View on Desktop */}
                <div className={`absolute bottom-[80px] left-0 right-0 p-4 transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button className="w-full py-3 bg-[var(--bg-primary)] text-[var(--primary)] font-bold uppercase tracking-wide text-xs border border-[var(--border-light)] shadow-lg hover:bg-[var(--primary)] hover:text-white transition-colors">
                        View Product
                    </button>
                </div>
            </div>
        </Link>
    );
}

