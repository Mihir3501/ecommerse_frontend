import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/order/orderHistory`, { withCredentials: true })
      .then((res) => {
        const orders = res.data;
        const order = orders.find((o) => o._id === orderId);
        setOrderDetails(order);
      })
      .catch((err) => console.error("Error loading order", err))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <Box p={5}><CircularProgress /></Box>;
  if (!orderDetails) return <Box p={5}><Typography>Order not found.</Typography></Box>;

  return (
    <Box p={5}>
      <Typography variant="h4" fontWeight="bold">Order Confirmed!</Typography>
      <Typography variant="subtitle1" mb={2}>
        Thank you for your purchase. Your order ID is <strong>{orderDetails._id}</strong>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" mb={1}>Items:</Typography>
      {orderDetails.products.map((item, index) => (
        <Box key={index} mb={1}>
          <Typography>{item.product.name} × {item.quantity}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography><strong>Total:</strong> ₹{orderDetails.totalPrice.toFixed(2)}</Typography>
    </Box>
  );
};

export default OrderSuccess;
