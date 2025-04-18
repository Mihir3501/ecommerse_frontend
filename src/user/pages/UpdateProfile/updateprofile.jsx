import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/navbar";
import backgroundImage from "/background-image-reg-loin.jpg";
import { useSelector } from "react-redux";
 
// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().max(35, "Must be 35 characters or less").required("Enter your name"),
  mobile: Yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit number").required("Enter your Mobile Number"),
  address: Yup.string().required("Enter your address"),
});
 
const UpdateProfile = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
 
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const initialValues = {
    name: userDetails?.name ?? "",
    mobile: userDetails?.mobile ?? "",
    address: userDetails?.address ?? "",
  };
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        setUserDetails(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        toast.error("Failed to fetch user data.");
        setLoading(false);
      }
    };
 
    fetchUserData();
  }, []);
 
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { name, mobile, address } = values;
 
      const response = await axios.patch(
        `${BASE_URL}/api/user/profile`,
        { name, mobile, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate("/mainpage");
      }, 2000);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              p: 4,
              boxShadow: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
            >
              Update Profile
            </Typography>
 
            {loading ? (
              <Typography align="center" sx={{ mt: 2 }}>
                Loading profile...
              </Typography>
            ) : userDetails ? (
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          variant="outlined"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Mobile No"
                          name="mobile"
                          variant="outlined"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.mobile && Boolean(errors.mobile)}
                          helperText={touched.mobile && errors.mobile}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          variant="outlined"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                          type="submit"
                          sx={{ mt: 2 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                      Don't want to update profile?{" "}
                      <Link
                        to="/mainpage"
                        style={{
                          textDecoration: "none",
                          color: "#1976D2",
                          fontWeight: "bold",
                        }}
                      >
                        Go to Homepage
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            ) : (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                Failed to load profile data.
              </Typography>
            )}
          </Card>
        </Container>
      </div>
    </>
  );
};
 
export default UpdateProfile;