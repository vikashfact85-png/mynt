'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, CartItem } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Add to bag logic
        const currentBag = JSON.parse(localStorage.getItem('mynt_bag') || '[]');
        const existingIndex = currentBag.findIndex(
            (item: CartItem) => item.product_id === product.id && item.size === (product.sizes?.[0] || 'M')
        );

        if (existingIndex > -1) {
            currentBag[existingIndex].quantity += 1;
        } else {
            currentBag.push({
                product_id: product.id,
                product: product,
                size: product.sizes?.[0] || 'M',
                color: product.colors?.[0] || 'Default',
                quantity: 1,
            });
        }

        localStorage.setItem('mynt_bag', JSON.stringify(currentBag));

        // Direct to checkout
        window.location.href = '/checkout';
    };

    return (
        <div className="product-card flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl rounded-sm overflow-hidden border border-transparent hover:border-[#eaeaec]">
            {/* Image Container - Links to product */}
            <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f6]">
                    <Image
                        src={product.images[0] || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />

                    {/* Badges */}
                    {product.discount_percent > 30 && (
                        <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-[#ff3f6c] text-white px-1 py-0.5 md:px-2 rounded-sm text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
                            {product.discount_percent}% OFF
                        </div>
                    )}

                    {product.rating > 0 && (
                        <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 flex items-center gap-0.5 md:gap-1 px-1 py-0.5 md:px-1.5 bg-white/95 rounded text-[8px] md:text-[10px] font-bold text-[#282c3f] shadow-sm">
                            <span>{product.rating.toFixed(1)}</span>
                            <svg width="8" height="8" className="md:w-[10px] md:h-[10px]" viewBox="0 0 24 24" fill="#14958f"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        </div>
                    )}
                </div>
            </Link>

            {/* Info Container - More compact on mobile */}
            <div className="p-2 md:p-3 flex flex-col flex-1">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-[11px] md:text-[14px] font-bold text-[#282c3f] truncate mb-0.5 hover:text-[#ff3f6c] transition-colors">
                        {product.brand}
                    </h3>
                </Link>
                <p className="text-[10px] md:text-[12px] text-[#535665] truncate mb-1 md:mb-2 font-normal">
                    {product.name}
                </p>
                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-3 flex-wrap">
                    <span className="text-[11px] md:text-[14px] font-bold text-[#282c3f]">₹{product.price.toLocaleString()}</span>
                    {product.discount_percent > 0 && (
                        <span className="text-[9px] md:text-[11px] text-[#94969f] line-through font-light">₹{product.original_price.toLocaleString()}</span>
                    )}
                    {product.discount_percent > 0 && (
                        <span className="text-[9px] md:text-[11px] text-[#ff3f6c] font-medium">{product.discount_percent}% off</span>
                    )}
                </div>

                {/* Action Buttons - Compact on mobile */}
                <div className="mt-auto flex flex-col gap-1 md:gap-2">
                    <button
                        onClick={handleBuyNow}
                        className="w-full py-1.5 md:py-2 bg-[#ff3f6c] text-white font-bold uppercase tracking-wide text-[8px] md:text-[10px] rounded-sm shadow-md hover:bg-[#d63359] transition-colors flex items-center justify-center gap-1"
                    >
                        ⚡ Buy Now
                    </button>
                    <Link
                        href={`/product/${product.id}`}
                        className="w-full py-1.5 md:py-2 bg-white text-[#282c3f] border border-[#d4d5d9] font-bold uppercase tracking-wide text-[8px] md:text-[10px] rounded-sm hover:border-[#282c3f] transition-colors text-center block"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
