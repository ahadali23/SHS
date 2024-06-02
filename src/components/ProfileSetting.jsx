import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Divider,
  Button,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Grid,
  CardHeader,
  FormControl,
  TextField,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useUserInfo } from "../hooks/useUserInfo";
import axios from "axios";

const ProfileSetting = () => {
  const { userInfo, loading, error, tokenExists } = useUserInfo();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    address: "",
    picture: "",
  });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (userInfo.info) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        city,
        country,
        address,
        picture,
      } = userInfo.info;
      setFormValues({
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        city,
        country,
        address,
        picture: picture
          ? `data:${picture.contentType};base64,${picture.data.toString(
              "base64"
            )}`
          : "/assets/avatar.png",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", formValues.firstName);
    formData.append("lastName", formValues.lastName);
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);
    formData.append("city", formValues.city);
    formData.append("country", formValues.country);
    formData.append("address", formValues.address);
    if (profilePic) {
      formData.append("picture", profilePic);
    }
    console.log(formData);
    try {
      const token = localStorage.getItem("SHS");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.put("http://localhost:3000/user/updateprofile", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile");
    }
  };

  if (!tokenExists) {
    return <Alert severity="warning">No token found. Please log in.</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack spacing={3}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center">
          Account
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={3} md={6} xs={12}>
            <Card>
              <CardContent>
                <Stack spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar
                    src={formValues.picture}
                    sx={{ height: 80, width: 80 }}
                  />
                  <Stack spacing={1} sx={{ textAlign: "center" }}>
                    <Typography variant="h5">{`${formValues.firstName} ${formValues.lastName}`}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {userInfo.role.charAt(0).toUpperCase() +
                        userInfo.role.slice(1)}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {formValues.city}, {formValues.country}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <CardActions>
                <Button fullWidth variant="text" component="label">
                  Upload picture
                  <input type="file" hidden onChange={handleProfilePicChange} />
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={9} md={6} xs={12}>
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title="Profile"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth required>
                        <TextField
                          value={formValues.firstName}
                          label="First name"
                          name="firstName"
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth required>
                        <TextField
                          value={formValues.lastName}
                          label="Last name"
                          name="lastName"
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth required>
                        <TextField
                          value={formValues.email}
                          label="Email address"
                          name="email"
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          value={formValues.phone}
                          label="Phone number"
                          name="phone"
                          type="tel"
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="City"
                          value={formValues.city}
                          variant="outlined"
                          name="city"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Country"
                          value={formValues.country}
                          variant="outlined"
                          name="country"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Address"
                          variant="outlined"
                          value={formValues.address}
                          name="address"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button variant="contained" type="submit">
                    Save details
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default ProfileSetting;
