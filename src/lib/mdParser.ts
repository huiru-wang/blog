
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrismPlus from 'rehype-prism-plus';
import { Frontmatter } from "./types";
import components from "@/components/markdown/MdxComponent";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';
import { mdxCache } from './cache';

/**
 * 解析markdown内容，并生成toc
 * 
 * @param content markdown内容
 * @returns mdx及目录
 */
export const compileMarkdownWithTOC = async (content: string) => {
    // 使用内容hash作为缓存key
    const contentHash = Buffer.from(content).toString('base64').slice(0, 16);
    const cacheKey = `mdx_${contentHash}`;

    // 尝试从缓存获取
    const cached = mdxCache.get(cacheKey);
    if (cached) {
        return cached;
    }

    let toc = "";
    const result = await compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                // 解析插件
                remarkPlugins: [
                    remarkGfm,
                    remarkMath,
                ],
                rehypePlugins: [
                    [
                        rehypePrismPlus, {
                            ignoreMissing: true,
                            showLineNumbers: true,
                            // 限制代码高亮范围，减少内存使用
                            addResultClass: false
                        }
                    ],
                    // 生成目录
                    [
                        rehypeToc, {
                            headings: ['h1', 'h2'],
                            customizeTOC: (tocHtml) => {
                                toc = tocHtml;
                                return false;
                            }
                        }
                    ],
                    // Katex支持
                    rehypeKatex,
                ],
            }
        },
        // 定制化markdown渲染
        components: components,
    });

    const resultWithToc = { ...result, toc };

    // 缓存结果
    mdxCache.set(cacheKey, resultWithToc);

    return resultWithToc;
}