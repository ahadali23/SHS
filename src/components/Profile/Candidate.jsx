import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { AspectRatio, IconButton, Stack } from "@mui/joy";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  EditRounded,
} from "@mui/icons-material";
import axios from "axios";

const ProfileSettingsForm = ({ userInfo, onSave }) => {
  const [formValues, setFormValues] = useState({
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    email: userInfo.email || "",
    phone: userInfo.phoneNumber || "",
    city: userInfo.city || "",
    country: userInfo.country || "",
    address: userInfo.address || "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(userInfo.picture);

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
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleRemoveProfilePic = () => {
    setProfilePic(null);
    setProfilePicPreview(null); // Clear the preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });
    if (profilePic) {
      formData.append("picture", profilePic);
    } else if (userInfo.picture) {
      formData.append("picture", null); // Ensure no picture is uploaded
    }
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
      onSave();
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile");
    }
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ position: "relative" }}
        >
          <Stack direction="column" spacing={1}>
            <Avatar
              src={profilePicPreview}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <IconButton
              aria-label="upload new picture"
              size="small"
              color="primary"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(80%, 60%)",
              }}
              component="label"
            >
              <input type="file" hidden onChange={handleProfilePicChange} />
              <EditRounded />
            </IconButton>
          </Stack>
        </Stack>
        {/* Form Fields */}
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formValues.city}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formValues.country}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

const SocialForm = ({ userInfo, onSave }) => {
  const [formValues, setFormValues] = useState({
    facebook: userInfo.facebook || "",
    twitter: userInfo.twitter || "",
    linkedIn: userInfo.linkedIn || "",
    whatsapp: userInfo.whatsapp || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("SHS");
      if (!token) {
        throw new Error("No token found");
      }
      await axios.put("http://localhost:3000/user/updatesocials", formValues, {
        headers: {
          "x-auth-token": token,
        },
      });
      alert("Social links updated successfully");
      onSave();
    } catch (error) {
      console.error("Error updating social links", error);
      alert("Error updating social links");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Facebook"
        name="facebook"
        value={formValues.facebook}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Twitter"
        name="twitter"
        value={formValues.twitter}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="LinkedIn"
        name="linkedIn"
        value={formValues.linkedIn}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="WhatsApp"
        name="whatsapp"
        value={formValues.whatsapp}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
};

const ChangePasswordForm = ({ onSave }) => {
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.newPassword !== formValues.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    try {
      const token = localStorage.getItem("SHS");
      if (!token) {
        throw new Error("No token found");
      }
      await axios.put(
        "http://localhost:3000/user/changepassword",
        {
          currentPassword: formValues.currentPassword,
          newPassword: formValues.newPassword,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      alert("Password changed successfully");
      onSave();
    } catch (error) {
      console.error("Error changing password", error);
      alert("Error changing password");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formValues.currentPassword}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="New Password"
        name="newPassword"
        type="password"
        value={formValues.newPassword}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Change Password
      </Button>
    </Box>
  );
};

const Candidate = ({ userInfo, handleProfileUpdate }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ display: "flex", p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper sx={{ width: 300, p: 2, mr: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={userInfo.picture}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h6">
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Developer
          </Typography>
          <Box sx={{ display: "flex", mt: 1 }}>
            <Facebook sx={{ color: "#3b5998", mx: 0.5 }} />
            <Twitter sx={{ color: "#1DA1F2", mx: 0.5 }} />
            <LinkedIn sx={{ color: "#0077b5", mx: 0.5 }} />
            <WhatsApp sx={{ color: "#25D366", mx: 0.5 }} />
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Contacts</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary={userInfo.email || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary={userInfo.phoneNumber || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary={userInfo.city || "N/A"} />
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Bio</Typography>
          <TextField
            fullWidth
            label="Write About You"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            className="custom-focused-border"
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Skills</Typography>
        </Box>
      </Paper>
      <Paper sx={{ flex: 1, p: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Overview" />
          <Tab label="Connect Socials" />
          <Tab label="Change Password" />
        </Tabs>
        {tabIndex === 0 && (
          <ProfileSettingsForm
            userInfo={userInfo}
            onSave={handleProfileUpdate}
          />
        )}
        {tabIndex === 1 && (
          <SocialForm userInfo={userInfo} onSave={handleProfileUpdate} />
        )}
        {tabIndex === 2 && <ChangePasswordForm onSave={handleProfileUpdate} />}
      </Paper>
    </Box>
  );
};

export default Candidate;
