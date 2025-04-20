import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { fetchCartItems, updateQuantityAsync } from "../../../redux/createSlice";
import { createOrder } from "../../../config/orderService";

const AddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.user.token);

  const [shipping, setShipping] = useState("flat");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const shippingCost = shipping === "flat" ? 30 : 0;

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
        const price = item?.product?.price ?? 0;
        const quantity = item?.quantity ?? 1;
        return sum + price * quantity;
      }, 0)
    : 0;

  const total = subtotal + shippingCost;

  const handleQuantityChange = (productId, currentQuantity, type) => {
    let newQuantity = type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity < 1) newQuantity = 1;
  
    // 🔄 Use productId instead of cart item ID
    dispatch(updateQuantityAsync({ productId, quantity: newQuantity }));
  };
  

  // const handleCheckout = async () => {
  //   const { street, city, state, postalCode } = shippingAddress;
  //   if (!street || !city || !state || !postalCode) {
  //     alert("Please fill in your complete shipping address.");
  //     return;
  //   }

  //   const formattedItems = cartItems.map((item) => ({
  //     productId: item?.product?._id,
  //     quantity: item.quantity,
  //   }));

  //   const orderData = {
  //     items: formattedItems,
  //     shippingType: shipping,
  //     shippingAddress,
  //     total,
  //   };

  //   try {
  //     const response = await createOrder(orderData, token);
  //     const orderId = response?.order?.id || response?.order?._id;
  //     if (orderId) {
  //       navigate(`/ordersuccess/${orderId}`);
  //     } else {
  //       alert("Something went wrong while placing your order.");
  //     }
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //     alert("An error occurred during checkout.");
  //   }
  // };
  const handleCheckout = async () => {
    const { street, city, state, postalCode } = shippingAddress;
    if (!street || !city || !state || !postalCode) {
      alert("Please fill in your complete shipping address.");
      return;
    }
  
    const formattedItems = cartItems.map((item) => ({
      productId: item?.product?._id,
      quantity: item.quantity,
    }));
  
    const orderData = {
      items: formattedItems,
      shippingType: shipping,
      shippingAddress,
      total,
    };
  
    try {
      const response = await createOrder(orderData, token);
      const orderId = response?.order?.id || response?.order?._id;
      if (orderId) {
        console.log("Navigating to:", `/ordersuccess/${orderId}`);
        navigate(`/ordersuccess/${orderId}`);
      } else {
        alert("Something went wrong while placing your order.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    }
  };

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h6">Your Cart Is Currently Empty</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/#ishika")}
          >
            Return to Shop
          </Button>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, maxWidth: "1450px", mx: "auto" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Shopping Cart
        </Typography>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={6}>
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

            {cartItems.map((item) => {
              const product = item?.product || {};
              const imageUrl = product?.images?.[0]
                ? `${import.meta.env.VITE_BASE_URL}${product.images[0]}`
                : "./18505047_SL-070720-32260-21.svg";
              const name = product?.name || "Unnamed Product";
              const quantity = item?.quantity ?? 1;
              const price = product?.price ?? 0;
              const subtotalPerItem = price * quantity;

              return (
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
                      image={imageUrl}
                      alt={name}
                      sx={{
                        width: 90,
                        height: 110,
                        objectFit: "cover",
                        borderRadius: 2,
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography fontWeight="bold">{name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        PRADA
                      </Typography>
                      <Typography variant="body2" mt={0.5}>
                        ₹{price.toFixed(2)} × {quantity}
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
  onClick={() => handleQuantityChange(product._id, quantity, "decrease")}
>
  <Remove />
</IconButton>

                    <Typography fontWeight="bold">{quantity}</Typography>

                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item._id, quantity, "increase")
                      }
                      sx={{ border: "1px solid #ccc", p: 0.5 }}
                    >
                      <Add />
                    </IconButton>
                  </Box>

                  <Box width="25%">
                    <Typography fontWeight="bold" color="primary">
                      ₹{subtotalPerItem.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

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
            <Box display="flex" justifyContent="space-between" mb={2}>
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
              <Typography fontWeight="bold" mb={1}>
                Shipping
              </Typography>
              <RadioGroup
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <FormControlLabel
                  value="flat"
                  control={<Radio />}
                  label="Flat rate: ₹30.00"
                />
                <FormControlLabel
                  value="pickup"
                  control={<Radio />}
                  label="Local pickup"
                />
              </RadioGroup>
            </Box>

            <Divider sx={{ my: 2 }} />

            {["street", "city", "state", "postalCode"].map((field) => (
              <Box mb={2} key={field}>
                <TextField
                  fullWidth
                  label={field[0].toUpperCase() + field.slice(1)}
                  variant="outlined"
                  value={shippingAddress[field]}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      [field]: e.target.value,
                    })
                  }
                  required
                />
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" fontWeight="bold" mb={2}>
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
              onClick={handleCheckout}
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

export default AddToCart;
