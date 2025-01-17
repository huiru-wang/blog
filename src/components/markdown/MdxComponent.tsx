import { LinkPreview } from "../ui/link-preview";
import BlockQuote from "./BlockQuote";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import PopupImage from "./PopupImg";

const components = {
    // 需要目录跳转的标签，加上id，当前只需要2级
    h1: (props) => <h1 className="my-4" id={`${props.children}`}>{props.children}</h1>,
    h2: (props) => <h2 className="my-4" id={`${props.children}`}>{props.children}</h2>,
    h3: (props) => <h3 className="my-4" id={`${props.children}`}>{props.children}</h3>,
    h4: (props) => <h4 className="my-4">{props.children}</h4>,
    ol: (props) => <ol className="m-2 my-0">{props.children}</ol>,
    li: (props) => <li className="m-0">{props.children}</li>,
    img: (props) => <PopupImage {...props} />,
    blockquote: (props) => <BlockQuote>{props.children}</BlockQuote>,
    pre: (props) => <CodeBlock>{props.children}</CodeBlock>,
    code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
            <>{children}</>
        ) : (
            <InlineCode>{children}</InlineCode>
        )
    },
    a: (props) => <LinkPreview url={props.href}>{props.children}</LinkPreview>
}

export default components;