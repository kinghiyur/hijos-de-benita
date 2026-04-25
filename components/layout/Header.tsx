import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Button } from "../ui/Button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Menu", href: "#menu" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Header overlays the hero — transparent bg, cream type, minimal chrome.
 * Sticky-ish placement is left to the parent (Hero positions it absolutely).
 */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-16">
        <Link href="/" className="text-[11px] tracking-[0.02em]">
          <Wordmark className="text-[13px] md:text-[14px]" />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-6 md:gap-10">
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/85 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="#order" variant="cream" size="sm">
            Order Now
          </Button>
        </nav>
      </div>
    </header>
  );
}
