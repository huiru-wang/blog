import { ResumeCard } from "@/components/ui/resume-card";
import BlurFade from "@/components/ui/blur-fade";
import { EXPERIENCE } from "@/lib/data";

const BLUR_FADE_DELAY = 0.04;
export function AboutMe() {
    return (
        <div className="flex flex-col gap-8 mx-auto my-14 pl-10 pr-10">
            {EXPERIENCE.map((work, id) => (
                <BlurFade
                    key={work.company}
                    delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                >
                    <ResumeCard
                        key={work.company}
                        logoUrl={work.logoUrl}
                        altText={work.company}
                        title={work.company}
                        subtitle={work.title}
                        badges={work.badges}
                        period={`${work.start} ~ ${work.end ?? "Present"}`}
                        description={work.description}
                    />
                </BlurFade>
            ))}
        </div>
    );
}

