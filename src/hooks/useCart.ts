import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  name_en: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = "np_veshalka_cart_v1";

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setCartStorage(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: {
  id: string;
  name: string;
  name_en: string;
  price: number;
  image: string;
}) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  setCartStorage(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((item) => item.id !== id);
  setCartStorage(cart);
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(id);
    return;
  }
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity = quantity;
    setCartStorage(cart);
  }
}

export function clearCart() {
  setCartStorage([]);
}

export function useCart() {
  const [cart, setCartState] = useState<CartItem[]>(getCart());

  useEffect(() => {
    const onUpdate = () => setCartState(getCart());
    window.addEventListener("cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    count,
    total,
    addItem: (product: Parameters<typeof addToCart>[0]) => {
      addToCart(product);
      setCartState(getCart());
    },
    removeItem: (id: string) => {
      removeFromCart(id);
      setCartState(getCart());
    },
    updateItemQuantity: (id: string, qty: number) => {
      updateQuantity(id, qty);
      setCartState(getCart());
    },
    clearAll: () => {
      clearCart();
      setCartState(getCart());
    },
  };
}