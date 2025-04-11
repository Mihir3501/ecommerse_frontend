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
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../../../assets/background-image-reg-loin.jpg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/authSlice';

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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, values);
      toast.success("Login successful!");
      console.log("Login Response:", response.data);

      localStorage.setItem("userAuth", JSON.stringify(response.data));
      dispatch(setToken(response.data.user.token));

      setTimeout(() => {
        navigate("/mainpage");
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
      <ToastContainer />
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
              Login
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
              {({ touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        inputProps={{ maxLength: 8 }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
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
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                      >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Link to="/Registration" style={{ textDecoration: 'none', color: '#1976D2', fontWeight: 'bold' }}>
                      Register Now
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

export default Login;
