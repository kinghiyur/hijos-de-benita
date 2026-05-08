import type { Metadata } from "next";
import { sohne, greatVibes } from "./fonts";
import { CartProvider } from "../components/cart/CartProvider";
import { CartDrawer } from "../components/cart/CartDrawer";
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
      className={`${sohne.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
