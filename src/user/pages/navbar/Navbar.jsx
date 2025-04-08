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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/Categories" },
  { name: "Contact", path: "/Contact" },
];

const settings = [
  { name: "UserLogin", path: "/login" },
  { name: "UpdateProfile", path: "/updateprofile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "black", boxShadow: "1" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
            }}
          >
            <AdbIcon sx={{ mr: 1 }} /> FashionHub
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ color: "white" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box>
            <IconButton>
              <SearchIcon sx={{ color: "white" }} />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon sx={{ color: "white" }} />
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
              <ShoppingCartIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
