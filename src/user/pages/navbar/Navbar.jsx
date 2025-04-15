import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Container,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "HOMES", path: "/" },
  { name: "SHOP", path: "/Categories" },
  { name: "BLOG", path: "/blog" },
  { name: "PAGES", path: "/pages" },
  { name: "MEGA", path: "/mega" },
  { name: "CONTACTS", path: "/contact" },
];

const settings = [
  { name: "User Login", path: "/login" },
  { name: "Update Profile", path: "/updateprofile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <>
      {/* Main AppBar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 2, px: 0 }}>
            {/* Left: Special Offer Message */}
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
              BEST SPECIAL OFFERS! <strong>40% OFF!</strong>
            </Typography>

            {/* Center: Logo */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.2rem",
                textAlign: "center",
                cursor: "pointer",
                flexGrow: 1,
              }}
              onClick={() => navigate("/")}
            >
              MODERNO
            </Typography>

            {/* Right: Icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="User">
                <IconButton onClick={handleOpenUserMenu}>
                  <AccountCircleIcon sx={{ color: "#000" }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      navigate(setting.path);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography>{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton>
                <SearchIcon sx={{ color: "#000" }} />
              </IconButton>
              <IconButton>
                <FavoriteBorderIcon sx={{ color: "#000" }} />
              </IconButton>
              <IconButton>
                <ShoppingCartIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* Divider Line */}
        <Divider sx={{ borderColor: "#ccc" }} />

        {/* Bottom Navigation Row */}
        <Box sx={{ backgroundColor: "#fff", py: 1 }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    "&:hover": {
                      borderBottom: "2px solid #000",
                      borderRadius: 0,
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Container>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
