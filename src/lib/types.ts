import { JSXElementConstructor, ReactElement } from "react";

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
    travelMarkers: TravelMarker[];
}

export type Category = {
    name: string;
    tags: string[];
}

export type TravelMarkerContentBlock =
    | { type: "text"; text: string }
    | { type: "image"; src: string; caption?: string };

export type TravelMarker = {
    title: string;
    SOC: string;
    city: string;
    depth: number;
    position: [number, number];
    zooms: number[];
    iconImg: string;
    logFile?: string;
    travelLog?: ReactElement<unknown, string | JSXElementConstructor<any>>;
    content?: TravelMarkerContentBlock[];
}
