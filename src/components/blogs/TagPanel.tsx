'use client';
import { Frontmatter } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";

interface TagPanelProps {
    frontmatters: Frontmatter[];
    onFilter: (category: string, tag: string) => void;
}

export default function TagPanel({ frontmatters, onFilter }: TagPanelProps) {

    const [selectedTag, setSelectedTag] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');

    const groupedByCategory = frontmatters.reduce((acc, frontmatter) => {
        const { category, tags } = frontmatter;
        if (category) {
            if (!acc[category]) {
                acc[category] = new Set<string>();
            }
            if (tags) {
                tags.forEach(tag => acc[category].add(tag));
            }
        }
        return acc;
    }, {} as Record<string, Set<string>>);

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
            className="mb-8">

            {Object.entries(groupedByCategory).map(([category, tags]) => (
                <div className="flex gap-4 m-2" key={category}>
                    <div
                        className={`font-bold hidden lg:block border w-36 h-7 text-center cursor-pointer ${category === selectedCategory ? 'shadow-[5px_5px_2px_0_var(--border)]' : ''}`}
                        onClick={() => selected(category, "")}
                    >
                        {category}
                    </div>

                    <div className="flex flex-wrap gap-4 ">
                        {
                            [...tags].map((tag) => (
                                <div
                                    key={tag}
                                    className={`underline cursor-pointer text-xl ${category === selectedCategory && tag === selectedTag ? 'text-shadow' : ''}`}
                                    onClick={() => selected(category, tag)}
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