import PixelatedCardList from "@/components/blogs/PixelatedCardList";
import { getResourceMetadatas, getMetaInfo } from "@/lib/md";
import { press_start_2p } from "@/lib/fonts";
import Image from "next/image";
import Pokemon from '@/public/widgets/pokeball.png';
import Sanji from "@/public/widgets/sanji.png";
import WidgetImg from "@/components/WidgetImg";
import { MetaInfo } from "@/lib/types";

export const metadata = {
    title: "Robin Dev Notes",
    description: "Robinverse Dev Notes website",
};

export default async function Page() {

    // 服务段读取文件数据
    const devNotesMetadatas = await getResourceMetadatas(process.env.DEV_NOTES_DIR!);

    // 服务端读取json元数据
    const metaInfo: MetaInfo[] = await getMetaInfo(process.cwd(), process.env.META_INFO!);

    return (
        <div className="flex flex-col select-none">
            <div className="flex items-center justify-start mb-2">
                <Image src={Pokemon} width={40} height={40} alt="Pokemon" />
                <h1 className={`${press_start_2p.className} text-2xl font-bold`}>
                    Dev Notes
                </h1>
            </div>

            <PixelatedCardList initialDevNotesMetadatas={devNotesMetadatas} metaInfo={metaInfo} />

            <WidgetImg src={Sanji} position="right" />
        </div>
    );
}
