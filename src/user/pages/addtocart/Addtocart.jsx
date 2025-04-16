// src/pages/addtocart/Addtocart.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Typography, CardMedia, IconButton, Button, Divider,
  Radio, RadioGroup, FormControlLabel,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {
  fetchCartItems,
  updateQuantityAsync,
  clearCartAsync,
} from "../../../redux/createSlice";
import cartService from "../../../config/cartService";

const Addtocart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [shipping, setShipping] = useState("flat");

  const shippingCost = shipping === "flat" ? 30 : 0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleQuantityChange = (itemId, type) => {
    dispatch(updateQuantityAsync({ itemId, type }));
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h6">Your Cart Is Currently Empty</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/categories")}>
          Return to Shop
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, maxWidth: "1450px", mx: "auto" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Shopping Cart
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={6}
          alignItems="flex-start"
        >
          {/* Left - Product List */}
          <Box flex={2}>
            <Box
              display="flex"
              fontWeight="bold"
              pb={1}
              borderBottom="2px solid #ccc"
              color="gray"
            >
              <Box width="50%">Product</Box>
              <Box width="25%">Quantity</Box>
              <Box width="25%">Subtotal</Box>
            </Box>

            {cartItems.map((item) => (
              <Box
                key={item._id}
                display="flex"
                alignItems="center"
                py={3}
                borderBottom="1px solid #eee"
              >
                <Box width="50%" display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    image={item.images[0]}
                    alt={item.name}
                    sx={{
                      width: 90,
                      height: 110,
                      objectFit: "cover",
                      borderRadius: 2,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      PRADA
                    </Typography>
                    <Typography variant="body2" mt={0.5}>
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  width="25%"
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                >
                  <IconButton
                    onClick={() => handleQuantityChange(item._id, "decrease")}
                    sx={{ border: "1px solid #ccc", p: 0.5 }}
                  >
                    <Remove />
                  </IconButton>
                  <Typography fontWeight="bold">{item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(item._id, "increase")}
                    sx={{ border: "1px solid #ccc", p: 0.5 }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <Box width="25%">
                  <Typography fontWeight="bold" color="primary">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Right - Summary */}
          <Box
            flex={1}
            border="1px solid #ddd"
            borderRadius={3}
            p={3}
            boxShadow={2}
            sx={{
              position: { md: "sticky" },
              top: 100,
              minWidth: "300px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography fontWeight="bold" fontSize="16px">
                COUPON CODE
              </Typography>
              <Button size="small" variant="outlined">
                +
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal</Typography>
              <Typography>₹{subtotal.toFixed(2)}</Typography>
            </Box>

            <Box mt={2}>
              <Typography fontWeight="bold" mb={1}>Shipping</Typography>
              <RadioGroup value={shipping} onChange={(e) => setShipping(e.target.value)}>
                <FormControlLabel value="flat" control={<Radio />} label="Flat rate: ₹30.00" />
                <FormControlLabel value="pickup" control={<Radio />} label="Local pickup" />
              </RadioGroup>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              fontWeight="bold"
              mb={2}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">₹{total.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              onClick={() => alert("Proceed to Payment")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Addtocart;
