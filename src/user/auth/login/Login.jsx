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


const validationSchema = Yup.object({
  email: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .matches(/@gmail\.com$/, 'Email must be a Gmail address')
    .required('Enter your Email'),
 
  password: Yup.string()
    .length(6, 'Must be exactly 6 characters')
    .matches(/\d/, 'Password must include at least one number')
    .required('Enter your Password')
});

const Login = () => 
  
  
  {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);

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
                      inputProps={{ maxLength: 6 }}
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
                  <Link to="/Registration" style={{ textDecoration: 'none', color: '#1976D2', fontWeight: 'bold' }}>
                    Registration  Now
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
