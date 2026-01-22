'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
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

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded px-4 py-3 mb-6">
            <span className="text-red-500 animate-pulse">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </span>
            <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-red-700 uppercase tracking-wide">
                    Offer ends in
                </span>
                <span className="font-mono text-lg font-bold text-red-600 tabular-nums">
                    {String(minutes).padStart(2, '0')}m : {String(seconds).padStart(2, '0')}s
                </span>
            </div>
        </div>
    );
}
