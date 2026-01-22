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
        <Link href={`/product/${product.id}`}>
            <div className="product-card group relative flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl rounded-sm overflow-hidden border border-transparent hover:border-[#eaeaec]">
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f6]">
                    <Image
                        src={product.images[0] || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Action Buttons Overlay - Appears on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm flex flex-col gap-2">
                        <button 
                            onClick={handleBuyNow}
                            className="w-full py-2 bg-[#ff3f6c] text-white font-bold uppercase tracking-wide text-[10px] rounded-sm shadow-md hover:bg-[#d63359] transition-colors flex items-center justify-center gap-1"
                        >
                            ⚡ Buy Now
                        </button>
                        <button className="w-full py-2 bg-white text-[#282c3f] border border-[#d4d5d9] font-bold uppercase tracking-wide text-[10px] rounded-sm hover:border-[#282c3f] transition-colors">
                            View Details
                        </button>
                    </div>

                    {/* Badges */}
                    {product.discount_percent > 30 && (
                        <div className="absolute top-2 left-2 bg-[#ff3f6c] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                            {product.discount_percent}% OFF
                        </div>
                    )}

                    {product.rating > 0 && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-white/95 rounded text-[10px] font-bold text-[#282c3f] shadow-sm group-hover:opacity-0 transition-opacity">
                            <span>{product.rating.toFixed(1)}</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#14958f"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        </div>
                    )}
                </div>

                {/* Info Container */}
                <div className="p-3">
                    <h3 className="text-[14px] font-bold text-[#282c3f] truncate mb-0.5">
                        {product.brand}
                    </h3>
                    <p className="text-[12px] text-[#535665] truncate mb-2 font-normal">
                        {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-[#282c3f]">₹{product.price.toLocaleString()}</span>
                        {product.discount_percent > 0 && (
                            <span className="text-[11px] text-[#94969f] line-through font-light">₹{product.original_price.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

