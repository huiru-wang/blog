"use client";
import { useState } from "react";
import MapComponent from "./MapComponent";
import TravelSidebar from "./TravelSidebar";
import { TravelMarker } from "@/lib/types";
export function TravelContainer({ travelMarkers }: { travelMarkers: TravelMarker[] }) {

    const [showSideBar, setShowSidebar] = useState(false);

    const [selectedMarker, setSelectedMarker] = useState<TravelMarker | null>(null);

    return (
        <section className="h-screen w-full snap-start flex flex-col bg-background text-foreground pt-2">
            <div className="px-6 pt-8 pb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    💫 点击地图上的标记点，探索美好回忆
                </p>
            </div>
            <div className="relative px-4 sm:px-32 pb-4 pt-8" style={{ height: '100%' }}>
                <div className="h-full w-full rounded-xl overflow-hidden shadow-lg">
                    {/* 地图实例 */}
                    <MapComponent travelMarkers={travelMarkers} setShowSidebar={setShowSidebar} setSelectedMarker={setSelectedMarker as any} />
                </div>

                {/* 侧边抽屉 */}
                <TravelSidebar open={showSideBar} onClose={() => setShowSidebar(false)} marker={selectedMarker} />
            </div>
        </section>
    );
}
