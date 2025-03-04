import Image from "next/image";
import { Timeline } from "../ui/timeline";

const data = [
    {
        title: "2018.09",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    这一年是我在南京的第一年，也是在长春的最后一年，我用了一年的时间，每天图书馆和宿舍2点一线，最后我如愿考上了南京理工大学的控制工程专业。9月份我只身一人来到南京，开始了我最后3年的校园生活。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    第一次见到导师，我们聊了一些，但不多，随后我便找到师兄师姐，讨论选课的问题。我知道我来读研的目的，就是想要学到东西，找到一份好一点的工作。所以我问的第一个问题就是：“师姐，选什么课比较好找工作呀？”。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    师姐笑了：“那你就选最简单好过的课吧，然后自己去学计算机吧”。我愣了
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    就这样，我的本专业还没开始，我就已经要转行👨‍💻了。
                </p>
            </div>
        )
    },
    {
        title: "2020.04",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    这一年多时间，从计算机网络到数据结构与算法，从HelloWorld到个人网站开发，也经常和朋友在峡谷决战到天亮，每个学期末天天泡在图书馆，狂补课刷题。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    后来也开始在学校附近的一家云计算公司实习
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    疫情突然来袭，不过这时候管控还不是很严，过完年，我们还是正常上班，主管希望我转正留下来，但我还是想去更大的平台。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    然后我提了离职，专心准备秋招。第一份简历是6月份开始投递，当时的我对大厂好像没什么概念，只是不停投简历、笔试、面试、复盘。我也没有什么目标，倒觉得这个过程还蛮有意思。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    也拿到几个offer：科大讯飞、大华股份、华为。
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="/南理工-1.jpg"
                        alt="bento template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="/南理工-2.jpg"
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
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    接着我开始了为期6个月的试用期，在这期间除了日常的开发任务外，还需要完成很多的考试、获取等级证书等等。我在期间也拿到了专业级的技术证书，我和我师傅以及我的主管都很满意。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    与此同时，我也在做交易开发相关的需求👨‍💻，我主要的工作是为交易中台在全球对接更多的支付渠道，比如欧洲的PayU、科威特的Knet、以及Paypal等等；那段时间和国外的同时倒时差的联调项目是一段很不错的经历。
                </p>
            </div>
        )
    },
    {
        title: "2022.10",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    我在交易中台工作了差不多1年的时间，包括试用期在内。之后接手一个重构项目，我很喜欢这个项目，它很有价值并且对于工作不久的我来说，很有挑战。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    🎯 这个项目叫做BCP，他是一个专门针对交易系统的一个旁路校验服务；通过交易链路中产生的日志，关联核对关键信息，以此保证每次交易链路的资金一致性；用户可以在BCP平台上将业务中的日志进行关联，配置特定条件下触发特定的事件。
                </p>
            </div>
        ),
    },
    {
        title: "2023.06",
        content: (
            <div>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    我在交易中台工作了差不多1年的时间，包括试用期在内。之后接手一个重构项目，我很喜欢这个项目，它很有价值并且对于工作不久的我来说，很有挑战。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    🎯 这个项目叫做BCP，他是一个专门针对交易系统的一个旁路校验服务；通过交易链路中产生的日志，关联核对关键信息，以此保证每次交易链路的资金一致性；用户可以在BCP平台上将业务中的日志进行关联，配置特定条件下触发特定的事件。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    不过在BCP项目完工后，组织架构调整，我们整组迁移到现在的云眼部门，做监控告警方面的业务。我承认我确实对这样的业务不太感兴趣，那时候的我更期望接触商业化的业务，我还是坚持把手头的项目从0到1落地后。
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
                    9月底，我提了离职，10月底我离开华为。
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="/华为-2.jpg"
                        alt="bento template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="/华为-1.jpg"
                        alt="cards template"
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
                        src="/阿里巴巴-1.jpg"
                        alt="hero template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                    <Image
                        src="/阿里巴巴-2.jpg"
                        alt="feature template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />

                </div>
            </div>
        ),
    }
];

const CareerTimeline = () => {
    return (
        <Timeline data={data}></Timeline>
    )
};

export default CareerTimeline;