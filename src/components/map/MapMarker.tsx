import "@/styles/map-container.css";
import Image from "next/image";

export function MapMarker({ iconImg }: { iconImg: string }) {

    return (
        <div className="marker">
            <div className="marker-image">
                <Image
                    src={iconImg}
                    alt="Marker Image"
                    width={50}
                    height={50}
                />
            </div>
            <div className="marker-pointer" />
        </div>
    );
};
