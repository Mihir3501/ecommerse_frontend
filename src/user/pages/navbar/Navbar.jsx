// src/components/navbar/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
  Badge,
  Divider,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "HOME", path: "/" },
  { name: "SHOP", path: "/categories" },
  { name: "BLOG", path: "/blog" },
  { name: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items); // assuming cart slice
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>
            MODERNO
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton onClick={() => navigate("/login")}>
              <AccountCircleIcon />
            </IconButton>

            <IconButton>
              <SearchIcon />
            </IconButton>

            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>

            <IconButton onClick={() => navigate("/addtocart")}>
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Divider />

      <Box sx={{ backgroundColor: "#fff", py: 1 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Navbar;
