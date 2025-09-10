import { getFileContent } from "@/lib/md";
import { compileMarkdownWithTOC } from "@/lib/mdParser";
import { notFound } from "next/navigation";
import MarkdownTableOfContent from "@/components/markdown/MarkdownTableOfContent";
import MarkdownContainer from "@/components/markdown/MarkdownContainer";
import BackTop from "@/components/BackTop";
import RelatedArticles from "@/components/markdown/RelatedArticles";
import { getAllDevNotesArticles } from "@/lib/getDevNotesArticles";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const source = await getFileContent(process.env.DEV_NOTES_DIR!, slug);

    const { frontmatter } = await compileMarkdownWithTOC(source);

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

        const { content, frontmatter, toc } = await compileMarkdownWithTOC(source);

        // 获取所有DevNotes文章用于相关文章推荐
        const allDevNotesArticles = await getAllDevNotesArticles();

        console.log('Page Debug:', {
            currentSlug: slug,
            currentFrontmatter: frontmatter,
            allDevNotesArticles: allDevNotesArticles,
            allDevNotesArticlesLength: allDevNotesArticles.length
        });

        return (
            <>
                <MarkdownContainer content={content} frontmatter={frontmatter} />
                <MarkdownTableOfContent toc={toc} />
                <RelatedArticles
                    currentArticle={{ slug, frontmatter }}
                    allArticles={allDevNotesArticles}
                />
                <BackTop />
            </>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}