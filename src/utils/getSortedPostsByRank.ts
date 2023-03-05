import type { CollectionEntry } from "astro:content";

const getSortedPostsByRank = (posts: CollectionEntry<"blog">[]) =>
  posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        a.data.rank - b.data.rank
    );

export default getSortedPostsByRank;
