"use client";
import { useState } from "react";
import MapComponent from "./MapComponent";
import { TravelMarker } from "@/lib/types";
import { SideBar } from "./SideBar";
export function TravelContainer({ travelMarkers }: { travelMarkers: TravelMarker[] }) {

    const [showSideBar, setShowSidebar] = useState(false);

    const [selectedMarker, setSelectedMarker] = useState<TravelMarker | null>(null);

    return (
        <div className="flex h-full w-full items-center justify-center bg-background overflow-hidden">

            {/* 地图实例 */}
            <MapComponent travelMarkers={travelMarkers} setShowSidebar={setShowSidebar} setSelectedMarker={setSelectedMarker} />

            {
                // 点击marker后显示对应的侧边栏
                showSideBar && selectedMarker && selectedMarker.travelLog && (
                    <SideBar
                        title={selectedMarker.title}
                        travelLog={selectedMarker.travelLog}
                        setShowSidebar={setShowSidebar}
                    />
                )
            }
        </div>
    );
}