import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrismPlus from 'rehype-prism-plus';
import { Frontmatter } from "./types";
import components from "@/components/markdown/MdxComponent";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';


const separator = path.sep;

const devNoteBaseDir = path.join(process.cwd(), process.env.DEV_NOTES_DIR || "dev-notes");

const blogBaseDir = path.join(process.cwd(), process.env.BLOG_DIR || "blogs");;

const blogMap = new Map();

/**
 * 根据slug读取并解析md、mdx
 * 1. Slug切分为文件路径：如文件位置为：content/fold1/fold2/hello.mdx，则slug为：blogs/fold1_fold2_hello.mdx
 * 解析时将"_"替换为"/"，找到对应的文件
 * 2. Slug中的文件名需解码，可能还有URLEncode后的中文
 * 
 * @param slug slug
 * @returns {content, frontmatter}
 */
export const getDevNoteContent = async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    let postMdxContent;
    if (blogMap.has(decodedSlug)) {
        postMdxContent = blogMap.get(decodedSlug);
    } else {
        const pathSegment = decodedSlug?.split('_');
        const targetMdx = pathSegment.join(separator);
        const targetMdxPath = path.join(devNoteBaseDir, `${targetMdx}`);
        postMdxContent = await fs.promises.readFile(targetMdxPath, 'utf8');
        blogMap.set(slug, postMdxContent);
    }
    return postMdxContent;
}

/**
 * 根据slug读取并解析md、mdx
 * 1. Slug切分为文件路径：如文件位置为：content/fold1/fold2/hello.mdx，则slug为：blogs/fold1_fold2_hello.mdx
 * 解析时将"_"替换为"/"，找到对应的文件
 * 2. Slug中的文件名需解码，可能还有URLEncode后的中文
 * 
 * @param slug slug
 * @returns {content, frontmatter}
 */
export const getBlogContent = async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    console.log(slug, decodedSlug)
    let postMdxContent;
    if (blogMap.has(decodedSlug)) {
        postMdxContent = blogMap.get(decodedSlug);
    } else {
        const pathSegment = decodedSlug?.split('_');
        const targetMdx = pathSegment.join(separator);
        const targetMdxPath = path.join(blogBaseDir, `${targetMdx}`);
        postMdxContent = await fs.promises.readFile(targetMdxPath, 'utf8');
        blogMap.set(slug, postMdxContent);
    }
    return postMdxContent;
}

/**
 * 读取本地md、mdx文件的frontmatter并组装slug
 * 支持多级目录
 * slug拼接方式：按照文件夹的层级结构，如 blogs/fold1_fold2_hello.mdx
 * 
 * @returns {frontmatter, slug}[]
 */
export const getBlogMetadatas = async (baseDir: string = devNoteBaseDir) => {
    const result: { slug: string, content: string, frontmatter: Frontmatter }[] = [];
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
                    const { content, frontmatter } = await parseMdx(fileContent);
                    if (!frontmatter || !frontmatter.title || !frontmatter.category || !frontmatter.tags) {
                        continue
                    }
                    const relativePath = path.relative(baseDir, filePath);
                    const slug = relativePath.replaceAll(separator, '_');
                    blogMap.set(slug, fileContent);
                    result.push({
                        slug: slug,
                        content: content,
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

    return compileMDX<Frontmatter>({
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
}


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
                remarkPlugins: [remarkGfm, remarkMath],
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
        components: components
    });
    return { ...result, toc }
}