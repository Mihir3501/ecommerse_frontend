import React, { useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import backgroundImage from "/main-first-section-bg.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

// ✅ Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Required CSS
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { SiStylelint } from "react-icons/si";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

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

const categories = [
  { src: "src/assets/dress-image1.jpeg", title: "Dresses" },
  { src: "src/assets/shirt-image1.jpeg", title: "Shirts" },
  { src: "src/assets/jwellary-image1.jpeg", title: "jwellary" },
  { src: "src/assets/watch-image1.jpeg", title: "watch" },
  { src: "src/assets/glasses-image1.jpeg", title: "Glasses" },
  { src: "src/assets/bag-image1.jpeg", title: "bags" },
  { src: "src/assets/footware-image1.jpeg", title: "footware" },
  { src: "src/assets/shoes-image1.jpeg", title: "Shoes" },
];

const Mainpage = () => {
  const navigate = useNavigate();
  const productSectionRef = useRef(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "white",
          display: "flex",
          flexDirection: "column",
          pt: "64px",
        }}
      >
        <Box sx={{ textAlign: "center", mt: "auto", mb: 6 }}>
          <Typography variant="h3" fontWeight="bold">
            Your One-Stop Shop For Everything
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Connecting buyers and sellers on one powerful platform
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: 2, bgcolor: "white", color: "black" }}
            onClick={scrollToProducts}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Section 2 - Products */}
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
        <Typography
          variant="h6"
          fontWeight="medium"
          color="text.secondary"
          mb={4}
        >
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

      {/* Section 3 - Categories */}
      <Box sx={{ py: 6, px: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Shop By Categories
        </Typography>
        <Typography
          variant="h6"
          fontWeight="medium"
          color="text.secondary"
          mb={4}
        >
          Find exactly what you're looking for by browsing our curated product categories.
        </Typography>

        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation
          modules={[Navigation]}
        >
          {categories.map((item, index) => (
           <SwiperSlide key={index}>
           <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
             <CardMedia
               component="img"
               image={item.src}
               alt={item.title}
               sx={{ height: 600 }}
             />
             <CardContent>
               <Typography variant="h6" fontWeight="bold">
                 {item.title}
               </Typography>
               <Button onClick={() => navigate("/categories")}>
                 Explore Now
               </Button>
             </CardContent>
           </Card>
         </SwiperSlide>
         
          ))}
        </Swiper>
      </Box>

      <Box sx={{ maxWidth: "1250px", mx: "auto" }}>
  <Footer />
</Box>

    </>
  );
};

export default Mainpage;
