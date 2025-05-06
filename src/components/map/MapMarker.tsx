import "@/styles/map-container.css";
import { useEffect, useState } from "react";
import MarkdownContainer from "../markdown/MarkdownContainer";
import { compileMarkdownWithTOC } from "@/lib/mdParser";
import Image from "next/image";

export function MapMarker({ iconImg, popupInfo }) {

    const [content, setContent] = useState<any>(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        async function fetchContent() {
            const { content } = await compileMarkdownWithTOC(popupInfo);
            setContent(content);
        }
        fetchContent();
    }, [popupInfo]);

    return (
        <div className="marker" onClick={() => setIsShow(!isShow)}>
            <div className="marker-image">
                <Image
                    src={iconImg}
                    alt="Marker Image"
                    width={50}
                    height={50}
                />
            </div>
            <div className="marker-pointer">
                {
                    isShow && (
                        <div className="marker-pointer">
                            <MarkdownContainer content={content} frontmatter={{}} />
                        </div>
                    )
                }
            </div>

        </div>
    );
};
