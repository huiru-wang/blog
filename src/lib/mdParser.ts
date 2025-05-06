
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrismPlus from 'rehype-prism-plus';
import { Frontmatter } from "./types";
import components from "@/components/markdown/MdxComponent";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';

/**
 * 解析markdown内容，并生成toc
 * 
 * @param content markdown内容
 * @returns mdx及目录
 */
export const compileMarkdownWithTOC = async (content: string) => {
    let toc = "";
    const result = await compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [
                    remarkGfm,
                    remarkMath,
                    // [
                    //     mdxMermaid,
                    //     {
                    //         output: 'svg',
                    //         mermaid: {
                    //             theme: 'dark',
                    //             darkMode: true,
                    //             fontSize: 40,
                    //             sequence: {
                    //             }
                    //         }
                    //     }
                    // ]
                ],
                rehypePlugins: [
                    [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
                    [rehypeToc, {
                        headings: ['h1', 'h2'],
                        customizeTOC: (tocHtml) => {
                            toc = tocHtml;
                            return false;
                        }
                    }],
                    rehypeKatex,
                ],
            }
        },
        components: components,
    });
    return { ...result, toc }
}