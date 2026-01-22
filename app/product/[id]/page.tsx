'use client';

import { useState, useEffect, useRef } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import ProductReviews from '@/app/components/ProductReviews';
import CountdownTimer from '@/app/components/CountdownTimer';
import ProductCard from '@/app/components/ProductCard';
import { Product } from '@/lib/types';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addedToBag, setAddedToBag] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${resolvedParams.id}`);
                if (!res.ok) throw new Error('Product not found');
                const data = await res.json();
                setProduct(data);
                
                // Fetch recommended products
                if (data && data.category) {
                    const recRes = await fetch(`/api/products?category=${data.category}`);
                    if (recRes.ok) {
                        const recData = await recRes.json();
                        // Filter out current product and limit to 4
                        setRecommendedProducts(recData.filter((p: Product) => p.id !== data.id).slice(0, 4));
                    }
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [resolvedParams.id]);

    const handleAddToBag = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const currentBag = JSON.parse(localStorage.getItem('mynt_bag') || '[]');
        const existingIndex = currentBag.findIndex(
            (item: { product_id: string; size: string }) => item.product_id === product?.id && item.size === selectedSize
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

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.offsetWidth;
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / width);
            setCurrentImageIndex(newIndex);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3f6c]"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="flex flex-col items-center justify-center py-20 px-4">
                    <p className="text-xl text-[#535665] mb-6">Product not found</p>
                    <Link href="/" className="px-8 py-3 bg-white border border-[#ff3f6c] text-[#ff3f6c] font-bold rounded hover:bg-pink-50 transition-colors uppercase tracking-wide">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-20">
                
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[#535665] mb-8">
                    <Link href="/" className="hover:text-[#282c3f] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={`/${product.category}`} className="capitalize hover:text-[#282c3f] transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="font-semibold text-[#282c3f] truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* Content Wrapper: Flex Row on Desktop, Col on Mobile */}
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
                    
                    {/* Left Column: Images (58% width on desktop) */}
                    <div className="w-full lg:w-[58%]">
                        {/* Desktop Gallery: Thumbnails Left + Main Image Right */}
                        <div className="hidden lg:flex gap-4 h-[600px] xl:h-[700px]">
                            {/* Thumbnails Strip */}
                            <div className="w-[80px] flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-full aspect-[3/4] cursor-pointer border rounded-sm overflow-hidden transition-all ${
                                            currentImageIndex === index ? 'border-[#ff3f6c] ring-1 ring-[#ff3f6c]' : 'border-transparent hover:border-gray-300'
                                        }`}
                                    >
                                        <Image 
                                            src={image} 
                                            alt={`View ${index + 1}`} 
                                            fill 
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {/* Main Image Stage */}
                            <div className="flex-1 relative bg-gray-50 rounded-sm overflow-hidden cursor-zoom-in">
                                <Image
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            </div>
                        </div>

                        {/* Mobile Gallery: Swipeable Horizontal Scroll */}
                        <div className="lg:hidden relative">
                            <div 
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide aspect-[3/4] bg-gray-50"
                            >
                                {product.images.map((image, index) => (
                                    <div key={index} className="flex-shrink-0 w-full h-full relative snap-center">
                                        <Image
                                            src={image}
                                            alt={`${product.name} - View ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Mobile Dots */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {product.images.map((_, index) => (
                                    <div 
                                        key={index}
                                        className={`h-1.5 rounded-full transition-all shadow-sm ${
                                            currentImageIndex === index ? 'bg-[#ff3f6c] w-4' : 'bg-white/80 w-1.5'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Details (42% width on desktop) */}
                    <div className="w-full lg:w-[42%]">
                        <div className="lg:sticky lg:top-24 flex flex-col gap-8">
                            
                            {/* Header Section */}
                            <div className="border-b border-[#eaeaec] pb-6">
                                <h1 className="text-2xl font-bold text-[#282c3f] uppercase tracking-wide mb-2">
                                    {product.brand}
                                </h1>
                                <p className="text-xl text-[#535665] font-normal leading-snug">
                                    {product.name}
                                </p>
                                
                                {/* Rating Badge */}
                                <div className="inline-flex items-center gap-2 mt-4 px-2 py-1 border border-[#eaeaec] rounded bg-white cursor-pointer hover:border-[#282c3f] transition-colors">
                                    <span className="font-bold text-sm text-[#282c3f] flex items-center gap-1">
                                        {product.rating.toFixed(1)} 
                                        <svg className="w-3.5 h-3.5 text-[#14958f]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </span>
                                    <span className="w-px h-3 bg-[#d4d5d9]"></span>
                                    <span className="text-sm text-[#535665]">{product.reviews_count} Ratings</span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl font-bold text-[#282c3f]">₹{product.price.toLocaleString()}</span>
                                    <span className="text-xl text-[#94969f] line-through font-light">MRP ₹{product.original_price.toLocaleString()}</span>
                                    <span className="text-xl font-bold text-[#ff905a]">({product.discount_percent}% OFF)</span>
                                </div>
                                <p className="text-xs text-[#03a685] font-bold mt-2 uppercase tracking-wide">inclusive of all taxes</p>
                            </div>

                            {/* Timer Component */}
                            <div className="w-full">
                                <CountdownTimer />
                            </div>

                            {/* Size Selector */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-[#282c3f] uppercase tracking-wide">Select Size</span>
                                    <button className="text-sm font-bold text-[#ff3f6c] uppercase tracking-wide hover:underline">Size Chart</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {(product.sizes?.length ? product.sizes : ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center border font-bold text-sm transition-all duration-200 ${
                                                selectedSize === size
                                                    ? 'border-[#ff3f6c] text-[#ff3f6c] ring-1 ring-[#ff3f6c] bg-white'
                                                    : 'border-[#bfc0c6] text-[#282c3f] hover:border-[#ff3f6c] bg-white'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToBag}
                                    className="flex-1 bg-[#ff3f6c] text-white py-4 rounded-[4px] font-bold text-sm md:text-base uppercase tracking-wider hover:bg-[#ff527b] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="0">
                                        <path d="M16 10a4 4 0 0 1-8 0" stroke="none" />
                                        <path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 15l1.529-13h12.444l1.529 13h-15.502z" />
                                    </svg>
                                    {addedToBag ? 'Added to Bag' : 'Add to Bag'}
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
                                        }, 100);
                                    }}
                                    className="flex-1 bg-white border border-[#d4d5d9] text-[#282c3f] py-4 rounded-[4px] font-bold text-sm md:text-base uppercase tracking-wider hover:border-[#282c3f] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                    Buy Now
                                </button>
                            </div>

                            {/* Product Details Text */}
                            <div className="pt-6 border-t border-[#d4d5d9]">
                                <h4 className="font-bold text-[#282c3f] text-sm uppercase mb-3 flex items-center gap-2">
                                    Product Details
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#535665]">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                </h4>
                                <p className="text-[#535665] text-sm leading-7">
                                    {product.description}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-20 pt-10 border-t border-[#eaeaec]">
                    <ProductReviews 
                        productId={product.id}
                        productRating={product.rating}
                        totalRatings={product.reviews_count}
                    />
                </div>

                {/* Recommended Products Section */}
                {recommendedProducts.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-[#eaeaec]">
                        <h3 className="text-xl font-bold text-[#282c3f] uppercase tracking-wide mb-8">
                            SIMILAR PRODUCTS
                        </h3>
                        <div className="flex flex-wrap gap-6">
                            {recommendedProducts.map((p) => (
                                <div key={p.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
