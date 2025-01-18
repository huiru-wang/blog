import { compileMarkdownWithTOC } from "@/lib/md";
import { notFound } from "next/navigation";
import BlogTableOfContent from "@/components/blogs/BlogTableOfContent";
import BlogContainer from "@/components/blogs/BlogContainer";
import BackTop from "@/components/BackTop";
import { press_start_2p } from "@/lib/fonts";
import Link from "next/link";

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const response = await fetch(`http://127.0.0.1:3000/api?slug=${slug}`);

    const data = await response.text();

    const { frontmatter } = await compileMarkdownWithTOC(data);

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

        const response = await fetch(`http://127.0.0.1:3000/api?slug=${slug}`);

        const data = await response.text();

        const { content, frontmatter, toc } = await compileMarkdownWithTOC(data);

        return (
            <>
                <Link href={"/blogs"} className={`${press_start_2p.className} hidden sm:block`}>Back</Link>
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