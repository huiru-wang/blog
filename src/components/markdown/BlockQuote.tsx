'use client';

export default function BlockQuote({ children }) {

    return (
        <div className="my-2 border-l-4 border-[#d54a4a] bg-[#F3F0FF] bg-opacity-60 rounded-e shadow-[1px_1px_2px_0_var(--border)]">
            <div className="text-black px-3">{children}</div>
        </div>
    );
}