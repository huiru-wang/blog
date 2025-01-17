"use client";
import { useState } from "react";

export default function PopupImage({ src, alt }) {

    const [showImage, setShowImage] = useState(false);

    const togglePreview = () => {
        setShowImage(!showImage);
    };

    return (
        <>
            <img
                src={src}
                alt={alt}
                className="cursor-pointer border border-[var(--border)] shadow-[2px_2px_2px_0_var(--border)] "
                onClick={togglePreview}
            />

            {showImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
                    onClick={togglePreview}
                >
                    <div className="max-w-[90vw] max-h-[90vh]">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}