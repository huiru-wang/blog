import JourneyMap from "@/components/map/MapComponent";

export const metadata = {
    title: "Robin Blogs",
    description: "Travel AMap",
};
export default async function Home() {
    return (
        <JourneyMap />
    );
}
