// import React, { useState } from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Card,
//   Grid,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
// import LockIcon from "@mui/icons-material/Lock";
// import HomeIcon from "@mui/icons-material/Home";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import backgroundImage from "../../../assets/background-image-reg-loin.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { userSignup } from "../../../config/Dataservice";

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .max(35, "Must be 35 characters or less")
//     .required("Enter your name"),
//   email: Yup.string()
//     .max(30, "Must be 30 characters or less")
//     .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address")
//     .required("Enter your Email"),
//   mobile: Yup.string()
//     .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
//     .required("Enter your Mobile Number")
//     .length(10, "Must be exactly 10 characters"),

//   password: Yup.string()
//     .length(8, "Must be exactly 8 characters")
//     .matches(/\d/, "Password must include at least one number")
//     .matches(/[@#$%!&*]/, "Must include at least one special character (@, #, $, %, !, &, *)")
//     .required("Enter your Password"),
//   address: Yup.string().required("Enter your address"),
// });

// const Registration = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   // const BASE_URL = import.meta.env.VITE_BASE_URL;

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleFormSubmit = async (values) => {
//     try {
//       const userData = {
//         name: values.name,
//         email: values.email,
//         mobile: values.mobile,
//         password: values.password,
//         address: values.address,
//       };

//       const response = await userSignup(userData);

//       if (response.status === 201) {
//         toast.success(response.data.message || "Registered successfully");

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         toast.error(response.data.message || "Registration failed");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         width: "100%",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Container maxWidth="sm">
//         <Card
//           sx={{
//             p: 4,
//             boxShadow: 6,
//             borderRadius: 3,
//             backgroundColor: "rgba(255, 255, 255, 0.9)",
//             backdropFilter: "blur(10px)",
//             maxWidth: 500,
//             mx: "auto",
//             mt: 5,
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             fontWeight="bold"
//             color="primary"
//           >
//             Register Now
//           </Typography>

//           <Formik
//             initialValues={{
//               name: "",
//               email: "",
//               mobile: "",
//               password: "",
//               address: "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleFormSubmit}
//             validateOnBlur={false}
//             validateOnChange={false}
//           >
//             {({ touched, errors, handleChange, handleBlur, handleSubmit }) => (
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Name"
//                       name="name"
//                       variant="outlined"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={Boolean(errors.name)}
//                       helperText={errors.name}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PersonIcon color="action" />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       name="email"
//                       variant="outlined"
//                       type="email"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={Boolean(errors.email)}
//                       helperText={errors.email}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon color="action" />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Mobile No"
//                       name="mobile"
//                       variant="outlined"
//                       type="tel"
//                       inputProps={{ maxLength: 10 }}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={Boolean
//                         (errors.mobile)}
//                       helperText={errors.mobile}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneAndroidIcon color="action" />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Password"
//                       name="password"
//                       variant="outlined"
//                       type={showPassword ? "text" : "password"}
//                       inputProps={{ maxLength: 8 }}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={Boolean(errors.password)}
//                       helperText={errors.password}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LockIcon color="action" />
//                           </InputAdornment>
//                         ),
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={handleTogglePassword}
//                               edge="end"
//                             >
//                               {showPassword ? (
//                                 <VisibilityOff />
//                               ) : (
//                                 <Visibility />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Address"
//                       name="address"
//                       variant="outlined"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={Boolean(errors.address)}
//                       helperText={errors.address}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <HomeIcon color="action" />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                       size="large"
//                       type="submit"
//                       sx={{
//                         textTransform: "none",
//                         fontWeight: "bold",
//                         transition: "0.3s",
//                         "&:hover": {
//                           backgroundColor: "primary.dark",
//                         },
//                       }}
//                     >
//                       Register
//                     </Button>
//                   </Grid>
//                 </Grid>

//                 <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//                   Already have an account?{" "}
//                   <Link
//                     to="/login"
//                     style={{
//                       textDecoration: "none",
//                       color: "#1976D2",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Login Now
//                   </Link>
//                 </Typography>
//               </form>
//             )}
//           </Formik>
//         </Card>
//       </Container>
//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default Registration;


// src/pages/user/Registration.jsx
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/background-image-reg-loin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignup } from "../../../config/Dataservice";

const validationSchema = Yup.object({
  name: Yup.string().max(35).required("Enter your name"),
  email: Yup.string()
    .max(30)
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid email")
    .required("Enter your Email"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Enter your Mobile Number"),
  password: Yup.string()
    .length(8)
    .matches(/\d/, "At least one number")
    .matches(/[@#$%!&*]/, "At least one special character")
    .required("Enter your Password"),
  address: Yup.string().required("Enter your address"),
});

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleFormSubmit = async (values) => {
    try {
      const response = await userSignup(values);

      if (response.status === 201) {
        toast.success(response.data.message || "Registered successfully");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
            Register Now
          </Typography>

          <Formik
            initialValues={{ name: "", email: "", mobile: "", password: "", address: "" }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, handleChange, handleSubmit, handleBlur }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {[
                    { name: "name", label: "Name", icon: <PersonIcon />, type: "text" },
                    { name: "email", label: "Email", icon: <EmailIcon />, type: "email" },
                    { name: "mobile", label: "Mobile", icon: <PhoneAndroidIcon />, type: "tel" },
                    {
                      name: "password",
                      label: "Password",
                      icon: <LockIcon />,
                      type: showPassword ? "text" : "password",
                      endIcon: (
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    },
                    { name: "address", label: "Address", icon: <HomeIcon />, type: "text" },
                  ].map((field, idx) => (
                    <Grid item xs={12} key={idx}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors[field.name])}
                        helperText={errors[field.name]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">{field.icon}</InputAdornment>
                          ),
                          endAdornment: field.endIcon ? (
                            <InputAdornment position="end">{field.endIcon}</InputAdornment>
                          ) : null,
                        }}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" size="large">
                      Register
                    </Button>
                  </Grid>
                </Grid>

                <Typography align="center" sx={{ mt: 3 }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#1976D2", fontWeight: "bold" }}>
                    Login Now
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Card>
        <ToastContainer position="top-center" />
      </Container>
    </div>
  );
};

export default Registration;
