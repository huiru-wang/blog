"use client";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { press_start_2p } from "@/lib/fonts";
import GithubIcon from "./icons/GithubIcon";
import { motion } from "framer-motion";

// import GithubIcon from "@/public/icons/GithubIcon";
// import SignInAndOut from "./SignIn";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "DevNotes", href: "/dev-notes" },
    { name: "Blogs", href: "/blogs" },
    { name: "Travel", href: "/travel" }
];

export default function Header() {
    return (
        <motion.div
            initial={{ y: 0, x: -50, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            className="w-full m-4 flex items-center"
        >
            {/* <Avatar /> */}
            <PixelatedNavbar />
            <div className="hidden sm:block">
                <Link
                    href="https://github.com/huiru-wang/blog"
                    target="_blank"
                    className="opacity-80 hover:opacity-100"
                >
                    <GithubIcon />
                </Link>
            </div>
            <ModeToggle />
        </motion.div>
    );
}

function PixelatedNavbar() {

    return (
        <nav className={`${press_start_2p.className} flex-grow flex justify-center items-center text-[0.6rem] sm:text-[0.8rem] space-x-2 sm:space-x-12`}>
            {
                navigationItems.map(item => {
                    return (
                        <div key={item.name}>
                            <Link href={item.href}>
                                {/* <div className="nav-item text-center text-black">
                                    {item.name}
                                </div> */}
                                <button className="px-2 py-0.5 border-2 border-[var(--border)] transition duration-200 shadow-[1px_0px_var(--border),3px_3px_var(--border)] active:translate-x-1 active:translate-y-1">
                                    {item.name}
                                </button>
                            </Link>

                        </div>
                    )
                })
            }
        </nav>
    )
}