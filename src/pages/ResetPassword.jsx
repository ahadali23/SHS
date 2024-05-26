import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Key } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        {
          token,
          password,
        }
      );
      setMessage("Password reset successful");
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("Password reset failed. Please try again.");
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
        <Avatar sx={{ m: 1, bgcolor: "#018a82" }} />
        <Typography component="h1" variant="h5" color={"#018a82"}>
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key sx={{ color: "#018a82" }} />
                </InputAdornment>
              ),
            }}
            className="custom-focused-border"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key sx={{ color: "#018a82" }} />
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
            Reset Password
          </Button>
        </Box>
        {message && (
          <Typography variant="body2" color="error  " align="center">
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
