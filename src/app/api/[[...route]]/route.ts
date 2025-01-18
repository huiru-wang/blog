import { NextRequest } from 'next/server';
import { getBlogContent, getBlogMetadatas } from '@/lib/md';

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const searchParams = url.searchParams;
    const action = searchParams.get('action');
    if (action === 'BLOG_METADATA') {
        const blogList = await getBlogMetadatas();
        return new Response(JSON.stringify({ blogList: blogList }), { status: 200 });
    } else {
        const slug = searchParams.get('slug');
        if (!slug) {
            return new Response(JSON.stringify({ content: null }), { status: 400 });
        }
        const content = await getBlogContent(slug);
        return new Response(JSON.stringify({ content: content }), { status: 200 });
    }
}