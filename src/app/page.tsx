import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Socials from "@/components/home/Socials";
import BlurFade from "@/components/ui/blur-fade";
import WidgetImg from "@/components/WidgetImg";
import Gengar from "@/public/widgets/gengar.png";
import { Cover } from "@/components/ui/cover";
import { press_start_2p } from "@/lib/fonts";
import CareerTimeline from "@/components/home/CareerTimeline";
import HyperText from "@/components/ui/hyper-text";

export const metadata = {
  title: "Robin Blog",
  description: "Robin's personal website",
};

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center">
      <section>
        <BackgroundBeamsWithCollision
          className="mb-10 flex flex-col gap-6 text-xl relative z-20 md:text-2xl md:my-20 lg:text-3xl font-bold text-center font-sans tracking-tight"
        >
          <BlurFade delay={0.4} inView>
            <HyperText
              className={`${press_start_2p.className} text-[0.8rem] sm:text-[1rem] my-0`}
            >
              Robin
            </HyperText>
          </BlurFade>
          <BlurFade delay={2 * 0.4} inView>
            后端程序员 {" "}
          </BlurFade>
          <BlurFade delay={3 * 0.4} inView>
            <span>热爱{" "}</span>
            <span className="funcy-borad">Coding</span>
          </BlurFade>
          <BlurFade delay={4 * 0.4} inView>
            正在努力成为全栈工程师 {" "}
          </BlurFade>
          <BlurFade delay={5 * 0.4} inView className={`${press_start_2p.className} text-[0.7rem] sm:text-[1rem] mt-4 `}>
            <Cover>Feel free to contact me!</Cover>
          </BlurFade>
          <BlurFade
            delay={6 * 0.4}
            inView
          >
            <Socials />
          </BlurFade>
        </BackgroundBeamsWithCollision>
      </section>
      <section>
        <CareerTimeline />
      </section>

      <WidgetImg src={Gengar} position="left" />
    </div>
  );
}
