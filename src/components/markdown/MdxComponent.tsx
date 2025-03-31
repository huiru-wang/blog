import { LinkPreview } from "../ui/link-preview";
import BlockQuote from "./BlockQuote";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import PopupImage from "./PopupImg";
import { Mermaid } from 'mdx-mermaid/lib/Mermaid';

const components = {
    // 需要目录跳转的标签，加上id，当前只需要2级
    h1: ({ children }) => <h1 className="my-4" id={`${children}`}>{children}</h1>,
    h2: ({ children }) => <h2 className="my-4" id={`${children}`}>{children}</h2>,
    h3: ({ children }) => <h3 className="my-4" id={`${children}`}>{children}</h3>,
    h4: ({ children }) => <h4 className="my-4">{children}</h4>,
    ol: ({ children }) => <ol className="m-2 my-0">{children}</ol>,
    li: ({ children }) => <li className="m-0">{children}</li>,
    blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    mermaid: Mermaid,
    pre: ({ children }) => {
        return (<CodeBlock>{children}</CodeBlock>)
    },
    code: ({ children, className }) => {
        const match = /language-(\w+)/.exec(className || '');
        return match ? (
            <>{children}</>
        ) : (
            <InlineCode>{children}</InlineCode>
        )
    },
    a: ({ children, href }) => <LinkPreview url={href}>{children}</LinkPreview>,
    img: (props) => <PopupImage {...props} />,
}

export default components;