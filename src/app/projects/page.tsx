import ProjectModal from "@/components/projects/ProjectModal";
import { projects } from "@/lib/projects";
import { press_start_2p } from "@/lib/fonts";
import Pokemon from '@/public/widgets/pokeball.png';
import Image from "next/image";

export default function Home() {

    return (
        <div className="flex flex-col px-4">
            <div className="flex items-center justify-start mb-4">
                <Image src={Pokemon} width={40} height={40} alt="Pokemon" />
                <h1 className={`${press_start_2p.className} text-2xl font-bold`}>
                    Dev Projects
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-16">
                {
                    projects.map(project => {
                        return (
                            <ProjectModal
                                key={project.title}
                                redirect={project.redirect}
                                img={project.img}
                                title={project.title}
                                description={project.description}
                            />
                        )
                    })
                }
            </div>
        </div>

    );
}
