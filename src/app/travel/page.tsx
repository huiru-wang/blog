import { TravelContainer } from "@/components/map/TravelContainer";
import { getFileContent, getMetaInfo } from "@/lib/md";
import { compileMarkdownWithTOC } from "@/lib/mdParser";
import { MetaInfo, TravelMarker } from "@/lib/types";

export const metadata = {
    title: "Robin Blogs",
    description: "Travel AMap",
};
export default async function Home() {

    const metaInfo: MetaInfo = await getMetaInfo(process.cwd(), process.env.META_INFO!);

    const travelLocations: TravelMarker[] = metaInfo.travelMarkers;

    const travelMarkers: TravelMarker[] = [];

    for (const location of travelLocations) {
        const newMarker: TravelMarker = {
            ...location,
            position: location.position as [number, number],
        };

        if (location.logFile) {
            const source = await getFileContent(process.env.TRAVEL_LOG_DIR!, location.logFile);
            const { content } = await compileMarkdownWithTOC(source);
            newMarker.travelLog = content;
        }

        travelMarkers.push(newMarker);
    }

    return (
        <TravelContainer travelMarkers={travelMarkers} />
    );
}
