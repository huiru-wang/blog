import { NextRequest } from 'next/server';
import { getDevNotesMetadatas, getFileContent } from '@/lib/md';

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const searchParams = url.searchParams;
    const action = searchParams.get('action');
    if (action === 'BLOG_METADATA') {
        const devNotesList = await getDevNotesMetadatas(process.env.DEV_NOTES_DIR!);
        return new Response(JSON.stringify({ devNotesList: devNotesList }), { status: 200 });
    } else {
        const slug = searchParams.get('slug');
        if (!slug) {
            return new Response(JSON.stringify({ content: null }), { status: 400 });
        }
        const content = await getFileContent(slug, process.env.DEV_NOTES_DIR!);
        return new Response(JSON.stringify({ content: content }), { status: 200 });
    }
}