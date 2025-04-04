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
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/background-image-reg-loin.jpg';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(35, 'Must be 35 characters or less')

    .required('Enter your name'),
  email: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .matches(/@gmail\.com$/, 'Email must be a Gmail address')
    .required('Enter your Email'),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number')
    .required('Enter your Mobile Number'),

    comment:Yup.string()
    .required('Enter your address'),
});

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);
    
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
            Fedback Form
          </Typography>
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobileNo: '',
             comment: '' 
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
                      label="Mobile No"
                      name="mobileNo"
                      variant="outlined"
                      type="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.mobileNo && Boolean(errors.mobileNo)}
                      helperText={touched.mobileNo && errors.mobileNo}
                    />
                
              
                  


                  <TextField
                      fullWidth
                      label="comment"
                      name="comment"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.comment && Boolean(errors.comment)}
                      helperText={touched.comment && errors.comment}
                    />
                
                
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      sx={{ mt: 2, width: '100%' }} 
                    >
                      Submit Your Feedback
                    </Button>
              
                </Grid>
                
              </form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
  );
};

export default Registration;
