import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "../providers/query-provider";

// @ts-ignore: side-effect import of CSS module without type declarations
import "./global.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Nutifar - Web SDK Example",
  description: "Nutifar Web SDK example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
