import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import { SiStylelint } from "react-icons/si";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#2C2C2C",
        color: "#FFFFFF",
        py: 10,
        px: { xs: 4, sm: 6, md: 10 },
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            display="flex"
            alignItems="center"
          >
            Fashion Hub <SiStylelint style={{ marginLeft: 8 }} />
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <IconButton
              component="a"
              href="https://www.instagram.com/yourInstagramUsername"
              target="_blank"
              rel="noopener"
              sx={{ color: "#fff" }}
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/yourFacebookPage"
              target="_blank"
              rel="noopener"
              sx={{ color: "#fff" }}
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://wa.me/yourNumber"
              target="_blank"
              rel="noopener"
              sx={{ color: "#fff" }}
            >
              <FaWhatsapp />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Give us a call
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <FaPhoneAlt style={{ marginRight: 8 }} /> +91 81603 15863
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Send us an email
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <FaEnvelope style={{ marginRight: 8 }} /> fashionHub@gmail.com
          </Typography>
          <Button onClick={() => navigate("/Selar_Login")}>Become a Sellar</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
