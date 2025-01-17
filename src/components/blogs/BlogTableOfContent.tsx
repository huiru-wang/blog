'use client';

/**
 * 将解析的markdown嵌套目录渲染为有层级关系的组件
 * @param toc 嵌套目录
 * @returns 目录组件
 */
export default function BlogTableOfContent(toc) {

    return (
        <div className="hidden min-w-64 max-w-80 2xl:block fixed right-14 top-28 p-4 border border-gray-200 rounded shadow-[4px_4px_0_0_var(--border)]">
            <nav>
                <h2 className="text-center text-base font-bold mb-2">Table of Contents</h2>
                <TableOfContent props={toc.toc} />
            </nav>
        </div>
    );
}

function TableOfContent({ props }) {
    switch (props.tagName) {
        case "nav":
            return (
                <nav {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </nav>
            );
        case "ol":
            return (
                <ol {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </ol>
            );
        case "ul":
            return (
                <ul {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </ul>
            );
        case "li":
            return (
                <li {...props.properties}>
                    {props.children.map((item, index) => (
                        <TableOfContent key={index} props={item} />
                    ))}
                </li>
            );
        case "a":
            return (
                <>
                    {props.children.map((item, index) => {
                        const header = item.value;
                        return (
                            <a key={index} href={`#${header}`} className="block whitespace-nowrap overflow-hidden text-ellipsis">
                                {header}
                            </a>
                        );
                    })}
                </>
            );
        default:
            return null;
    }
}