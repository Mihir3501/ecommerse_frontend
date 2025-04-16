import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../config/cartService";

// Thunk: Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    try {
      const data = await cartService.getCart();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk: Add item to cart via API
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (item, thunkAPI) => {
    try {
      const data = await cartService.addToCart(item);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk: Update quantity
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async ({ itemId, type }, thunkAPI) => {
    try {
      await cartService.updateCart(itemId, type);
      return { id: itemId, type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk: Clear cart
export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, thunkAPI) => {
    try {
      await cartService.clearCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
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
    addToCartLocal: (state, action) => {
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
      const item = state.items.find(i => i._id === id);
      if (item) {
        if (type === "increase") {
          item.quantity += 1;
        } else if (type === "decrease") {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            state.items = state.items.filter(i => i._id !== id);
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
      // Fetch Cart
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || []; // Safe fallback
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const item = action.payload;
        const existing = state.items.find(i => i._id === item._id);
        if (existing) {
          existing.quantity = item.quantity;
        } else {
          state.items.push(item);
        }
      })

      // Update Quantity
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const { id, type } = action.payload;
        const item = state.items.find(i => i._id === id);
        if (item) {
          if (type === "increase") {
            item.quantity += 1;
          } else if (type === "decrease") {
            item.quantity -= 1;
            if (item.quantity <= 0) {
              state.items = state.items.filter(i => i._id !== id);
            }
          }
        }
      })

      // Clear Cart
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const {
  addToCartLocal,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
