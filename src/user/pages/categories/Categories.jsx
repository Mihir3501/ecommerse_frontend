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

const shirt = [
  { src: "src/assets/shirt-image1.jpeg", price: 1200 },
  { src: "src/assets/shirt-image2.jpeg", price:1300 },
  { src: "src/assets/shirt-image3.jpeg", price: 1500},
  { src: "src/assets/shirt-image4.jpeg", price: 3400},
  { src: "src/assets/shirt-image5.jpeg", price: 1280},
  { src: "src/assets/shirt-image6.jpeg", price: 1399},
  { src: "src/assets/shirt-image7.jpeg", price: 2000},
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


  const watch = [
    { src: "src/assets/watch-image1.jpeg", price: 6000 },
    { src: "src/assets/watch-image2.jpeg", price: 5000},
    { src: "src/assets/watch-image4.jpeg", price: 4500},
    
  ];
  

  const glasses = [
    { src: "src/assets/glasses-image1.jpeg", price: 1000 },
    { src: "src/assets/glasses-image2.jpeg", price: 2000 },
    { src: "src/assets/glasses-image3.jpeg", price: 3000 },
    { src: "src/assets/glasses-image4.jpeg", price: 4500 },
    { src: "src/assets/glasses-image5.jpeg", price: 5500 },
    { src: "src/assets/glasses-image6.jpeg", price: 5000 },
   
  ];


  const footware = [
    { src: "src/assets/footware-image1.jpeg", price: 1000 },
    { src: "src/assets/footware-image2.jpeg", price: 2000 },
    { src: "src/assets/footware-image3.jpeg", price: 3000 },
    { src: "src/assets/footware-image4.jpeg", price: 4500 },
    { src: "src/assets/footware-image5.jpeg", price: 5500 },
   
  ];

  const shoes = [
    { src: "src/assets/shoes-image1.jpeg", price: 5100 },
    { src: "src/assets/shoes-image2.jpeg", price: 2500 },
    { src: "src/assets/shoes-image3.jpeg", price: 3600 },
    { src: "src/assets/shoes-image4.jpeg", price: 4700 },
    { src: "src/assets/shoes-image5.jpeg", price: 5800 },
   
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



     {/* Shirt section */}
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
        Shirt 
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {shirt.map((item, index) => (
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


 {/* Watch  section */}
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
        Watch
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {watch.map((item, index) => (
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




     {/* Glasses section */}
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
        Glasses
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {glasses.map((item, index) => (
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




 {/* footware section */}
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
        Footware
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {footware.map((item, index) => (
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




 {/* shoes section */}
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
        Shoes
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {shoes.map((item, index) => (
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
