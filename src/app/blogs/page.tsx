import ProjectModal from "@/components/projects/ProjectModal";
import { projects } from "@/lib/projects";
import { press_start_2p } from "@/lib/fonts";
import Pokemon from '@/public/widgets/pokeball.png';
import Image from "next/image";

export const metadata = {
    title: "Robin Blogs",
    description: "Robinverse Blogs website",
};
export default function Home() {

    // TODO 从文件直接读取，不依赖：@/lib/projects

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
                    projects.map(project => {
                        return (
                            <ProjectModal
                                key={project.title}
                                redirect={project.redirect}
                                img={project.img}
                                title={project.title}
                                description={project.description}
                                publishedAt={project.publishedAt}
                            />
                        )
                    })
                }
            </div>
        </div>

    );
}
