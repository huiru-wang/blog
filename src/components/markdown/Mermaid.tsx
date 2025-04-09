"use client";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
    code: string;
};

const Mermaid = ({ code }: Props) => {
    const { theme } = useTheme();
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const renderMermaid = async () => {
            try {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: theme === "dark" ? "dark" : "base",
                    fontSize: 28,
                });
                const result = await mermaid.render("graphDiv", code);
                setSvg(result.svg);
                setError(null);
            } catch (err) {
                console.error("Mermaid rendering error:", err);
                setError("Failed to render Mermaid diagram.");
            } finally {
                setIsLoading(false);
            }
        };

        renderMermaid();
    }, [code, theme]);

    if (isLoading) {
        return <div className="items-center justify-center text-red-300">Loading Mermaid Chart...</div>;
    }

    if (error) {
        return <div className="text-red-300">{error}</div>;
    }

    return (
        <div
            className={`${svg === "" ? "hidden" : "block"}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
    );
};

export default Mermaid;