"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";

/**
 * Slide-in cart panel — Humanrace-style. Pinned right, fills the height,
 * shows line items with a quantity stepper, subtotal + checkout button.
 *
 * Open / close is owned by CartProvider so anywhere in the tree can trigger
 * it (Add to Bag opens, header icon opens, backdrop / Esc / Close closes).
 *
 * A11y: dialog role, modal semantics, body scroll lock (in CartProvider),
 * Esc to close, focus moves to Close on open.
 */
export function CartDrawer() {
  const {
    items,
    isOpen,
    close,
    subtotal,
    itemCount,
    increment,
    decrement,
    remove,
  } = useCart();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Esc closes
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Move focus to Close when the drawer opens
  useEffect(() => {
    if (isOpen) {
      // rAF so the transform transition has started before focus shifts
      const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <p className="text-h3 font-semibold text-ink">
            My Bag ({itemCount})
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="text-small text-ink/65 transition-colors hover:text-ink"
          >
            Close
          </button>
        </div>

        {/* Items (scrollable) */}
        <ul className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <li className="px-6 py-16 text-center text-small text-ink/50">
              Your bag is empty.
            </li>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 border-b border-ink/10 px-6 py-5"
              >
                {/* Thumbnail placeholder until product imagery is wired up */}
                <div
                  aria-hidden
                  className="h-20 w-20 flex-shrink-0 bg-ink/5"
                />

                <div className="flex flex-1 flex-col">
                  <p className="text-body font-medium text-ink">
                    {item.name}
                  </p>
                  <p className="mt-1 text-small text-ink/65">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Qty stepper — − / count / + in a thin pill */}
                    <div className="flex items-center rounded-full border border-ink/20 text-small">
                      <button
                        type="button"
                        onClick={() => decrement(item.id)}
                        aria-label={`Decrease ${item.name}`}
                        className="px-3 py-1.5 text-ink/65 transition-colors hover:text-ink"
                      >
                        −
                      </button>
                      <span className="min-w-[24px] text-center text-ink">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(item.id)}
                        aria-label={`Increase ${item.name}`}
                        className="px-3 py-1.5 text-ink/65 transition-colors hover:text-ink"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="text-small text-ink/50 transition-colors hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="border-t border-ink/10 px-6 py-6">
          <div className="flex items-baseline justify-between">
            <p className="text-body font-semibold text-ink">Subtotal</p>
            <p className="text-body text-ink">${subtotal.toFixed(2)}</p>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="mt-5 w-full rounded-full bg-ink py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-bark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
