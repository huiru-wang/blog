'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

/**
 * markdown代码块组件：增加复制、折叠功能(默认折叠)
 * @param param
 * @returns 
 */
export default function CodeBlock({ children }) {

  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isCopied, setIsCopied] = useState(false);

  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      const lineCount = codeRef.current.innerText.split('\n').length;
      console.log('lineCount', lineCount);
      setIsCollapsed((pre) => pre || lineCount > 5);
    }
  }, [children])

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const copyCode = async () => {
    if (codeRef.current) {
      const code = codeRef.current.textContent;
      if (code && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(code);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
    }
  }

  return (
    <div className="relative bg-black border rounded-sm border-[var(--border)] shadow-[2px_2px_2px_0_var(--border)]">
      <div className="absolute top-2 right-2 flex">
        <button
          onClick={copyCode}
          className="p-1 rounded text-white focus:outline-none"
          aria-label={isCopied ? "Copied!" : "Copy code"}
        >
          {isCopied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <button
          onClick={toggleCollapse}
          className="p-1 rounded text-white text-whitefocus:outline-none"
          aria-label={isCollapsed ? "Expand code" : "Collapse code"}
        >
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      <pre
        ref={codeRef}
        className={`my-0 ${isCollapsed ? 'max-h-16 overflow-hidden' : ''}`}>
        {children}
      </pre>
    </div>
  )
}
