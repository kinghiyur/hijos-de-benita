import type { Metadata } from "next";
import { sohne } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Los Hijos De Benita — Sourdough micro bakery, Burlington",
  description:
    "Naturally leavened sourdough, baked weekly in Burlington, Ontario. The kind of bread your abuela would respect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sohne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream font-sans">
        {children}
      </body>
    </html>
  );
}
