"use client";

import Link from "next/link";
import Logo from "../components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-20">
      <div className="container max-w-6xl py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo className="h-8 w-auto" />

        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Nutifar
        </p>

        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>

          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
