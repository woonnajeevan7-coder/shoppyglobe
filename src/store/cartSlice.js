import { createSlice } from '@reduxjs/toolkit';

// ── LocalStorage helpers ──────────────────────────────
const STORAGE_KEY = 'shoppyglobe_cart';

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* silent */ }
};

// ── Slice ─────────────────────────────────────────────
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    isOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCart(state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCart(state.items);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        const item = state.items.find((i) => i.id === id);
        if (item) item.quantity = quantity;
      }
      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveCart([]);
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    closeCart(state) {
      state.isOpen = false;
    },
  },
});

// ── Selectors ─────────────────────────────────────────
export const selectCartItems    = (state) => state.cart.items;
export const selectCartOpen     = (state) => state.cart.isOpen;
export const selectCartCount    = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal    = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const {
  addToCart, removeFromCart, updateQuantity,
  clearCart, toggleCart, closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
