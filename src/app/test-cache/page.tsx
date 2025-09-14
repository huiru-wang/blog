'use client';

import { useState } from 'react';
import { compileMarkdownWithTOC } from '@/lib/mdParser';

export default function TestCachePage() {
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const testCache = async () => {
        setLoading(true);
        setResult('Testing cache...\n');

        try {
            // 模拟测试内容
            const testContent1 = `# Test Article 1
This is test content 1.`;

            const testContent2 = `# Test Article 2  
This is test content 2.`;

            // 第一次编译
            setResult(prev => prev + 'Compiling content 1...\n');
            const result1 = await compileMarkdownWithTOC(testContent1, 'test-article-1');
            setResult(prev => prev + `Content 1 compiled: ${result1.frontmatter?.title || 'No title'}\n`);

            // 第二次编译相同内容（应该命中缓存）
            setResult(prev => prev + 'Compiling content 1 again (should hit cache)...\n');
            const result1Cached = await compileMarkdownWithTOC(testContent1, 'test-article-1');
            setResult(prev => prev + `Content 1 cached: ${result1Cached.frontmatter?.title || 'No title'}\n`);

            // 编译不同内容
            setResult(prev => prev + 'Compiling content 2...\n');
            const result2 = await compileMarkdownWithTOC(testContent2, 'test-article-2');
            setResult(prev => prev + `Content 2 compiled: ${result2.frontmatter?.title || 'No title'}\n`);

            // 编译不同slug但相同内容
            setResult(prev => prev + 'Compiling content 1 with different slug...\n');
            const result1DifferentSlug = await compileMarkdownWithTOC(testContent1, 'test-article-1-different');
            setResult(prev => prev + `Content 1 with different slug: ${result1DifferentSlug.frontmatter?.title || 'No title'}\n`);

            setResult(prev => prev + '\n✅ Cache test completed! Check console for cache logs.\n');
        } catch (error) {
            setResult(prev => prev + `❌ Error: ${error}\n`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">缓存测试页面</h1>

            <div className="mb-6">
                <button
                    onClick={testCache}
                    disabled={loading}
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? '测试中...' : '开始缓存测试'}
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">测试结果</h2>
                <pre className="whitespace-pre-wrap font-mono text-sm bg-black text-green-400 p-4 rounded overflow-auto max-h-96">
                    {result || '点击按钮开始测试...'}
                </pre>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold mb-2">测试说明:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>测试相同内容的缓存命中</li>
                    <li>测试不同内容的独立缓存</li>
                    <li>测试不同slug的独立缓存</li>
                    <li>查看浏览器控制台的缓存日志</li>
                </ul>
            </div>
        </div>
    );
}
