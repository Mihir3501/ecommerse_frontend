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
import backgroundImage from '../../assets/background-image-reg-loin.jpg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(35, 'Must be 35 characters or less')

    .required('Enter your name'),
  email: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .matches(/@gmail\.com$/, 'Email must be a Gmail address')
    .required('Enter your Email'),
 
  password: Yup.string()
    .length(6, 'Must be exactly 6 characters')
    .matches(/\d/, 'Password must include at least one number')
    .required('Enter your Password'),
    
});

const Selar_Registrastion = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);
    navigate("/Selar_Login");
  };
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', 
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
           Sellar Registrastion
          </Typography>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            
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
                      label="name"
                      name="name"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                
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
                      Register
                    </Button>
              
                </Grid>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link to="/Selar_Login" style={{ textDecoration: 'none', color: '#1976D2', fontWeight: 'bold' }}>
                    Login Now
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

export default Selar_Registrastion;
