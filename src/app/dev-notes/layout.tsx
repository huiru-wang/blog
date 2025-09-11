import ParticlesBackground from "@/components/ParticlesBackground";
import { ArticlesProvider } from "@/contexts/ArticlesContext";
import { getAllDevNotesArticles } from "@/lib/getDevNotesArticles";

export default async function Layout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    // 服务端预加载所有文章元数据
    const articles = await getAllDevNotesArticles();

    return (
        <>
            <ParticlesBackground />
            <div className="mx-auto max-w-1xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl min-h-svh">
                <ArticlesProvider articles={articles}>
                    {children}
                </ArticlesProvider>
            </div>
        </>
    );
}