import { StaticImageData } from "next/image";

export type Frontmatter = {
    title: string;
    category: string;
    tags: string[];
    keywords?: string;
    publishedAt?: string;
    description?: string;
}

export interface Event {
    id: number
    date: Date
    title: string
    content: string
}

export type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: StaticImageData;
};