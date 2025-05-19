'use client';
import { MetaInfo } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";

interface TagPanelProps {
    metaInfo: MetaInfo;
    onFilter: (category: string, tag: string) => void;
}

export default function TagPanel({ metaInfo, onFilter }: TagPanelProps) {

    const [selectedTag, setSelectedTag] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');

    // 触发过滤事件
    const selected = (category: string, tag?: string) => {

        if (isClear(category, tag)) {
            onFilter("", "");
            setSelectedTag("");
            setSelectedCategory("");
        } else {
            onFilter(category, tag || "");
            if (tag) setSelectedTag(tag);
            setSelectedCategory(category);
        }
    }

    // 判断是否清除
    const isClear = (category: string, tag?: string) => {
        if (category && !tag && selectedCategory === category) {
            return true;
        }
        if (category && tag && selectedCategory === category && selectedTag === tag) {
            return true;
        }
        return false;
    }

    return (
        <motion.div
            initial={{ y: 0, x: -50, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            className="mb-4 mx-4 sm:mx-0"
        >
            {metaInfo?.categories?.map((category, index) => (
                <div className="flex gap-4 m-2" key={index}>
                    <div
                        className={`font-bold hidden lg:block border w-36 h-7 text-center cursor-pointer ${category.name === selectedCategory ? 'shadow-[5px_5px_2px_0_var(--border)]' : ''}`}
                        onClick={() => selected(category.name, "")}
                    >
                        {category.name}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 ">
                        {
                            category.tags?.map((tag, index) => (
                                <div
                                    key={index}
                                    className={`underline cursor-pointer text-sm sm:text-xl ${category.name === selectedCategory && tag === selectedTag ? 'text-[var(--tag-selected)]' : ''}`}
                                    onClick={() => selected(category.name, tag)}
                                >
                                    #{tag}
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </motion.div>
    );
}