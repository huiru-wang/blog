'use client';

import { Frontmatter } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RelatedArticlesProps {
    currentArticle: {
        slug: string;
        frontmatter: Frontmatter;
    };
    allArticles: Array<{
        slug: string;
        frontmatter: Frontmatter;
    }>;
}

export default function RelatedArticles({ currentArticle, allArticles }: RelatedArticlesProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

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

    // 获取当前文章的tags
    const currentTags = currentArticle.frontmatter.tags || [];

    // 找到有相同tags的文章（包含当前文章）
    const relatedArticles = allArticles
        .map(article => {
            const articleTags = article.frontmatter.tags || [];
            const commonTags = currentTags.filter(tag => articleTags.includes(tag));
            return {
                ...article,
                commonTags
            };
        })
        .filter(article => article.commonTags.length > 0)
        .sort((a, b) => {
            // 按共同tags数量降序排列
            const tagCountDiff = b.commonTags.length - a.commonTags.length;
            if (tagCountDiff !== 0) return tagCountDiff;

            // 如果共同tags数量相同，按发布时间升序排列
            const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
            const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
            return dateA - dateB;
        });

    console.log('RelatedArticles:', relatedArticles);

    // 在移动端隐藏相关文章列表
    if (isMobile) {
        return null;
    }

    // 临时显示调试信息
    if (relatedArticles.length === 0) {
        return (
            <div className="fixed left-5 top-28 flex flex-col items-start">
                {/* 相关文章切换图标 - 始终可见 */}
                <button
                    onClick={toggleVisibility}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="mb-2 p-2 bg-[var(--card)] border border-[var(--border)] rounded shadow-[2px_2px_0_0_var(--border)] hover:shadow-[3px_3px_0_0_var(--border)] transition-all duration-200 flex items-center justify-center text-[var(--card-foreground)]"
                    aria-label={isVisible ? "隐藏相关文章" : "显示相关文章"}
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

                {/* 调试信息内容 */}
                <div
                    className={`min-w-64 max-w-80 p-4 border border-[var(--border)] rounded shadow-[4px_4px_0_0_var(--border)] bg-[var(--card)] text-[var(--card-foreground)] transition-all duration-300 ${isVisible || isHovered
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                >
                    <h3 className="text-lg font-bold mb-3 text-center">调试信息</h3>
                    <div
                        className="text-sm max-h-96 overflow-y-auto custom-scrollbar"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'var(--border) transparent'
                        }}
                    >
                        <p>当前文章: {currentArticle.slug}</p>
                        <p>当前tags: {JSON.stringify(currentArticle.frontmatter.tags)}</p>
                        <p>总文章数: {allArticles.length}</p>
                        <p>相关文章数: {relatedArticles.length}</p>
                        <div className="mt-2">
                            <p>所有文章:</p>
                            {allArticles.map(article => (
                                <div key={article.slug} className="text-xs">
                                    {article.slug}: {JSON.stringify(article.frontmatter.tags)}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <p>过滤后的文章:</p>
                            {allArticles
                                .map(article => {
                                    const articleTags = article.frontmatter.tags || [];
                                    const commonTags = currentTags.filter(tag => articleTags.includes(tag));
                                    return (
                                        <div key={article.slug} className="text-xs">
                                            {article.slug}: {JSON.stringify(articleTags)} - 共同tags: {JSON.stringify(commonTags)}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-5 top-28 flex flex-col items-start">
            {/* 相关文章切换图标 - 始终可见 */}
            <button
                onClick={toggleVisibility}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="mb-2 p-2 bg-[var(--card)] border border-[var(--border)] rounded shadow-[2px_2px_0_0_var(--border)] hover:shadow-[3px_3px_0_0_var(--border)] transition-all duration-200 flex items-center justify-center text-[var(--card-foreground)]"
                aria-label={isVisible ? "隐藏相关文章" : "显示相关文章"}
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

            {/* 相关文章内容 */}
            <div
                className={`min-w-64 max-w-80 p-4 border border-[var(--border)] rounded shadow-[4px_4px_0_0_var(--border)] bg-[var(--card)] text-[var(--card-foreground)] transition-all duration-300 ${isVisible || isHovered
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
            >
                <h3 className="text-lg font-bold mb-3 text-center">相关文章</h3>
                <div
                    className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'var(--border) transparent'
                    }}
                >
                    {relatedArticles.map((article) => {
                        const isCurrentArticle = article.slug === currentArticle.slug;
                        return (
                            <Link
                                key={article.slug}
                                href={`/dev-notes/${article.slug}`}
                                className={`block p-2 border border-[var(--border)] rounded hover:bg-[var(--accent)] transition-colors duration-200 ${isCurrentArticle ? 'bg-[var(--accent)] font-semibold' : ''
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
        </div>
    );
}
