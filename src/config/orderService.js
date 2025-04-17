// services/orderService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${BASE_URL}/api/order/checkout`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};
