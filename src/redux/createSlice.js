import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i._id === item._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const itemIndex = state.items.findIndex(i => i._id === id);

      if (itemIndex !== -1) {
        if (type === "increase") {
          state.items[itemIndex].quantity += 1;
        } else if (type === "decrease") {
          state.items[itemIndex].quantity -= 1;

          // Auto-remove if quantity hits 0
          if (state.items[itemIndex].quantity <= 0) {
            state.items.splice(itemIndex, 1);
          }
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
