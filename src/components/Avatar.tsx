"use client";
import Image from "next/image";
import avatarImg from "@/public/widgets/avatar.webp";

export default function Avatar() {
  return (
    <div className="hidden sm:block">
      <Image
        src={avatarImg}
        width={50}
        height={50}
        alt="avatar"
        className={`duration-500 rounded-full hover:opacity-90`}
        unoptimized
      />
    </div>
  );
}
