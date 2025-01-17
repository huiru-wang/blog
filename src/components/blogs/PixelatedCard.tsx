import Link from "next/link";

const descriptionStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

export default function PixelatedCard({ slug, frontmatter }) {

    const { title, description, publishedAt } = frontmatter;

    return (
        <Link href={`/blogs/${slug}`}>
            <div className="pixel-card relative p-4 cursor-pointer h-32 sm:w-[500px]">
                <h2 className="text-xl font-bold truncate mb-2">{title}</h2>
                <p className="text-sm" style={descriptionStyle}>{description}</p>
                <time className="absolute bottom-3 block mt-2 text-xs">{publishedAt}</time>
            </div>
        </Link>
    )
}