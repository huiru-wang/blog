import type { CollectionEntry } from "astro:content";

const getCategory = (posts: CollectionEntry<"blog">[]) => {
    let category: string[] = [];
    const filteredPosts = posts.filter(({ data }) => !data.draft);
    filteredPosts.forEach(post => {
        category.push(post.data.category);
    });

    return [...new Set(category)];
};

export default getCategory;