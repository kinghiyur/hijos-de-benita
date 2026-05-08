import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Button } from "../ui/Button";
import { CartLink } from "../cart/CartLink";

const navItems = [
  { label: "Our Breads", href: "#menu" },
  { label: "Our Story", href: "/our-story" },
  { label: "Shop", href: "/shop" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Page header — light theme. Two rows:
 *  - top: a small "Home" page-tag, faintly visible (analogous to a
 *    breadcrumb / current-section indicator from the design)
 *  - bottom: wordmark left, primary nav + cart + Order Now button right
 *
 * Lives in normal page flow above the contained Hero banner; not overlaid.
 */
export function Header() {
  return (
    <header className="w-full">
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Page tag — quiet "Home" label per the design */}
        <p className="pt-4 text-[12px] tracking-[0.02em] text-ink/40">Home</p>

        <div className="flex items-center justify-between py-5 md:py-6">
          <Link href="/" aria-label="Los Hijos De Benita — home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-5 md:gap-7">
            <ul className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-ink/80 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <CartLink />

            <Button href="#order" variant="cream" size="sm">
              Order Now
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
