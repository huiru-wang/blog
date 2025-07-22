import { ResumeCard } from "@/components/ui/resume-card";
import BlurFade from "@/components/ui/blur-fade";
import { EXPERIENCE } from "@/lib/data";

const BLUR_FADE_DELAY = 0.04;
export function AboutMe() {
    return (
        <div className="flex flex-col gap-8 mx-auto my-8 pl-10 pr-10">
            {EXPERIENCE.map((item, id) => (
                <BlurFade
                    key={item.company}
                    delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                >
                    <ResumeCard
                        key={item.company}
                        logoUrl={item.logoUrl}
                        altText={item.company}
                        company={item.company}
                        title={item.title}
                        subtitle={""}
                        badges={item.badges}
                        period={`${item.start} ~ ${item.end ?? "Present"}`}
                        description={item.description}
                    />
                </BlurFade>
            ))}
        </div>
    );
}

