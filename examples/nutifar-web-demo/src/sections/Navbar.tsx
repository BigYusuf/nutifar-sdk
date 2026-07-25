"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Logo from "../components/Logo";

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Examples", href: "/examples" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <header className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800">
        <div className="container max-w-6xl h-16 flex items-center justify-between">
          <Logo className="h-8 w-auto" />

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        </div>
      </header>
    </>
  );
}
