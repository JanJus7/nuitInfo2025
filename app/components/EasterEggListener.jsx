"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EasterEggListener() {
    const router = useRouter();
    const [inputSequence, setInputSequence] = useState([]);

    // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            setInputSequence(prev => {
                const newSequence = [...prev, e.key];
                if (newSequence.length > konamiCode.length) {
                    newSequence.shift();
                }
                return newSequence;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (inputSequence.join(',') === konamiCode.join(',')) {
            router.push('/snake');
            setInputSequence([]); // Reset after activation
        }
    }, [inputSequence, router]);

    return null;
}
