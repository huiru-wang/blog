'use client'
import PixelatedCard from "@/components/blogs/PixelatedCard";
import TagPanel from "@/components/blogs/TagPanel";
import { useMemo, useState } from "react";
import BlurFade from "@/components/ui/blur-fade";


export default function BlogList({ initialDevNotesMetadatas }) {

    const [blogMetadatas, setBlogMetadatas] = useState(initialDevNotesMetadatas || []);

    // 每次filter从全量数据中筛选
    const postMetadataFilter = (category: string, tag: string) => {

        console.log(blogMetadatas);

        if (!category) {
            setBlogMetadatas(initialDevNotesMetadatas);
            return;
        }
        const filtedItems = initialDevNotesMetadatas.filter(post => post.frontmatter.category === category && (!tag || post.frontmatter.tags?.includes(tag)))
        setBlogMetadatas(filtedItems);
    };

    // frontmatter为文章元数据，使用初始化的全量数据缓存
    const frontmatters = useMemo(() => initialDevNotesMetadatas.map(post => post.frontmatter), [initialDevNotesMetadatas]);

    return (
        <div className="flex flex-col">

            <TagPanel frontmatters={frontmatters} onFilter={postMetadataFilter} />

            {/* w-full保持grid容器充满当前父容器宽度，子元素w-full可以保持1:1比例，充满grid容器 */}
            <div className="grid justify-center items-center lg:grid-cols-2 gap-x-8 gap-y-6">
                {
                    blogMetadatas.map(({ slug, frontmatter }, index) => (
                        <BlurFade
                            delay={index * 0.05}
                            inView key={slug}
                            className="w-full"
                        >
                            <PixelatedCard slug={slug} frontmatter={frontmatter} />
                        </BlurFade>
                    ))
                }
            </div>

        </div>
    )
}