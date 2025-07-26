import { press_start_2p } from "@/lib/fonts";
import Pokemon from '@/public/widgets/pokeball.png';
import Image from "next/image";
import { getResourceMetadatas } from "@/lib/md";
import { Frontmatter } from "@/lib/types";
import BlogCard from "@/components/blogs/BlogCard";

export const metadata = {
    title: "Robin Blogs",
    description: "Robinverse Blogs website",
};
export default async function Home() {

    // 读取blog目录
    const blogMetadatas: { slug: string, frontmatter: Frontmatter }[] = await getResourceMetadatas(process.env.BLOG_DIR!);

    return (
        <div className="flex flex-col select-none">
            <div className="flex items-center justify-start mb-4">
                <Image src={Pokemon} width={40} height={40} alt="Pokemon" />
                <h1 className={`${press_start_2p.className} text-2xl font-bold`}>
                    Dev Blogs
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-8 mx-4">
                {
                    blogMetadatas.map(({ slug, frontmatter }, index) => {
                        slug = `/${process.env.BLOG_DIR!}/${slug}`;
                        return (
                            <BlogCard
                                key={index}
                                redirect={slug}
                                title={frontmatter.title}
                                description={frontmatter.description!}
                                publishedAt={frontmatter.publishedAt!}
                                coverImg={frontmatter.coverImageUrl!}
                            />
                        )
                    })
                }
            </div>
        </div>

    );
}
