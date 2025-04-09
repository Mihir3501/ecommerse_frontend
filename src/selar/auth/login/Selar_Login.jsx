import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Grid,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/background-image-reg-loin.jpg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Navbar from "../../../user/pages/navbar/Navbar";


const validationSchema = Yup.object({
  email: Yup.string()
  .max(30, 'Must be 30 characters or less')
  .matches(/@gmail\.com$/, 'Email must be a Gmail address')
  .required('Enter your Email'),
  
  password: Yup.string()
  .length(8, 'Must be exactly 8 characters')
  .matches(/\d/, 'Password must include at least one number')
  .required('Enter your Password')
});

const Selar_Login = () => 
  
  {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/seller/login", values);
      toast.success("Login successful!");
      console.log("Login Response:", response.data);

      // Optionally save the token or user data if needed
      localStorage.setItem("sellerAuth", JSON.stringify(response.data));

      setTimeout(() => {
        navigate("/Selar_Dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
            <Navbar/>
          
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            boxShadow: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
           Sellar Login
          </Typography>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            
          >
            {({ touched, errors, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                 
             
              
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      variant="outlined"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                
                 
                  
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      inputProps={{ maxLength: 10 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
              
              
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      sx={{ mt: 2, width: '100%' }} 
                    >
                      Login
                    </Button>
                  </Grid>
            
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                  <Link to="/Selar_Registrastion" style={{ textDecoration: 'none', color: '#1976D2', fontWeight: 'bold' }}>
                    Registration  Now
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
    </>
  );
};

export default Selar_Login;
