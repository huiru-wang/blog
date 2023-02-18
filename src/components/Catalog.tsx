import "./index.css";
export type Headings = {
    headings: Heading[];
};

export type Heading = {
    depth: number;
    slug: string;
    text: string;
};

export default function Catalog({ headings }: Headings) {
    <div className="catalog-card">
        <ul>
            {
                headings.map((head, index) => {
                    return (
                        <li key={index}>
                            <a href={"#" + head.slug}>
                                {head.slug}
                            </a>
                        </li>
                    );
                })
            }
        </ul>
    </div>;
}
