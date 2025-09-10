import { getResourceMetadatas } from './md';

/**
 * 获取所有DevNotes文章
 * @returns 所有DevNotes文章的元数据
 */
export async function getAllDevNotesArticles() {
    const devNotesDir = process.env.DEV_NOTES_DIR!;
    const articles = await getResourceMetadatas(devNotesDir);
    return articles;
}
