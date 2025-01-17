import React from 'react';
import Link from 'next/link';
import BlurFade from '../ui/blur-fade';

interface ProjectModalProps {
    redirect: string;
    img: string;
    title: string;
    description: string;
}

export default function ProjectModal({ redirect, img, title, description }: ProjectModalProps) {

    return (
        <BlurFade
            delay={0.2}
            inView
        >
            <div className="flex flex-col bg-[var(--project)] text-black border-4 border-[var(--border)] shadow-[4px_4px_2px_0_var(--border)]">
                <div className="relative p-2 border-b-4 border-black font-semibold text-center">
                    <div className="absolute top-0.5 flex items-center mt-2">
                        <div className="w-5 h-5 mr-2 border-4 border-black bg-orange-300 rounded-full"></div>
                        <div className="w-5 h-5 mr-2 border-4 border-black bg-green-500 rounded-full"></div>
                        <div className="w-5 h-5 mr-2 border-4 border-black bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex-center">
                        <div>{title}</div>
                    </div>
                </div>
                <div
                    className="w-full h-40 flex items-end border-b-5 border-[var(--border)] bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url('${img}')` }}
                ></div>
                <div className="flex flex-col justify-between items-start flex-1 p-6">
                    <p className='h-[6em] overflow-hidden overflow-ellipsis break-words overflow-y-auto line-clamp-3'>
                        {description}
                    </p>
                    <Link
                        className="border-4 border-black p-2 mt-4 hover:bg-black hover:text-white"
                        href={redirect}
                    >
                        View project
                    </Link>
                </div>
            </div>
        </BlurFade>

    );
};