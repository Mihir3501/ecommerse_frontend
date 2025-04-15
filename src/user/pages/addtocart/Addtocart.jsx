import React, { useState } from "react";
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
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../../../redux/createSlice";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

const Addtocart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [shipping, setShipping] = useState("flat");
  const shippingCost = shipping === "flat" ? 30 : 0;
  const navigate = useNavigate();

  const handleQuantityChange = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h6">Your Cart Is Currently Empty</Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/categories")}
        >
          Return to Shop
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Navbar />

      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, maxWidth: "1450px", mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Shopping Cart
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={6}
          alignItems="flex-start"
        >
          {/* Left Side - Product Cart */}
          <Box flex={2}>
            <Box
              display="flex"
              fontWeight="bold"
              pb={1}
              borderBottom="1px solid #ccc"
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
                py={2}
                borderBottom="1px solid #eee"
              >
                <Box width="50%" display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    image={item?.images?.[0]}
                    alt={item.name}
                    sx={{ width: 80, height: 100, objectFit: "cover", mr: 2 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      PRADA
                    </Typography>
                    <Typography variant="body2">
                      1 × ₹{item.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Box width="25%" display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleQuantityChange(item._id, "decrease")}
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(item._id, "increase")}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <Box width="25%">
                  <Typography fontWeight="bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Right Side - Summary Box */}
          <Box
            flex={1}
            border="1px solid #ddd"
            borderRadius={2}
            p={3}
            sx={{ position: "sticky", top: 100, minWidth: "300px" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography fontWeight="bold">COUPON CODE</Typography>
              <Button size="small">+</Button>
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

            <Typography mt={1} mb={1}>
              Shipping to <b>CA</b>.
            </Typography>
            <Button size="small" sx={{ textTransform: "none" }}>
              Change Address
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              fontWeight="bold"
              mb={2}
            >
              <Typography>Total</Typography>
              <Typography>₹{total.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#000", color: "#fff", py: 1.5 }}
              onClick={() => alert("Proceed to Payment")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1450px", mx: "auto" }}>
        <Footer />
      </Box>
    </>
  );
};

export default Addtocart;
