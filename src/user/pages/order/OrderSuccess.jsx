import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrderHistory } from "../../../config/orderService"; // 👈 import the API

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.user?.user?.token);

  useEffect(() => {
    if (!token) return;

    getOrderHistory(token)
      .then((orders) => {
        console.log("Orders from API:", orders);
        console.log("Searching for orderId:", orderId);
        const order = orders.find((o) => o.id === orderId);
        console.log("Found order:", order);
        if (order) {
          setOrderDetails(order);  // set order if found
        } else {
          setOrderDetails(null);  // explicitly set to null if no order found
        }
      })
      .catch((err) => {
        console.error("Error loading order", err);
        setOrderDetails(null); // set to null if there's an error
      })
      .finally(() => setLoading(false)); // Ensure loading is false when done
  }, [orderId, token]);

  if (loading) return <Box p={5}><CircularProgress /></Box>;
  if (!orderDetails) return <Box p={5}><Typography>Order not found.</Typography></Box>;

  return (
    <Box p={5}>
      <Typography variant="h4" fontWeight="bold">Order Confirmed!</Typography>
      <Typography variant="subtitle1" mb={2}>
        Thank you for your purchase. Your order ID is <strong>{orderDetails.id}</strong>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" mb={1}>Items:</Typography>
      {orderDetails.items.map((item, index) => (
        <Box key={index} mb={1}>
          <Typography>{item.name} × {item.quantity}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography><strong>Total:</strong> ₹{orderDetails.totalAmount.toFixed(2)}</Typography>
    </Box>
  );
};

export default OrderSuccess;
