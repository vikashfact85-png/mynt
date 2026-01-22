'use client';

import { useState, useMemo } from 'react';
import reviewsData from '@/lib/reviews.json';

interface ProductReviewsProps {
    productId: string;
    productRating?: number;
    totalRatings?: number;
}

interface Review {
    reviewer: typeof reviewsData.reviewers[0];
    template: typeof reviewsData.reviewTemplates[0];
    date: string;
    bgColor: string;
}

// Seeded random number generator for consistent randomization per product
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Shuffle array with seed
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Generate a random date within the last 6 months
function generateRandomDate(seed: number): string {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    const randomTime = sixMonthsAgo.getTime() + seededRandom(seed) * (now.getTime() - sixMonthsAgo.getTime());
    const date = new Date(randomTime);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Get initials from name
function getInitials(name: string) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Pastel colors for avatars
const AVATAR_COLORS = [
    'bg-red-100 text-red-700',
    'bg-orange-100 text-orange-700',
    'bg-amber-100 text-amber-700',
    'bg-green-100 text-green-700',
    'bg-emerald-100 text-emerald-700',
    'bg-teal-100 text-teal-700',
    'bg-cyan-100 text-cyan-700',
    'bg-sky-100 text-sky-700',
    'bg-blue-100 text-blue-700',
    'bg-indigo-100 text-indigo-700',
    'bg-violet-100 text-violet-700',
    'bg-purple-100 text-purple-700',
    'bg-fuchsia-100 text-fuchsia-700',
    'bg-pink-100 text-pink-700',
    'bg-rose-100 text-rose-700',
];

export default function ProductReviews({ productId, productRating = 4.2, totalRatings = 1500 }: ProductReviewsProps) {
    const [showAll, setShowAll] = useState(false);
    const INITIAL_SHOW = 5;
    const TOTAL_REVIEWS = 18; // Show 18 reviews per product

    // Generate reviews based on product ID for consistency
    const reviews = useMemo(() => {
        // Create a numeric seed from product ID
        const seed = productId.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);

        // Shuffle reviewers and templates with the seed
        const shuffledReviewers = shuffleWithSeed(reviewsData.reviewers, seed);
        const shuffledTemplates = shuffleWithSeed(reviewsData.reviewTemplates, seed + 1000);

        // Generate reviews
        const generatedReviews: Review[] = [];
        for (let i = 0; i < TOTAL_REVIEWS; i++) {
            const reviewerIndex = i % shuffledReviewers.length;
            const templateIndex = i % shuffledTemplates.length;
            const colorIndex = Math.floor(seededRandom(seed + i * 50) * AVATAR_COLORS.length);

            generatedReviews.push({
                reviewer: shuffledReviewers[reviewerIndex],
                template: shuffledTemplates[templateIndex],
                date: generateRandomDate(seed + i * 100),
                bgColor: AVATAR_COLORS[colorIndex],
            });
        }

        return generatedReviews;
    }, [productId]);

    const displayedReviews = showAll ? reviews : reviews.slice(0, INITIAL_SHOW);

    // Calculate rating distribution (fake but consistent)
    const ratingDistribution = useMemo(() => {
        const seed = productId.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
        const base5 = Math.floor(45 + seededRandom(seed) * 20);
        const base4 = Math.floor(25 + seededRandom(seed + 1) * 15);
        const base3 = Math.floor(10 + seededRandom(seed + 2) * 10);
        const base2 = Math.floor(3 + seededRandom(seed + 3) * 5);
        const base1 = 100 - base5 - base4 - base3 - base2;
        return { 5: base5, 4: base4, 3: base3, 2: base2, 1: Math.max(1, base1) };
    }, [productId]);

    return (
        <div className="bg-white rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--border-light)]">
                <h3 className="text-xl font-bold text-[#282c3f] uppercase tracking-wide">Customer Reviews</h3>
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-light text-[#282c3f]">
                        {productRating.toFixed(1)}
                    </span>
                    <svg className="w-6 h-6 text-[#14958f]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            </div>

            {/* Rating Distribution */}
            <div className="mb-12 p-8 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left - Overall Rating */}
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-r border-gray-200 pr-12 md:border-r-2 md:border-gray-200">
                        <div className="flex items-end gap-3">
                            <span className="text-6xl font-bold text-[#282c3f]">{productRating.toFixed(1)}</span>
                            <span className="text-2xl text-gray-400 mb-2">/ 5</span>
                        </div>
                        <div className="text-base font-medium text-gray-500 mt-3 uppercase tracking-wide">
                            Overall Rating
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                            {totalRatings.toLocaleString()} verified ratings
                        </div>
                    </div>

                    {/* Right - Rating Bars */}
                    <div className="w-full md:w-1/2 space-y-4">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-5">
                                <span className="text-sm font-bold text-gray-600 w-3">{rating}</span>
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            rating >= 4 ? 'bg-[#14958f]' : rating === 3 ? 'bg-[#ff9f00]' : 'bg-[#ff5722]'
                                        }`}
                                        style={{ width: `${ratingDistribution[rating as keyof typeof ratingDistribution]}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-400 w-10 text-right">
                                    {ratingDistribution[rating as keyof typeof ratingDistribution]}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
                {displayedReviews.map((review, index) => (
                    <div
                        key={`${review.reviewer.id}-${index}`}
                        className="pb-8 border-b border-gray-100 last:border-0"
                    >
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-base ${review.bgColor}`}>
                                    {getInitials(review.reviewer.name)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-base text-[#282c3f]">
                                            {review.reviewer.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{review.reviewer.location}</span>
                                        {review.reviewer.verified && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span className="flex items-center gap-1 text-gray-500">
                                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified Buyer
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span className="text-sm text-gray-400 font-medium">{review.date}</span>
                        </div>

                        {/* Rating & Content */}
                        <div className="ml-16">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold text-white ${
                                    review.template.rating >= 4 ? 'bg-[#14958f]' : review.template.rating >= 3 ? 'bg-[#ff9f00]' : 'bg-[#ff5722]'
                                }`}>
                                    {review.template.rating}
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </span>
                                <h4 className="font-bold text-base text-[#282c3f]">{review.template.title}</h4>
                            </div>

                            <p className="text-base text-[#535665] leading-7 mb-6">
                                {review.template.content}
                            </p>

                            {/* Helpful */}
                            <div className="flex items-center gap-8 pt-4">
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#282c3f] transition-colors group">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    <span className="font-medium">Helpful ({review.template.helpful})</span>
                                </button>
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors group">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                    </svg>
                                    <span className="font-medium">Report</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            {reviews.length > INITIAL_SHOW && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 text-[#ff3f6c] font-bold text-sm uppercase tracking-wide hover:underline"
                    >
                        {showAll ? 'Show Less Reviews' : `View All ${reviews.length} Reviews`}
                        <svg className={`w-4 h-4 transform transition-transform ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
