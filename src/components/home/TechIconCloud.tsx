import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
    "java",
    "spring",
    "mysql",
    "redis",
    "apachekafka",
    "apacherocketmq",
    "git",
    "linux",
    "github",
    "python",
    "html5",
    "react",
    "javascript",
    "nginx",
];


export function TechIconCloud() {
    const images = slugs.map(
        (slug) => `/icons/${slug}.svg`,
    );

    return (
        <div className="mx-auto my-auto">
            <IconCloud images={images} />
        </div>
    );
}