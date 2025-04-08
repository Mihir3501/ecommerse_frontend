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
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImage from '../../../assets/background-image-reg-loin.jpg';
import { loginUser } from '../../../config/Dataservice';
import { setAccessToken, setUser } from '../../../redux/userSlice';

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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser(values);
      console.log(response.data,"hasr")
      if (response?.data?.success) {
        toast.success(response.data.message || 'Login successful');
        dispatch(setAccessToken(response.data.user));
        dispatch(setUser({ user: response.data.user, token: response.data.token }));
        navigate('/mainpage');
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      inputProps={{ maxLength: 8 }}
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
