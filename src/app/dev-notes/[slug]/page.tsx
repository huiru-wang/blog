import { getFileContent } from "@/lib/md";
import { compileMarkdownWithTOC } from "@/lib/mdParser";
import { notFound } from "next/navigation";
import MarkdownTableOfContent from "@/components/markdown/MarkdownTableOfContent";
import MarkdownContainer from "@/components/markdown/MarkdownContainer";
import BackTop from "@/components/BackTop";
import RelatedArticles from "@/components/markdown/RelatedArticles";

// 禁用静态生成，确保每次请求都重新渲染
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const source = await getFileContent(process.env.DEV_NOTES_DIR!, slug);

    const { frontmatter } = await compileMarkdownWithTOC(source, slug);

    return {
        title: frontmatter?.title,
        keywords: frontmatter?.keywords,
        publishedAt: frontmatter?.publishedAt,
        description: frontmatter?.description,
    };
}

export default async function Page({ params }) {
    try {

        const { slug } = await params;

        const source = await getFileContent(process.env.DEV_NOTES_DIR!, slug);

        const { content, frontmatter, toc } = await compileMarkdownWithTOC(source, slug);

        // 不再需要 getAllDevNotesArticles()，相关文章通过 Context 获取

        return (
            <>
                <MarkdownContainer content={content} frontmatter={frontmatter} />
                <MarkdownTableOfContent toc={toc} />
                <RelatedArticles
                    currentArticle={{ slug, frontmatter }}
                />
                <BackTop />
            </>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}