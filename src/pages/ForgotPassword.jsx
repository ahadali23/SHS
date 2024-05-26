import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Email, ArrowBack } from "@mui/icons-material";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(""); // State variable for the message
  const [error, setError] = useState(""); // State variable for error message

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username)
    setMessage(""); // Reset message
    setError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        {
          username,
        }
      );
      setMessage("If this username exists, a reset link has been sent to the associated email."); // Set success message
    } catch (error) {
      setMessage("");
      if (error.response && error.response.data) {
        setError("An error occurred. Please try again."); // Set error message
      } else {
        setError("An error occurred. Please try again."); // Set error message
      }
      console.error(
        "Request failed:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleBack} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBack sx={{ color: "#018a82" }} />
        </IconButton>
        <Avatar sx={{ m: 1, bgcolor: "#018a82" }} />
        <Typography component="h1" variant="h5" color={"#018a82"}>
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#018a82" }} />
                </InputAdornment>
              ),
            }}
            className="custom-focused-border"
          />
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
            Send Me Link
          </Button>
        </Box>
        {message && (
          <Typography variant="body2" color="success.main" align="center">
            {message}
          </Typography>
        )}
        {error && (
          <Typography variant="body2" color="error.main" align="center">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
