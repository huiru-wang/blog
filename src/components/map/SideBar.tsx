import { X } from "lucide-react";
import MarkdownContainer from "../markdown/MarkdownContainer";
import { motion } from "framer-motion";

export function SideBar({ title, travelLog, setShowSidebar }) {
    return (
        <motion.div
            initial={{ y: 0, x: -10, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{
                duration: 0.5, // 动画持续时间为 0.5 秒
                ease: 'easeOut', // 使用 easeOut 缓动函数
            }}
            style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="hidden md:block h-full w-1/3 bg-orange-200 text-black overflow-y-auto rounded-l-2xl"
        >
            <div className="flex-shrink-0 border-b p-4 bg-orange-300 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={() => setShowSidebar(false)} />
                </div>
            </div>

            {/* 可滚动内容区域 */}
            <div className="p-4 overflow-y-auto flex-1">
                <MarkdownContainer
                    content={travelLog}
                    frontmatter={null}
                    textSize="text-sm"
                    showScrollProgress={false}
                />
            </div>
        </motion.div>
    );
}