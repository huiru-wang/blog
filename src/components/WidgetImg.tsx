"use client";
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { motion } from "framer-motion"

interface WidgetImgProps {
    src: StaticImageData;
    position: 'left' | 'right';
}

const WidgetImg = ({ src, position }: WidgetImgProps) => {

    const positionClass = position === 'left' ? 'left-5' : 'right-5';

    const _x = position === 'left' ? -50 : 50;

    return (
        <motion.div
            initial={{ y: 0, x: _x, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                duration: 0.7,
                delay: 0.5,
                stiffness: 125,
            }}
            className={`hidden xl:block fixed bottom-0 ${positionClass} p-4`}>
            <Image src={src} className="w-24 h-24 object-cover" alt="Fixed Image" />
        </motion.div>
    );
};

export default WidgetImg;