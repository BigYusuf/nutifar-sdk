"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import logoImage from "../assets/images/logo.svg";

const Logo = (props: { className?: string }) => {
  const router = useRouter();

  const { className } = props;
  return (
    <div>
      <Image
        onClick={() => router.push("/")}
        src={logoImage}
        alt="Nutifar logo"
        className={twMerge("cursor-pointer", className)}
      />
    </div>
  );
};

export default Logo;
