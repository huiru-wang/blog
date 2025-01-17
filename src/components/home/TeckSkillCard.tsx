import '@/styles/funcy.css';
import CSSIcon from "../icons/CSSIcon";
import HtmlIcon from "../icons/HtmlIcon";
import JavaIcon from "../icons/JavaIcon";
import JSIcon from "../icons/JSIcon";
import MongoIcon from "../icons/MongoIcon";
import MySQLIcon from "../icons/MySQLIcon";
import NextIcon from "../icons/NextIcon";
import NodeIcon from "../icons/NodeIcon";
import ReactIcon from "../icons/ReactIcon";
import RedisIcon from "../icons/RedisIcon";
import SpringIcon from "../icons/SpringIcon";
import TailwindIcon from "../icons/TailwindIcon";

export default function TeckSkillCard() {

    return (
        <div className="bg-[var(--popover)] text-[var(--popover-foreground)] opacity-80 flex flex-col w-full gap-6 px-6 py-4 shadow-[4px_4px_2px_0_var(--border)] rounded-lg ">
            <h2 className="text-lg">
                ⚙️ <span className="">Web Tech Stack</span>
            </h2>
            <div className="grid grid-cols-7 gap-4">
                <JavaIcon className="w-10 h-10" />
                <SpringIcon className="w-10 h-10" />
                <MySQLIcon className="w-10 h-10" />
                <RedisIcon className="w-10 h-10" />
                <MongoIcon className="w-10 h-10" />
                <HtmlIcon className="w-10 h-10" />
                <CSSIcon className="w-10 h-10" />
                <JSIcon className="w-10 h-10" />
                <ReactIcon className="w-10 h-10" />
                <NextIcon className="w-10 h-10" />
                <NodeIcon className="w-10 h-10" />
                <TailwindIcon className="w-10 h-10" />
            </div>
        </div>
    )
}