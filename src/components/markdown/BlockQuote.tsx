'use client';

export default function BlockQuote({ children }) {

    console.log('BlockQuote', children[1].props.children.slice(0, children[1].props.children.length));

    return (
        <div className="my-2 border-l-4 border-[#8184ba] bg-[#F3F0FF] bg-opacity-70 rounded-e shadow-[1px_1px_2px_0_var(--border)]">
            <div className="text-gray-700 px-3">{children}</div>
        </div>
    );
}