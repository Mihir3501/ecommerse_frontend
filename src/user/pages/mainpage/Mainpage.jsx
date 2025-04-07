import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Menu, Container, Button,
  Tooltip, MenuItem, Box, Grid, Card, CardContent, CardMedia
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdbIcon from '@mui/icons-material/Adb';
import LocalMallIcon from '@mui/icons-material/LocalMall';
// import Slider from 'react-slick'; 
import { SiStylelint } from "react-icons/si";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import backgroundImage from "../../../assets/main-first-section-bg.jpeg";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/Categories' },
  { name: 'Contact', path: '/Contact' },
];

const settings = [
  { name: 'UserLogin', path: '/login' },
  { name: 'SellerLogin', path: '/Selar_Login' },
];

const products = [
  { src: "src/assets/sec2-image1.jpeg", price: 500 },
  { src: "src/assets/sec2-image2.jpeg", price: 600 },
  { src: "src/assets/sec2-image3.jpeg", price: 400 },
  { src: "src/assets/sec2-image4.jpeg", price: 900 },
  { src: "src/assets/sec2-image5.jpeg", price: 800 },
  { src: "src/assets/sec2-image6.jpeg", price: 700 },
  { src: "src/assets/sec2-image7.jpeg", price: 600 },
  { src: "src/assets/sec2-image8.jpeg", price: 900 },
];

const explore = [
  { src: "src/assets/dress-image1.jpeg", title: "Dress" },
  { src: "src/assets/shirt-image1.jpeg", title: "Shirts" },
  { src: "src/assets/jwellary-image1.jpeg", title: "Accessories" },
  { src: "src/assets/watch-image1.jpeg", title: "Watch" },
  { src: "src/assets/glasses-image1.jpeg", title: "Glasses" },
  { src: "src/assets/bag-image3.jpeg", title: "Bags" },
  { src: "src/assets/footware-image4.jpeg", title: "Footwear" },
  { src: "src/assets/shoes-image1.jpeg", title: "Shoes" },
];

const SampleNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "40%",
      right: "-30px",
      zIndex: 10,
      backgroundColor: 'white',
      borderRadius: '50%',
      boxShadow: 3,
      "&:hover": { backgroundColor: "#ddd" }
    }}
  >▶</IconButton>
);

const SamplePrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "40%",
      left: "-30px",
      zIndex: 10,
      backgroundColor: 'white',
      borderRadius: '50%',
      boxShadow: 3,
      "&:hover": { backgroundColor: "#ddd" }
    }}
  >◀</IconButton>
);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 900, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ]
};

const Mainpage = () => {
  const navigate = useNavigate();
  const productSectionRef = useRef(null);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: 'none' }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem' }}>
                <AdbIcon sx={{ mr: 1 }} /> FashionHub
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                {pages.map((page) => (
                  <Button key={page.name} onClick={() => navigate(page.path)} sx={{ color: 'white' }}>
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box>
                <IconButton><SearchIcon sx={{ color: "white" }} /></IconButton>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}><AccountCircleIcon sx={{ color: "white" }} /></IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={() => { navigate(setting.path); handleCloseUserMenu(); }}>
                      <Typography>{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton><ShoppingCartIcon sx={{ color: "white" }} /></IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box sx={{ textAlign: 'center', mt: 'auto', mb: 6 }}>
          <Typography variant="h3" fontWeight="bold">Your One-Stop Shop For Everything</Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>Connecting buyers and sellers on one powerful platform</Typography>
          <Button variant="contained" sx={{ borderRadius: 2, bgcolor: "white", color: "black" }} onClick={scrollToProducts}>
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Section 2 */}
      <Box
        ref={productSectionRef}
    sx={{
    py: { xs: 4, sm: 6 },
    px: { xs: 2, sm: 4 },
    textAlign: "center",
    position: "relative",
  }}
>
  <Typography variant="h4" fontWeight="bold" mb={2}>
    BEST OUTFIT FOR YOUR HAPPINESS
  </Typography>
  <Typography variant="h6" fontWeight="medium" color="text.secondary" mb={4}>
    LOWER PRICES
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {products.map((item, index) => (
      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 3,
            boxShadow: 5,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <CardMedia
            component="img"
            image={item.src}
            alt={`Product ${index + 1}`}
            sx={{
              height: 400,
              width: "100%",
              objectFit: "cover",
              borderRadius: "12px 12px 0 0",
            }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              Price: ₹{item.price}
            </Typography>
            <IconButton color="primary">
              <LocalMallIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>


      {/* Section 3 */}
      {/* <Box sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 }, textAlign: "center", position: "relative" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Shop By Categories</Typography>
        <Typography variant="h6" fontWeight="medium" color="text.secondary" mb={4}>Find exactly what you're looking for by browsing our curated product categories.</Typography>

        <Slider {...sliderSettings}>
          {explore.map((item, index) => (
            <Box key={index} px={2}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.src}
                  alt={item.title}
                  sx={{ height: 500,width: 500 , objectFit: "cover", borderRadius: "20px 20px 0 0" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                  <Button onClick={() => navigate('/categories')} >Explore more..</Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box> */}

      {/* Footer Section */}
      <Box sx={{ bgcolor: "#2C2C2C", color: "#FFFFFF", py: 10, px: { xs: 4, sm: 6, md: 10 } }}>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h4" fontWeight="bold" mb={2} display="flex" alignItems="center">
              Fashion Hub <SiStylelint style={{ marginLeft: 8 }} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" fontWeight="bold" mb={2}>Give us a call</Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <FaPhoneAlt style={{ marginRight: 8 }} /> +91 81603 15863
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" fontWeight="bold" mb={2}>Send us an email</Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <FaEnvelope style={{ marginRight: 8 }} /> fashionHub@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Mainpage;