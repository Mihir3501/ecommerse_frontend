import React from 'react';
import { useNavigate } from 'react-router-dom';
import  { useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button, { buttonClasses } from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import backgroundImage from '../../assets/main-first-section-bg.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Grid from '@mui/material/Grid';

const pages = [
  { name: 'Home', path: '/'  },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/deals' },
  { name: 'Contact', path: '/contact' },
];

const settings = [
 { name: 'UserLogin', path: '/login'} ,
 { name: 'SelarLogin', path:'/Selar_Login'}
];

const products = [
  { src:("src/assets/sec2-image1.jpeg"), price: 500 },
  { src:("src/assets/sec2-image2.jpeg"), price: 600 },
  { src:("src/assets/sec2-image3.jpeg"), price: 1000 },
  { src:("src/assets/sec2-image4.jpeg"), price: 900 },
  { src:("src/assets/sec2-image5.jpg"), price: 800 },
  { src:("src/assets/sec2-image6.jpg"), price: 700 },
  { src:("src/assets/sec2-image7.jpg"), price: 600 },
  { src:("src/assets/sec2-image8.jpg"), price: 900 },
];

const Mainpage = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const productSectionRef = useRef(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  };


const categories = [
  { src: "src/assets/men-image.jpeg", alt: "Men", buttonClasses: "Explore MenFashion" },
  { src: "src/assets/woman-image.jpeg", alt: "Women", buttonClasses: "Explore WomenFashion" },
];

  return (
    <>
      
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppBar position="static" sx={{backgroundColor:"transparent" , boxShadow:'none'}}>
          <Container maxWidth="xl">
            <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FashionHub
              </Typography>

          
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        navigate(page.path);
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

            
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button key={page.name} onClick={() => navigate(page.path)} sx={{ my: 2, color: 'white' }}>
                    {page.name}
                  </Button>
                ))}
              </Box>

          
              <IconButton><SearchIcon /></IconButton>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 3}}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      navigate(setting.path);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <IconButton><ShoppingCartIcon /></IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Section-1 */}
        <div  ref={productSectionRef} style={{ textAlign: 'center', color: "white" }}>
          <h1>Your One-Stop Shop For Everything</h1>
          <h3>Connecting buyers and sellers on one powerful platform</h3>
          <Button variant="contained" sx={{ mt: 1, borderRadius: 2, bgcolor: "white", color: "black" }}  onClick={scrollToProducts} >
            Shop Now
          </Button>
        </div>
      </div>

      {/* Section 2: Products */}
      <Box  ref={productSectionRef} sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          BEST OUTFIT FOR YOUR HAPPINESS
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: "800px", mx: "auto" }}>
          {products.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{display:'flex' , justifyContent: 'space-between'}}>
              <Card
                sx={{
                  maxWidth: 500,
                  mx: "auto",
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
                  sx={{ width: "100%", height: 150, objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Price: ₹{item.price}
                  </Typography>
                  <IconButton><LocalMallIcon /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
                {/* Section 3: categories */}

                <Box sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Shop By Categories
        </Typography>
        <Typography variant="h5" fontWeight="semibold" mb={3}>
          Find exactly what you're looking for by browsing our curated product categories.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden', position: 'relative' }}>
                <CardMedia component="img" image={category.src} alt={category.alt} sx={{ width: '100%', height: 250, objectFit: 'cover' }} />
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', borderRadius: 3 }}
                  onClick={() => navigate("/explore")}
                >
                  {category.label}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

             {/* Section 4: feedback */}

            <Box sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          What Our Customers Say
        </Typography>
        <Typography variant="h5" fontWeight="semibold" mb={3}>
          Hear from shoppers who have experienced our platform.
        </Typography>
       
         
      </Box>

    </>
  );
};

export default Mainpage;
