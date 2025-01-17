import BlogList from "@/components/blogs/BlogList";
import { getBlogMetadatas } from "@/lib/md";
import { press_start_2p } from "@/lib/fonts";
import Image from "next/image";
import Pokemon from '@/public/widgets/pokeball.png';
import Sanji from "@/public/widgets/sanji.png";
import WidgetImg from "@/components/WidgetImg";


export default async function Page() {

    const blogMetadatas = await getBlogMetadatas();

    return (
        <div className="flex flex-col px-4">
            <div className="flex items-center justify-start mb-4">
                <Image src={Pokemon} width={40} height={40} alt="Pokemon" />
                <h1 className={`${press_start_2p.className} text-2xl font-bold`}>
                    Dev Blogs
                </h1>
            </div>

            <BlogList initialPostMetadatas={blogMetadatas} />

            <WidgetImg src={Sanji} position="right" />
        </div>
    );
}
