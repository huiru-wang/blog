'use client'

import React, { useState, useEffect } from 'react';

const PixelCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setClicking(true);
        const handleMouseUp = () => setClicking(false);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div
            className={`pixel-cursor ${clicking ? 'clicking' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        />
    );
};

export default PixelCursor;

