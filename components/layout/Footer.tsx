import Link from "next/link";
import { Container } from "../ui/Container";

const navigateLinks = [
  { label: "About", href: "#about" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Menu", href: "#menu" },
  { label: "FAQ", href: "#faq" },
];

const connectLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Email", href: "mailto:hello@loshijosdebenita.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-cream/10 py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="text-[15px] font-semibold text-cream">Los Hijos De Benita</p>
            <p className="mt-3 text-[13px] text-cream/55">Burlington, Ontario</p>
            <p className="mt-1 text-[13px] text-cream/55">Sourdough micro bakery</p>
          </div>

          <FooterColumn title="Navigate" links={navigateLinks} />
          <FooterColumn title="Connect" links={connectLinks} />
        </div>

        <p className="mt-16 text-[11px] uppercase tracking-[0.18em] text-cream/35">
          © {new Date().getFullYear()} Los Hijos De Benita
        </p>
      </Container>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] text-cream/85 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
