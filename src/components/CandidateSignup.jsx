import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { Email, Key, Close, Person, Phone, Place } from "@mui/icons-material";
import axios from "axios";

const CandidateSignup = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    country: "",
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/candidatesignup",
        { ...formData, role: "candidate" }
      );
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response.data);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Paper elevation={3} sx={{ width: "80%", maxWidth: 400, p: 5 }}>
        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#018a82" }} />
          <Typography component="h1" variant="h5" color={"#018a82"}>
            Candidate Signup
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignup}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  autoComplete="tel"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="country-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Place sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  autoComplete="country-name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Place sx={{ color: "#018a82" }} />
                      </InputAdornment>
                    ),
                  }}
                  className="custom-focused-border"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#018a82",
                "&:hover": {
                  backgroundColor: "#52c9c1",
                },
                textTransform: "none",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  style={{
                    fontSize: 18,
                    textDecoration: "none",
                    color: "#018a82",
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CandidateSignup;
