// src/services/cartService.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getCart = async () => {
  const res = await axios.get(`${BASE_URL}/api/cart/view`, {
    withCredentials: true,
  });
  return res.data.cartItems;
};

const addToCart = async (item) => {
  const res = await axios.post(`${BASE_URL}/api/cart/addIn`, item, {
    withCredentials: true,
  });
  return res.data;
};

const updateCart = async (itemId, type) => {
  const res = await axios.patch(
    `${BASE_URL}/api/cart/updateCart/${itemId}`,
    { type },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const clearCart = async () => {
  await axios.delete(`${BASE_URL}/api/cart/clear`, {
    withCredentials: true,
  });
};

export default { getCart, addToCart, updateCart, clearCart };
