/**
 * 缓存管理工具
 * 用于调试和管理缓存状态
 */

import { articleCache, mdxCache } from './cache';

export class CacheManager {
    // 获取缓存统计信息
    static getStats() {
        return {
            articleCache: articleCache.getStats(),
            mdxCache: mdxCache.getStats(),
            totalMemory: articleCache.getStats().memoryUsage + mdxCache.getStats().memoryUsage
        };
    }

    // 清理所有缓存
    static clearAll() {
        articleCache.clear();
        mdxCache.clear();
        console.log('All caches cleared');
    }

    // 清理MDX缓存
    static clearMdxCache() {
        mdxCache.clear();
        console.log('MDX cache cleared');
    }

    // 清理文章列表缓存
    static clearArticleCache() {
        articleCache.clear();
        console.log('Article cache cleared');
    }

    // 清理特定文章的缓存
    static clearArticleMdxCache(slug: string) {
        mdxCache.clearByPattern(`mdx_${slug}_`);
        console.log(`Cleared MDX cache for article: ${slug}`);
    }

    // 打印缓存状态
    static printStats() {
        const stats = this.getStats();
        console.log('=== Cache Statistics ===');
        console.log(`Article Cache: ${stats.articleCache.size} items, ${stats.articleCache.memoryUsage} bytes`);
        console.log(`MDX Cache: ${stats.mdxCache.size} items, ${stats.mdxCache.memoryUsage} bytes`);
        console.log(`Total Memory: ${stats.totalMemory} bytes`);
        console.log('========================');
    }

    // 在开发环境下自动打印缓存状态
    static enableDebugMode() {
        if (process.env.NODE_ENV === 'development') {
            setInterval(() => {
                this.printStats();
            }, 30000); // 每30秒打印一次
        }
    }
}

// 在开发环境下启用调试模式（仅在客户端）
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    CacheManager.enableDebugMode();
}
