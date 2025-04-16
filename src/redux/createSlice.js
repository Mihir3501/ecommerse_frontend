import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../config/cartService";

// Thunks for async API calls
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    try {
      const data = await cartService.getCart();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async ({ id, type }, thunkAPI) => {
    try {
      await cartService.updateCart(id, type);
      return { id, type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, thunkAPI) => {
    try {
      await cartService.clearCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const { id, type } = action.payload;
        const item = state.items.find((i) => i._id === id);
        if (item) {
          if (type === "increase") {
            item.quantity += 1;
          } else if (type === "decrease") {
            item.quantity -= 1;
            if (item.quantity <= 0) {
              state.items = state.items.filter((i) => i._id !== id);
            }
          }
        }
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
