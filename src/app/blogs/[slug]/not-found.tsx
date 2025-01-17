import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                Post Not found
            </div>

            <Link href="/blogs">
                Return Blogs
            </Link>
        </div>
    )
}