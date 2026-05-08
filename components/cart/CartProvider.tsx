"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  /** Stable identifier (using bread name for now since they're unique). */
  id: string;
  name: string;
  /** Dollars, as a number — formatting happens at the edge. */
  price: number;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  /** Sum of quantities across all line items. */
  itemCount: number;
  subtotal: number;

  /** Drawer visibility — opening side-effect of `add`, also user-controlled. */
  isOpen: boolean;
  open: () => void;
  close: () => void;

  add: (item: Omit<CartItem, "qty">) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

// Bumped from v1 — schema changed (price string→number, added qty).
const STORAGE_KEY = "lhdb-cart-v2";
const CartContext = createContext<CartContextValue | null>(null);

/**
 * Cart + drawer state for the whole app. Persists items in localStorage,
 * locks body scroll while the drawer is open, exposes a small mutator API
 * (add / inc / dec / remove / clear) plus visibility controls (open/close).
 *
 * SSR note: items hydrate from localStorage in an effect after mount, so the
 * first paint is always an empty cart. The cart icon in the header therefore
 * appears *after* hydration on a fresh load — preferable to a flash of stale
 * state.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
      }
    } catch {
      /* localStorage unavailable or malformed — ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota / private mode — ignore */
    }
  }, [items]);

  // Body scroll lock while the drawer is open. Restore previous value on close
  // rather than blindly clearing, so we don't fight any other scroll-lock owner.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        if (i.qty <= 1) return []; // hitting − at qty 1 removes the line
        return [{ ...i, qty: i.qty - 1 }];
      }),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      open,
      close,
      add,
      increment,
      decrement,
      remove,
      clear,
    };
  }, [items, isOpen, open, close, add, increment, decrement, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
