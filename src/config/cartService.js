// src/services/cartService.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get token from localStorage
const getToken = () => {
  const authData = localStorage.getItem("userAuth");
  if (!authData) return null;

  try {
    const parsed = JSON.parse(authData);
    return parsed.user?.token || null;
  } catch (error) {
    console.error("Failed to parse userAuth:", error);
    return null;
  }
};

// Create header with Authorization
const authHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  };
};

// API calls
const getCart = async () => {
  const res = await axios.get(`${BASE_URL}/api/cart/view`, authHeader());
  return res.data.cartItems;
};

const addToCart = async (item) => {
  const res = await axios.post(
    `${BASE_URL}/api/cart/addIn`,
    { productId: item._id, quantity: 1 }, 
    authHeader()
  );
  return res.data;
};


const updateCart = async (itemId, type) => {
  const res = await axios.patch(
    `${BASE_URL}/api/cart/updateCart/${itemId}`,
    { type },
    authHeader()
  );
  return res.data;
};

const clearCart = async () => {
  await axios.delete(`${BASE_URL}/api/cart/clear`, authHeader());
};

export default { getCart, addToCart, updateCart, clearCart };
