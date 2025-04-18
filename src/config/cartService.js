import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 🔐 Auth header builder
const authHeader = (token) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

// 🛒 Get cart
const getCart = async (token) => {
  const res = await axios.get(`${BASE_URL}/api/cart/view`, authHeader(token));
  return res.data.data?.items || [];
};

// ➕ Add to cart
const addToCart = async (item, token) => {
  const res = await axios.post(
    `${BASE_URL}/api/cart/addIn`,
    { productId: item._id, quantity: 1 },
    authHeader(token)
  );
  return res.data;
};

// 🔄 Update quantity
const updateCart = async (itemId, newQuantity, token) => {
  const res = await axios.patch( 
    `${BASE_URL}/api/cart/updateCart/${itemId}`,
    { quantity: newQuantity },
    authHeader(token)
  );
  return res.data;
};


const clearCart = async (token) => {
  await axios.delete(`${BASE_URL}/api/cart/clear`, authHeader(token));
};

export default { getCart, addToCart, updateCart, clearCart };
