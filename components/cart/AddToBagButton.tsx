"use client";

import { useCart, type CartItem } from "./CartProvider";

interface AddToBagButtonProps {
  item: Omit<CartItem, "qty">;
  className?: string;
}

/**
 * "Add to Bag" pill — adds the item to the cart and opens the side drawer.
 * Compact, always-visible variant for the redesigned breads grid.
 */
export function AddToBagButton({ item, className = "" }: AddToBagButtonProps) {
  const { add, open } = useCart();

  const handleClick = () => {
    add(item);
    open();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold text-paper transition-colors hover:bg-bark ${className}`}
    >
      Add to Bag
    </button>
  );
}
