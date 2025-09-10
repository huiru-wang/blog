'use client';

import { useState, useEffect } from 'react';

/**
 * 将解析的markdown嵌套目录渲染为有层级关系的组件
 * @param toc 嵌套目录
 * @returns 目录组件
 */
export default function MarkdownTableOfContent(toc) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 检测屏幕尺寸
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024); // lg断点
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // 在移动端自动收起
    useEffect(() => {
        if (isMobile) {
            setIsVisible(false);
        }
    }, [isMobile]);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleMouseEnter = () => {
        if (!isVisible) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isVisible) {
            setIsHovered(false);
        }
    };

    return (
        <div className="fixed right-5 top-28 flex flex-col items-end">
            {/* 目录切换图标 - 始终可见，位于右侧 */}
            <button
                onClick={toggleVisibility}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="mb-2 p-2 bg-[var(--card)] border border-[var(--border)] rounded shadow-[2px_2px_0_0_var(--border)] hover:shadow-[3px_3px_0_0_var(--border)] transition-all duration-200 flex items-center justify-center text-[var(--card-foreground)]"
                aria-label={isVisible ? "隐藏目录" : "显示目录"}
            >
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isVisible ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* 目录内容 */}
            <div
                className={`min-w-64 max-w-80 p-4 border border-[var(--border)] rounded shadow-[4px_4px_0_0_var(--border)] bg-[var(--card)] text-[var(--card-foreground)] transition-all duration-300 ${isVisible || isHovered
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
            >
                <nav>
                    <h2 className="text-center text-base font-bold mb-2">Table of Contents</h2>
                    <TableOfContent props={toc.toc} />
                </nav>
            </div>
        </div>
    );
}

function TableOfContent({ props }) {
    switch (props.tagName) {
        case "nav":
            return (
                <nav {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </nav>
            );
        case "ol":
            return (
                <ol {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </ol>
            );
        case "ul":
            return (
                <ul {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </ul>
            );
        case "li":
            return (
                <li {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </li>
            );
        case "a":
            return (
                <>
                    {props.children.map((item, index) => {
                        const header = item.value;
                        return (
                            <a key={index} href={`#${header}`} className="block whitespace-nowrap overflow-hidden text-ellipsis">
                                {header}
                            </a>
                        );
                    })}
                </>
            );
        default:
            return null;
    }
}