"use client";

import { useCart } from "./CartProvider";

/**
 * Header bag/cart trigger — only renders once at least one item has been
 * added. Clicking it opens the side drawer (no navigation).
 */
export function CartLink() {
  const { itemCount, open } = useCart();

  if (itemCount === 0) return null;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Cart (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
      className="relative text-ink/80 transition-colors hover:text-ink"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8a3 3 0 1 1 6 0" />
      </svg>
      {itemCount > 1 && (
        <span
          aria-hidden
          className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-paper"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
