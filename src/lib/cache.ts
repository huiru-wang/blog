/**
 * 内存缓存管理器
 * 用于在2核1G服务器环境下优化内存使用
 */

interface CacheItem<T> {
    data: T;
    timestamp: number;
    hits: number;
    size: number;
}

class MemoryCache {
    private cache = new Map<string, CacheItem<any>>();
    private maxSize: number;
    private maxAge: number;
    private currentSize = 0;

    constructor(maxSize: number = 50 * 1024 * 1024, maxAge: number = 5 * 60 * 1000) {
        this.maxSize = maxSize; // 50MB 最大缓存
        this.maxAge = maxAge; // 5分钟过期
    }

    set<T>(key: string, data: T): void {
        const size = this.calculateSize(data);

        // 如果单个项目太大，不缓存
        if (size > this.maxSize * 0.1) {
            return;
        }

        // 清理过期项目
        this.cleanup();

        // 如果添加后超过限制，清理最少使用的项目
        while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
            this.evictLRU();
        }

        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            hits: 0,
            size
        });

        this.currentSize += size;
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key);

        if (!item) {
            return null;
        }

        // 检查是否过期
        if (Date.now() - item.timestamp > this.maxAge) {
            this.cache.delete(key);
            this.currentSize -= item.size;
            return null;
        }

        // 增加命中次数
        item.hits++;
        return item.data;
    }

    private calculateSize(data: any): number {
        try {
            return JSON.stringify(data).length * 2; // 粗略估算
        } catch {
            return 1024; // 默认1KB
        }
    }

    private cleanup(): void {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > this.maxAge) {
                this.cache.delete(key);
                this.currentSize -= item.size;
            }
        }
    }

    private evictLRU(): void {
        let lruKey = '';
        let minHits = Infinity;
        let oldestTime = Infinity;

        for (const [key, item] of this.cache.entries()) {
            // 优先清理命中次数少且时间久的
            if (item.hits < minHits || (item.hits === minHits && item.timestamp < oldestTime)) {
                lruKey = key;
                minHits = item.hits;
                oldestTime = item.timestamp;
            }
        }

        if (lruKey) {
            const item = this.cache.get(lruKey);
            if (item) {
                this.cache.delete(lruKey);
                this.currentSize -= item.size;
            }
        }
    }

    clear(): void {
        this.cache.clear();
        this.currentSize = 0;
    }

    getStats() {
        return {
            size: this.cache.size,
            memoryUsage: this.currentSize,
            maxSize: this.maxSize,
            hitRate: this.calculateHitRate()
        };
    }

    private calculateHitRate(): number {
        let totalHits = 0;
        for (const item of this.cache.values()) {
            totalHits += item.hits;
        }
        return totalHits / Math.max(this.cache.size, 1);
    }
}

// 创建全局缓存实例
export const articleCache = new MemoryCache(30 * 1024 * 1024, 10 * 60 * 1000); // 30MB, 10分钟
export const mdxCache = new MemoryCache(20 * 1024 * 1024, 5 * 60 * 1000); // 20MB, 5分钟

// 定期清理缓存
setInterval(() => {
    articleCache.clear();
    mdxCache.clear();
}, 30 * 60 * 1000); // 每30分钟清理一次
