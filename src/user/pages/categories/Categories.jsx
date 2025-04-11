import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
 
 
 
 
 
const ProductSection = ({ title, products, loading }) => (
  <Box
  sx={{
    py: { xs: 6, sm: 8 },
    px: { xs: 2, sm: 4 },
    textAlign: "center",
    background: "linear-gradient(to right, #fff5f7, #f0f4ff)",
    minHeight: "100vh",
  }}
  >
    <Typography
      variant="h6"
      fontWeight="medium"
      color="text.secondary"
      mb={4}
      sx={{ fontStyle: "italic" }}
      >
      {title}
    </Typography>
 
    {loading ? (
      <CircularProgress />
    ) : (
      <Grid container spacing={4} justifyContent="center">
        {products.map((item, index) => (
          <Grid item key={item.id || index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
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
                <Typography variant="h6" fontWeight="bold" mb={1}>
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
    )}
  </Box>
);
 
// Main Categories Page
const Categories = () => {
  const [categories, setCategories] = useState([
    "dresses",
    "shirts",
    "accessories",
    "watches",
    "glasses",
    "footwear",
    "shoes",
  ]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
 
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loadingCategory, setLoadingCategory] = useState({});
 
  useEffect(() => {
    categories.forEach((category) => {
      fetchProducts(category);
    });
  }, []);
 
  const fetchProducts = async (category) => {
    try {
     
      setLoadingCategory((prev) => ({ ...prev, [category]: true }));
      const res = await axios.get(`${BASE_URL}/api/product/categories`);    
 
      setProductsByCategory((prev) => ({ ...prev, [category]: res.data }));
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      setProductsByCategory((prev) => ({ ...prev, [category]: [] }));
    } finally {
      setLoadingCategory((prev) => ({ ...prev, [category]: false }));
    }
  };
 
  return (
    <>
      <Navbar />
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
          Let's Shop Now...
        </Typography>
        <Typography
          variant="h6"
          fontWeight="medium"
          color="text.secondary"
          mb={4}
          sx={{ fontStyle: "italic" }}
        >
          Trendy & Elegant Products Await!
        </Typography>
      </Box>
 
      {categories.map((cat) => (
        <ProductSection
          key={cat}
          title={cat.charAt(0).toUpperCase() + cat.slice(1)}
          products={productsByCategory[cat] || []}
          loading={loadingCategory[cat]}
        />
      ))}
 
      <Footer />
    </>
  );
};
 
export default Categories;