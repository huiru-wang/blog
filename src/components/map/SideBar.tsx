import { X } from "lucide-react";
import MarkdownContainer from "../markdown/MarkdownContainer";
import { motion } from "framer-motion";

export function SideBar({ title, travelLog, setShowSidebar }) {
    return (
        <motion.div
            initial={{
                y: window.innerWidth < 768 ? window.innerHeight : 0,
                x: window.innerWidth < 768 ? 0 : -10,
                opacity: 0,
            }}
            animate={{
                y: 0,
                x: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
            }}
            style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="bg-orange-200 text-black overflow-y-auto rounded-t-2xl rounded-l-0 fixed bottom-0 left-0 z-50
             w-full h-3/4 md:h-full md:w-1/2 md:rounded-l-2xl md:rounded-t-none md:static md:overflow-y-auto "
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