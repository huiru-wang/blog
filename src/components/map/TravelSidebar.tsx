"use client";
import Image from "next/image";
import { type TravelMarker, type TravelMarkerContentBlock } from "@/lib/types";

interface TravelSidebarProps {
    open: boolean;
    onClose: () => void;
    marker: TravelMarker | null;
}

export default function TravelSidebar({ open, onClose, marker }: TravelSidebarProps) {

    // 如果sidebar没有打开，不渲染任何内容
    if (!open) {
        return null;
    }

    return (
        <>
            {/* 遮罩层 - 只在sidebar打开时渲染 */}
            <div
                className="fixed inset-0 bg-black/40 transition-opacity z-40 pointer-events-auto"
                onClick={onClose}
            />

            {/* 宽屏：右侧抽屉；窄屏：底部抽屉 */}
            <div className="fixed inset-0 pointer-events-none z-50">
                {/* 右侧抽屉 */}
                <div
                    className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 pointer-events-auto translate-x-0 hidden sm:block"
                >
                    {marker && <SidebarContent marker={marker} onClose={onClose} />}
                </div>

                {/* 底部抽屉 */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[65%] bg-white dark:bg-gray-900 shadow-[0_-8px_24px_rgba(0,0,0,0.2)] transition-transform duration-300 pointer-events-auto translate-y-0 sm:hidden"
                >
                    {marker && <SidebarContent marker={marker} onClose={onClose} />}
                </div>
            </div>
        </>
    );
}

function SidebarContent({ marker, onClose }: { marker: TravelMarker; onClose: () => void }) {
    return (
        <div className="h-full w-full flex flex-col">
            {/* 头部 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/[.08] dark:border-white/[.15]">
                <div className="min-w-0">
                    <div className="text-xs text-pink-600 dark:text-pink-400 truncate">{marker.city} · {marker.SOC}</div>
                    <h3 className="text-lg font-semibold truncate">{marker.title}</h3>
                </div>
                <button onClick={onClose} className="px-3 py-1 rounded bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-sm">
                    关闭
                </button>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(marker.content ?? []).map((block, idx) => (
                    <ContentBlock key={idx} block={block} />
                ))}
            </div>
        </div>
    );
}

function ContentBlock({ block }: { block: TravelMarkerContentBlock }) {
    if (block.type === 'text') {
        return <p className="text-sm leading-relaxed whitespace-pre-wrap">{block.text}</p>;
    }
    if (block.type === 'image') {
        return (
            <div className="w-full">
                <div className="relative w-80 mx-auto overflow-hidden rounded-md">
                    <Image
                        src={block.src}
                        alt={block.caption ?? '图片'}
                        width={320}
                        height={0}
                        className="w-full h-auto object-contain"
                        sizes="320px"
                    />
                </div>
                {block.caption && <div className="mt-1 text-xs text-center opacity-70">{block.caption}</div>}
            </div>
        );
    }
    return null;
}
