import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Grid,
  Checkbox,
  Button,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Email, Key } from "@mui/icons-material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username + " " + password + " " + rememberMe);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
        rememberMe,
      });
      console.log(response.data);
      localStorage.setItem("SHS", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response.data);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('SHS')) {
        navigate("/dashboard");
    }
    else {
        navigate("/");
    }
    // eslint-disable-next-line
}, [])
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
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
          <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                sx={{
                  color: "#018a82",
                  "&.Mui-checked": {
                    color: "#018a82",
                  },
                }}
              />
            }
            label="Remember me"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="#"
                style={{
                  fontSize: 18,
                  textDecoration: "none",
                  color: "#018a82",
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/signup"
                style={{
                  fontSize: 18,
                  textDecoration: "none",
                  color: "#018a82",
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
