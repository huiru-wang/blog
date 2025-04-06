export type Frontmatter = {
    title: string;
    category: string;
    tags: string[];
    keywords?: string;
    publishedAt?: string;
    description?: string;
    coverImageUrl?: string;
}

export type MetaInfo = {
    categories: Category[];
}

export type Category = {
    name: string;
    tags: string[];
}