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
import 'react-toastify/dist/ReactToastify.css';
import { userSignup } from '../../../config/Dataservice';

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().max(35, 'Must be 35 characters or less').required('Enter your name'),
  email: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .matches(/@gmail\.com$/, 'Email must be a Gmail address')
    .required('Enter your Email'),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number')
    .required('Enter your Mobile Number'),
  password: Yup.string()
    .length(8, 'Must be exactly 8 characters')
    .matches(/\d/, 'Password must include at least one number')
    .required('Enter your Password'),
  address: Yup.string().required('Enter your address'),
});

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values) => {
    try {
      const userData = {
        name: values.name,
        email: values.email,
        mobile: values.mobileNo,
        password: values.password,
        address: values.address,
      };

      const response = await userSignup(userData);

      // ✅ Use actual HTTP status, not custom field
      if (response.status === 201) {
        toast.success(response.data.message || 'Registered successfully');

        // ✅ Navigate after delay so user sees toast
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
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
            Register Now
          </Typography>

          <Formik
            initialValues={{
              name: '',
              email: '',
              mobileNo: '',
              password: '',
              address: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ touched, errors, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                  </Grid>
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
                      label="Mobile No"
                      name="mobileNo"
                      variant="outlined"
                      type="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.mobileNo)}
                      helperText={errors.mobileNo}
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
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.address)}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#1976D2', fontWeight: 'bold' }}>
                    Login Now
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

export default Registration;
