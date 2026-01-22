'use client';

import { useState, useEffect } from 'react';

interface OfferStripProps {
    discountPercent?: number;
}

export default function OfferStrip({ discountPercent = 50 }: OfferStripProps) {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    // Restart timer when it reaches 0
                    return 15 * 60;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="bg-gradient-to-r from-[#ff3f6c] to-[#ff5a7e] py-2.5 px-4 rounded-lg mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                {/* Left - Offer Text */}
                <div className="flex items-center gap-2">
                    <span className="text-yellow-300 text-lg">⚡</span>
                    <span className="text-white font-bold text-sm uppercase tracking-wide">
                        Limited Time Offer
                    </span>
                    <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {discountPercent}% OFF
                    </span>
                </div>

                {/* Right - Timer */}
                <div className="flex items-center gap-2">
                    <span className="text-white/90 text-xs font-medium">Ends in:</span>
                    <div className="flex items-center gap-1">
                        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 min-w-[32px] text-center">
                            <span className="text-white font-bold text-sm tabular-nums">
                                {String(hours).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-white font-bold">:</span>
                        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 min-w-[32px] text-center">
                            <span className="text-white font-bold text-sm tabular-nums">
                                {String(minutes).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-white font-bold">:</span>
                        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 min-w-[32px] text-center">
                            <span className="text-white font-bold text-sm tabular-nums">
                                {String(seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                    <span className="text-yellow-300 text-lg">🔥</span>
                </div>
            </div>
        </div>
    );
}
