import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../../redux/createSlice";

const Addtocart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" mb={4}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in the cart.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item._id} sx={{ display: "flex", mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={item?.images?.[0]}
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>₹{item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </CardContent>
              <IconButton onClick={() => dispatch(removeFromCart(item._id))}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}

          <Typography variant="h6" mt={2}>
            Total: ₹{totalPrice}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => alert("Checkout Coming Soon!")}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
};

export default Addtocart;
