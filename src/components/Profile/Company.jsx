import React, { useState } from "react";
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
  Stack,
  IconButton,
  Slide,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  WhatsApp,
  EditRounded,
  GitHub,
} from "@mui/icons-material";
import axios from "axios";
import CustomSnackbar from "../CustomSnackbar";

const ProfileSettingsForm = ({ userInfo, onSave, setMessage }) => {
  const [formValues, setFormValues] = useState({
    companyName: userInfo.companyName || "",
    hrName: userInfo.hrName || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });
    if (profilePic) {
      formData.append("picture", profilePic);
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
      setMessage({
        type: "success",
        text: "Profile updated successfully",
      });
      onSave();
    } catch (error) {
      console.error("Error updating profile", error);
      setMessage({
        type: "error",
        text: "Error updating profile",
      });
    }
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
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
          label="Company Name"
          name="companyName"
          value={formValues.companyName}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
        />
        <TextField
          fullWidth
          label="HR Name"
          name="hrName"
          value={formValues.hrName}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formValues.city}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
        />
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formValues.country}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          margin="normal"
          className="custom-focused-border"
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

const SocialForm = ({ userInfo, onSave, setMessage }) => {
  const [formValues, setFormValues] = useState({
    github: userInfo.github || "",
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
      setMessage({
        type: "success",
        text: "Social links updated successfully",
      });
      onSave();
    } catch (error) {
      console.error("Error updating social links", error);
      setMessage({
        type: "error",
        text: "Error updating social links",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Github"
        name="github"
        value={formValues.github}
        onChange={handleChange}
        margin="normal"
        className="custom-focused-border"
      />
      <TextField
        fullWidth
        label="LinkedIn"
        name="linkedIn"
        value={formValues.linkedIn}
        onChange={handleChange}
        margin="normal"
        className="custom-focused-border"
      />
      <TextField
        fullWidth
        label="WhatsApp Number"
        name="whatsapp"
        value={formValues.whatsapp}
        onChange={handleChange}
        margin="normal"
        className="custom-focused-border"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
};

const ChangePasswordForm = ({ onSave, setMessage }) => {
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
      setMessage({
        type: "success",
        text: "Password changed successfully",
      });
      onSave();
    } catch (error) {
      console.error("Error changing password", error);
      setMessage({
        type: "error",
        text: "Error changing password",
      });
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
        autoComplete="current-password"
        className="custom-focused-border"
      />
      <TextField
        fullWidth
        label="New Password"
        name="newPassword"
        type="password"
        value={formValues.newPassword}
        onChange={handleChange}
        margin="normal"
        autoComplete="new-password"
        className="custom-focused-border"
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleChange}
        margin="normal"
        autoComplete="new-password"
        className="custom-focused-border"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Change Password
      </Button>
    </Box>
  );
};

const Company = ({ userInfo, handleProfileUpdate }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [bio, setBio] = useState(userInfo.bio || "");
  const [message, setMessage] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleClose = () => {
    setMessage(null);
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("SHS");
      if (!token) {
        throw new Error("No token found");
      }
      await axios.put(
        "http://localhost:3000/user/updatebio",
        { bio },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setMessage({
        type: "success",
        text: "Bio updated successfully",
      });
    } catch (error) {
      console.error("Error updating bio", error);
      setMessage({
        type: "error",
        text: "Error updating bio",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper sx={{ width: 300, p: 2, mr: 3 }}>
        {message && (
          <CustomSnackbar
            open={true}
            autoHideDuration={2000}
            onClose={handleClose}
            TransitionComponent={Slide}
            severity={message.type}
            message={message.text}
          />
        )}
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
          <Typography variant="h6">{userInfo.companyName}</Typography>
          <Typography variant="h6">{userInfo.hrName}</Typography>
          <Box sx={{ display: "flex", mt: 1 }}>
            <IconButton
              aria-label="LinkedIn"
              sx={{ color: "#0077b5", mx: 0.5 }}
              href={userInfo.linkedIn || ""}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              color="primary"
              href={userInfo.github || ""}
            >
              <GitHub />
            </IconButton>
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
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="custom-focused-border"
          />
          <Button variant="outlined" onClick={handleBioSubmit}>
            Save Bio
          </Button>
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
            setMessage={setMessage}
          />
        )}
        {tabIndex === 1 && (
          <SocialForm
            userInfo={userInfo}
            onSave={handleProfileUpdate}
            setMessage={setMessage}
          />
        )}
        {tabIndex === 2 && (
          <ChangePasswordForm
            onSave={handleProfileUpdate}
            setMessage={setMessage}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Company;
