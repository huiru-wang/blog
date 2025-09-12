'use client';

import { Frontmatter } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useArticles } from '@/contexts/ArticlesContext';

interface RelatedArticlesProps {
    currentArticle: {
        slug: string;
        frontmatter: Frontmatter;
    };
}

export default function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
    const { getRelatedArticles, relatedArticlesVisible, setRelatedArticlesVisible } = useArticles();
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // 检测屏幕尺寸
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1280); // md断点
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // 在移动端自动收起
    useEffect(() => {
        if (isMobile) {
            setRelatedArticlesVisible(false);
        }
    }, [isMobile, setRelatedArticlesVisible]);

    const toggleVisibility = () => {
        setRelatedArticlesVisible(!relatedArticlesVisible);
    };

    const handleContainerMouseEnter = () => {
        setIsHovered(true);
    };

    const handleContainerMouseLeave = () => {
        setIsHovered(false);
    };

    // 从全局状态获取相关文章，无需重新查询
    const relatedArticles = getRelatedArticles(
        currentArticle.frontmatter.tags || [],
        currentArticle.slug
    );


    return (
        <div
            className="fixed left-5 top-28 flex flex-col items-start"
            onMouseEnter={handleContainerMouseEnter}
            onMouseLeave={handleContainerMouseLeave}
        >
            {/* 相关文章切换图标 - 始终可见 */}
            <button
                onClick={toggleVisibility}
                className="mb-2 p-2 bg-[var(--card)] border border-[var(--border)] rounded shadow-[2px_2px_0_0_var(--border)] hover:shadow-[3px_3px_0_0_var(--border)] transition-all duration-200 flex items-center justify-center text-[var(--card-foreground)]"
                aria-label={relatedArticlesVisible ? "隐藏相关文章" : "显示相关文章"}
            >
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${relatedArticlesVisible ? 'rotate-180' : ''}`}
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

            {/* 相关文章内容 - 在移动端隐藏 */}
            {!isMobile && (
                <div
                    className={`w-72 p-4 border border-[var(--border)] rounded shadow-[4px_4px_0_0_var(--border)] bg-[var(--card)] text-[var(--card-foreground)] transition-all duration-300 ${relatedArticlesVisible || isHovered
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                >
                    <h3 className="text-sm mb-3 text-center">Related Articles</h3>
                    <div
                        className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'var(--border) transparent'
                        }}
                    >
                        {relatedArticles.map((article) => {
                            return (
                                <Link
                                    key={article.slug}
                                    href={`/dev-notes/${article.slug}`}
                                    className={`block p-2 border border-[var(--border)] rounded hover:bg-[var(--accent)] transition-colors duration-200 ${article.isCurrentArticle
                                        ? 'bg-[var(--accent)] font-semibold border-[var(--accent)] shadow-md'
                                        : ''
                                        }`}
                                >
                                    <h4 className="text-sm line-clamp-1">
                                        {article.frontmatter.title}
                                    </h4>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}