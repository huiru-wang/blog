'use client';
import React from 'react'

export default function InlineCode({ children }) {
    console.log('InlineCode', children);
    return (
        <div className="px-1 py-0.5 rounded inline-block text-[#C96699] font-mono text-sm">
            {children}
        </div>
    )
}