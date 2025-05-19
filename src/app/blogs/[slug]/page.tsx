import { getFileContent } from "@/lib/md";
import { compileMarkdownWithTOC } from "@/lib/mdParser";
import { notFound } from "next/navigation";
import MarkdownTableOfContent from "@/components/markdown/MarkdownTableOfContent";
import MarkdownContainer from "@/components/markdown/MarkdownContainer";
import BackTop from "@/components/BackTop";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const source = await getFileContent(process.env.BLOG_DIR!, slug);

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

        const source = await getFileContent(process.env.BLOG_DIR!, slug);

        const { content, frontmatter, toc } = await compileMarkdownWithTOC(source);

        return (
            <>
                <MarkdownContainer content={content} frontmatter={frontmatter} />
                <MarkdownTableOfContent toc={toc} />
                <BackTop />
            </>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}