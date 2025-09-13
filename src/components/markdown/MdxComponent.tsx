import { LinkPreview } from "../ui/link-preview";
import BlockQuote from "./BlockQuote";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import Mermaid from "./Mermaid";
import PopupImage from "./PopupImg";

const components = {
    // 需要目录跳转的标签，加上id，当前只需要2级，为了目录能够跳转到指定位置
    h1: ({ children }) => <h1 className="my-4" id={`${children}`}>{children}</h1>,
    h2: ({ children }) => <h2 className="my-4" id={`${children}`}>{children}</h2>,
    h3: ({ children }) => <h3 className="my-4" id={`${children}`}>{children}</h3>,
    h4: ({ children }) => <h4 className="my-4">{children}</h4>,
    ol: ({ children }) => <ol className="m-2 my-0">{children}</ol>,
    li: ({ children }) => <li className="m-0">{children}</li>,
    blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    pre: ({ children }) => {
        // 监测到是mermaid代码块，则渲染mermaid图表
        const lang = children.props.className || "";
        if (lang.includes("language-mermaid")) {
            const chart = parseMermaidToText(children);
            return <Mermaid code={chart} />;
        } else {
            return <CodeBlock>{children}</CodeBlock>;
        }
    },
    code: ({ children, className }) => {
        // 区分是代码块还是行内代码
        const match = /language-(\w+)/.exec(className || '');
        return match ? (
            <>{children}</>
        ) : (
            <InlineCode>{children}</InlineCode>
        )
    },
    // 鼠标悬浮链接预览组件
    a: ({ children, href }) => <LinkPreview url={href}>{children}</LinkPreview>,
    // 图片组件，点击能够放大
    img: (props) => <PopupImage {...props} />,
}

const parseMermaidToText = (children) => {
    const charSnippetList: string[] = [];
    const items = children.props.children;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const codeSnippets = item.props.children;
        for (let i = 0; i < codeSnippets.length; i++) {
            const code = codeSnippets[i];
            if (typeof code === "string") {
                charSnippetList.push(code);
            } else if (typeof code === "object" && code !== null && "props" in code) {
                charSnippetList.push(code.props.children);
            }
        }
    }
    return charSnippetList.join('');
}

export default components;