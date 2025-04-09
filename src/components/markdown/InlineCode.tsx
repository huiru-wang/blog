'use client';
import React from 'react'

export default function InlineCode({ children }) {

    return (
        <div className="px-1 rounded inline-block text-[#dc6aa5] font-mono">
            {children}
        </div>
    )
}