'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const imgFileNameList = ["1", "2", "3", "4", "5", "6"];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imgFileNameList.length);
    const imgFileName = imgFileNameList[randomIndex] + ".png";
    return `/widgets/${imgFileName}`;
};

const BackTop = () => {

    const [imgPath, setImgPath] = useState("/widgets/3.png");

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setImgPath(getRandomImage());
    };

    return (
        <div className="fixed bottom-0 right-0 p-4 hidden lg:block pixel-cursor-pointer">
            <Image
                src={imgPath}
                className="cursor-pointer"
                alt="Avatar"
                height={80}
                width={80}
                onClick={scrollToTop}
            />
        </div>
    );
};

export default BackTop;