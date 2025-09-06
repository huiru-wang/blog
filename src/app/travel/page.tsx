import { TravelContainer } from "@/components/map/TravelContainer";
import { travelMarkers } from "@/lib/data";

export const metadata = {
    title: "Robin Blogs",
    description: "旅行地图",
};
export default async function Home() {

    return (
        <TravelContainer travelMarkers={travelMarkers} />
    );
}
