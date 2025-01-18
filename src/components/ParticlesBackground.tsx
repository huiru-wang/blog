"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Particles from "@/components/ui/particles";

export default function ParticlesBackground() {

    const { resolvedTheme } = useTheme();

    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#2d3748");
    }, [resolvedTheme]);

    return (
        <>
            <Particles
                className="absolute inset-0 particle-z"
                quantity={50}
                staticity={50}
                ease={50}
                size={0.4}
                refresh={false}
                color={color}
                vx={0}
                vy={0}
            />
        </>
    );
}
