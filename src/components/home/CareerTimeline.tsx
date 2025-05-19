import Image from "next/image";
import { Timeline } from "../ui/timeline";
import Link from "next/link";

const data = [
    {
        title: "2021.04",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    2021年4月顺利毕业，2个好兄弟选择继续读博，预祝他们顺利毕业。😄
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/%E5%8D%97%E7%90%86%E5%B7%A5-2.jpg"
                        alt="bento template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/%E5%8D%97%E7%90%86%E5%B7%A5-1.jpg"
                        alt="bento template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div>
            </div>
        )
    },
    {
        title: "2021.08",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    我毕业后离开南京，来到杭州，开始了第一份工作：华为终端云服务部的一名服务端开发；
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/%E5%8D%8E%E4%B8%BA-2.jpg"
                        alt="cards template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div>
            </div>
        )
    },
    {
        title: "2022.10",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    我在交易中台工作了差不多1年的时间。之后接手一个重构项目，我很喜欢这个项目，它很有价值并且对于工作不久的我来说，很有挑战。这个项目完成后，突然而来的组织架构调整，让我们杭州整组转移到了别的项目
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    继续待了半年后，23年9月底，我提了离职，10月底我离开华为。
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/%E5%8D%8E%E4%B8%BA-1.jpg"
                        alt="bento template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "2023.11",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    同年11月份，我来到阿里巴巴，开始一段新的工作 🎉
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4-1.jpg"
                        alt="hero template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4-2.jpg"
                        alt="feature template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "2024.11",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    在工作之余，也搭建了一个博客网站，就是本站，后续用于记录个人学习以及和老婆一起的旅行日记
                </p>
                <div className=" mb-5">
                    <Link
                        href="/blogs/03-Blog网站的构建.md"
                        className="bg-blue-400 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    >
                        Next.js TailwindCSS RemoteMDX 博客
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/robinverse-blog.png"
                        alt="hero template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/blog/robinverse-travel.png"
                        alt="feature template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                </div>
            </div >
        ),
    }
];

const CareerTimeline = () => {
    return (
        <Timeline data={data}></Timeline>
    )
};

export default CareerTimeline;