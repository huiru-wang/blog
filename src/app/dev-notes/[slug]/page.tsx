import { compileMarkdownWithTOC, getFileContent } from "@/lib/md";
import { notFound } from "next/navigation";
import BlogTableOfContent from "@/components/blogs/BlogTableOfContent";
import BlogContainer from "@/components/blogs/BlogContainer";
import BackTop from "@/components/BackTop";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const source = await getFileContent(slug, process.env.DEV_NOTES_DIR!);

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

        const source = await getFileContent(slug, process.env.DEV_NOTES_DIR!);

        const { content, frontmatter, toc } = await compileMarkdownWithTOC(source);

        return (
            <>
                <BlogContainer content={content} frontmatter={frontmatter} />
                <BlogTableOfContent toc={toc} />
                <BackTop />
            </>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}