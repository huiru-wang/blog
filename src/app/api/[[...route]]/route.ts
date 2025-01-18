import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

const blogParentDir = process.env.BLOG_DIR || "posts";

const separator = path.sep;

const mdxBaseDir = path.join(process.cwd(), blogParentDir);

const blogMap = new Map();

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const searchParams = url.searchParams;
    const slug = searchParams.get('slug');
    if (!slug) {
        return new Response(JSON.stringify({ data: null, message: "slug not found" }), { status: 400 });
    }
    let postMdxContent;
    if (blogMap.has(slug)) {
        postMdxContent = blogMap.get(slug);
        console.log(`blogMap has slug: ${slug}`)
    } else {
        console.log(`blogMap cache missed slug: ${slug}`)
        const decodedSlug = decodeURIComponent(slug);
        const pathSegment = decodedSlug?.split('_');
        const targetMdx = pathSegment.join(separator);
        const targetMdxPath = path.join(mdxBaseDir, `${targetMdx}`);
        if (!fs.existsSync(targetMdxPath)) {
            throw new Error(`Server File not found: ${targetMdxPath}`);
        }
        postMdxContent = fs.readFileSync(targetMdxPath, 'utf8');
        blogMap.set(slug, postMdxContent);
    }
    return new Response(postMdxContent, { status: 200 });
}
