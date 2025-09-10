import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrismPlus from 'rehype-prism-plus';
import { Frontmatter } from "./types";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
// import mdxMermaid from 'mdx-mermaid';

const separator = path.sep;

/**
 * 读取博客的meta信息
 * 
 * @param baseDir 文件目录
 * @param filename 文件名
 */
export const getMetaInfo = async (baseDir: string, filename: string) => {
    const metaInfoFile = path.join(baseDir, `${filename}`);
    const data = await fs.promises.readFile(metaInfoFile, 'utf8');
    return JSON.parse(data);
}

export const getFileContent = async (baseDir: string, slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    const pathSegment = decodedSlug?.split('_');
    const targetMdx = pathSegment.join(separator);
    try {
        const targetMdxPath = path.join(baseDir, `${targetMdx}`);
        const content = await fs.promises.readFile(targetMdxPath, 'utf8');
        return content;
    } catch (error) {
        console.error('getFileContent error:', error);
        return '';
    }
}

/**
 * 读取本地md、mdx文件的frontmatter并组装slug
 * 支持多级目录
 * slug拼接方式：按照文件夹的层级结构，如 blogs/fold1_fold2_hello.mdx
 * 
 * @returns {frontmatter, slug}[]
 */
export const getResourceMetadatas = async (baseDir: string) => {
    const result: { slug: string, frontmatter: Frontmatter }[] = [];
    const readDirRecursively = async (currentDir) => {
        const files = await fs.promises.readdir(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = await fs.promises.stat(filePath);
            if (stats.isDirectory()) {
                await readDirRecursively(filePath);
            } else if (stats.isFile() && (path.extname(file) === '.md' || path.extname(file) === '.mdx')) {
                try {
                    const fileContent = await fs.promises.readFile(filePath, 'utf8');
                    const { frontmatter } = await parseMdx(fileContent);
                    if (!frontmatter || !frontmatter.title || !frontmatter.category || !frontmatter.tags) {
                        continue
                    }
                    const relativePath = path.relative(baseDir, filePath);
                    const slug = relativePath.replaceAll(separator, '_');
                    result.push({
                        slug: slug,
                        frontmatter: frontmatter,
                    });
                } catch (error) {
                    console.error(`Error parsing file: ${filePath}`, error);
                }
            }
        }
    };
    await readDirRecursively(baseDir);
    // 降序
    result.sort((a, b) => {
        const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
        const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
        return dateB - dateA;
    });
    return result;
}

/**
 * 解析markdown内容
 * @param content 文件内容
 * @returns {content, frontmatter}
 */
const parseMdx = async (content: string): Promise<{ content, frontmatter: Frontmatter }> => {

    const result = await compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                    [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true, classNamePrefix: 'mdx-' }],
                    rehypeKatex,
                ],
            }
        },
    });

    return result;
}