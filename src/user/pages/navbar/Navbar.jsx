import React, { useState } from "react";
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
  Menu,
  MenuItem,
  Avatar,
  InputBase,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import axios from "axios";

const pages = [
  { name: "HOME", path: "/" },
  { name: "SHOP", path: "/#ishika" },
  { name: "BLOG", path: "/blog" },
  { name: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const totalQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0)
    : 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userAuth");
    navigate("/login");
    setTimeout(() => handleClose(), 0);
  };

  const handleProfile = () => {
    navigate("/updateprofile");
    setTimeout(() => handleClose(), 0);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(
        `http://192.168.1.37:5000/api/product/search?q=${searchQuery}`
      );
      const products = response.data;
      if (products.length > 0) {
        navigate(`/product/${products[0]._id}`);
      } else {
        alert("No products found.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Something went wrong during search.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            MODERNO
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#f1f1f1",
              px: 1,
              borderRadius: 1,
            }}
          >
            <InputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {user ? (
              <>
                <IconButton onClick={handleMenuClick}>
                  <Avatar>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton onClick={() => navigate("/login")}>
                <AccountCircleIcon />
              </IconButton>
            )}

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
