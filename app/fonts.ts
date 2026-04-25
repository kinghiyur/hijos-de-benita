import localFont from "next/font/local";

// Söhne (Test) — brand sans. Five weights mapped from Klim's standard scale.
// Leicht 300 · Buch 400 · Kräftig 500 · Halbfett 600 · Fett 800
export const sohne = localFont({
  src: [
    { path: "../public/fonts/Sohne-Leicht.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/Sohne-Buch.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Sohne-Kraftig.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/Sohne-Halbfett.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Sohne-Fett.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-sohne",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});
