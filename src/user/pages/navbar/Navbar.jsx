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
import { useDispatch, useSelector } from "react-redux";
import { setUser, setAccessToken } from "../../../redux/userSlice"; 

const pages = [
  { name: "HOMES", path: "/" },
  { name: "SHOP", path: "/shop" },
  { name: "BLOG", path: "/blog" },
  { name: "PAGES", path: "/pages" },
  { name: "MEGA", path: "/mega" },
  { name: "CONTACTS", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.user.user); 

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setAccessToken(null));
    handleCloseUserMenu();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
           
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
              BEST SPECIAL OFFERS! <strong>40% OFF!</strong>
            </Typography>

          
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

            {/* Icons */}
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
             
                {user ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/updateprofile");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography>Update Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    onClick={() => {
                      navigate("/login");
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography>User Login</Typography>
                  </MenuItem>
                )}
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

        <Divider sx={{ borderColor: "#ccc" }} />

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
