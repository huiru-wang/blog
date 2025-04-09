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

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: theme === "dark" ? "dark" : "default",
        });
        mermaid.render("graphDiv", code).then((result) => {
            setSvg(result.svg);
        });
    }, [code, theme]);

    return (
        <div
            className={`${svg === "" ? "hidden" : "block"}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
    );
};

export default Mermaid;