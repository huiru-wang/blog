import ParticlesBackground from "@/components/ParticlesBackground";

export default function Layout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ParticlesBackground />
            <div className="mx-auto max-w-1xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl min-h-svh">{children}</div>
        </>
    );
}