import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton
} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Navbar from "../../../user/pages/navbar/Navbar";
import Footer from '../footer/Footer';


const dresses = [
  { src: "src/assets/dress-image2.jpeg", price: 1000 },
  { src: "src/assets/dress-image3.jpeg", price: 2000 },
  { src: "src/assets/dress-image5.jpeg", price: 3000 },
  { src: "src/assets/dress-image6.jpeg", price: 4500 },
  { src: "src/assets/dress-image7.jpeg", price: 5500 },
  { src: "src/assets/dress-image8.jpeg", price: 5000 },
  { src: "src/assets/dress-image9.jpeg", price: 6000 },
  { src: "src/assets/dress-image10.jpeg", price: 5500 },
];


const Accessories = [
    { src: "src/assets/jwellary-image2.jpeg", price: 1000 },
    { src: "src/assets/jwellary-image3.jpeg", price: 2000 },
    { src: "src/assets/jwellary-image5.jpeg", price: 3000 },
    { src: "src/assets/jwellary-image6.jpeg", price: 4500 },
    { src: "src/assets/jwellary-image7.jpeg", price: 5500 },
    { src: "src/assets/jwellary-image8.jpeg", price: 5000 },
    { src: "src/assets/jwellary-image9.jpeg", price: 6000 },
    { src: "src/assets/jwellary-image1.jpeg", price: 5500 },
  ];
  

const Categories = () => {
  return (

    <>
        <Navbar/>

    {/* dresses section */}
    <Box
      sx={{
        py: { xs: 6, sm: 8 },
        px: { xs: 2, sm: 4 },
        textAlign: 'center',
        background: 'linear-gradient(to right, #fff5f7, #f0f4ff)',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
        Let's Shop Now...
      </Typography>
      <Typography
        variant="h6"
        fontWeight="medium"
        color="text.secondary"
        mb={4}
        sx={{ fontStyle: 'italic' }}
      >
        Trendy & Elegant Dresses Await!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {dresses.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                backgroundColor: '#fff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={item.src}
                alt={`Product ${index + 1}`}
                sx={{
                  height: 400,
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px 12px 0 0',
                }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
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
    </Box>
      {/* Accessories section */}
      <Box
      sx={{
        py: { xs: 6, sm: 8 },
        px: { xs: 2, sm: 4 },
        textAlign: 'center',
        background: 'linear-gradient(to right, #fff5f7, #f0f4ff)',
        minHeight: '100vh',
      }}
    >
     
      <Typography
        variant="h6"
        fontWeight="medium"
        color="text.secondary"
        mb={4}
        sx={{ fontStyle: 'italic' }}
      >
        Trendy & Elegant Dresses Await!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {Accessories.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                backgroundColor: '#fff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={item.src}
                alt={`Product ${index + 1}`}
                sx={{
                  height: 400,
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px 12px 0 0',
                }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
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
    </Box>

    <Footer/>

    </>
  );
};

export default Categories;
