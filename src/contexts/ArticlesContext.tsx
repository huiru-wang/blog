'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

interface Article {
    slug: string;
    frontmatter: {
        title: string;
        tags: string[];
        publishedAt?: string;
        category: string;
        description?: string;
        keywords?: string;
    };
    commonTags?: number;
    isCurrentArticle?: boolean;
}

interface ArticlesContextType {
    articles: Article[];
    loading: boolean;
    getRelatedArticles: (currentTags: string[], currentSlug: string) => Article[];
    // UI状态管理
    tocVisible: boolean;
    relatedArticlesVisible: boolean;
    setTocVisible: (visible: boolean) => void;
    setRelatedArticlesVisible: (visible: boolean) => void;
}

const ArticlesContext = createContext<ArticlesContextType>({
    articles: [],
    loading: false,
    getRelatedArticles: () => [],
    tocVisible: false,
    relatedArticlesVisible: false,
    setTocVisible: () => { },
    setRelatedArticlesVisible: () => { }
});

export const useArticles = () => {
    const context = useContext(ArticlesContext);
    if (!context) {
        throw new Error('useArticles must be used within ArticlesProvider');
    }
    return context;
};

interface ArticlesProviderProps {
    children: ReactNode;
    articles: Article[];
    loading?: boolean;
}

export const ArticlesProvider = ({ children, articles, loading = false }: ArticlesProviderProps) => {
    // UI状态管理
    const [tocVisible, setTocVisible] = useState(false);
    const [relatedArticlesVisible, setRelatedArticlesVisible] = useState(false);

    const getRelatedArticles = useMemo(() => {
        return (currentTags: string[], currentSlug: string) => {
            return articles
                .map(article => {
                    const articleTags = article.frontmatter.tags || [];
                    const commonTags = currentTags.filter(tag => articleTags.includes(tag));
                    const isCurrentArticle = article.slug === decodeURIComponent(currentSlug);

                    return {
                        ...article,
                        commonTags: commonTags.length,
                        isCurrentArticle
                    };
                })
                .filter(article => article.commonTags > 0 || article.isCurrentArticle)
                .sort((a, b) => {
                    // 按发布时间升序排序（时间越早越靠前）
                    const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
                    const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
                    return dateA - dateB;
                });
        };
    }, [articles]);

    return (
        <ArticlesContext.Provider value={{
            articles,
            loading,
            getRelatedArticles,
            tocVisible,
            relatedArticlesVisible,
            setTocVisible,
            setRelatedArticlesVisible
        }}>
            {children}
        </ArticlesContext.Provider>
    );
};
