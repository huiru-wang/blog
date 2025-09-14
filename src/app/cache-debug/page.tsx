'use client';

import { useState, useEffect, useCallback } from 'react';
import { CacheManager } from '@/lib/cache-utils';

export default function CacheDebugPage() {
    const [stats, setStats] = useState<any>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const refreshStats = useCallback(() => {
        const newStats = CacheManager.getStats();
        setStats(newStats);
        addLog('Stats refreshed');
    }, []);

    const clearAllCache = () => {
        CacheManager.clearAll();
        refreshStats();
        addLog('All cache cleared');
    };

    const clearMdxCache = () => {
        CacheManager.clearMdxCache();
        refreshStats();
        addLog('MDX cache cleared');
    };

    const clearArticleCache = () => {
        CacheManager.clearArticleCache();
        refreshStats();
        addLog('Article cache cleared');
    };

    useEffect(() => {
        refreshStats();
        const interval = setInterval(refreshStats, 5000); // 每5秒刷新一次
        return () => clearInterval(interval);
    }, [refreshStats]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">缓存调试页面</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">缓存统计</h2>
                    {stats && (
                        <div className="space-y-2">
                            <div>
                                <strong>文章缓存:</strong> {stats.articleCache.size} 项, {Math.round(stats.articleCache.memoryUsage / 1024)} KB
                            </div>
                            <div>
                                <strong>MDX缓存:</strong> {stats.mdxCache.size} 项, {Math.round(stats.mdxCache.memoryUsage / 1024)} KB
                            </div>
                            <div>
                                <strong>总内存:</strong> {Math.round(stats.totalMemory / 1024)} KB
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">缓存操作</h2>
                    <div className="space-y-2">
                        <button
                            onClick={refreshStats}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            刷新统计
                        </button>
                        <button
                            onClick={clearMdxCache}
                            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            清理MDX缓存
                        </button>
                        <button
                            onClick={clearArticleCache}
                            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                            清理文章缓存
                        </button>
                        <button
                            onClick={clearAllCache}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            清理所有缓存
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">操作日志</h2>
                <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-64 overflow-y-auto">
                    {logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">使用说明:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>访问不同文章时，观察MDX缓存项数的变化</li>
                    <li>如果文章切换有问题，尝试清理MDX缓存</li>
                    <li>查看浏览器控制台的缓存日志信息</li>
                    <li>每次访问新文章时，应该看到新的缓存项被创建</li>
                </ul>
            </div>
        </div>
    );
}
