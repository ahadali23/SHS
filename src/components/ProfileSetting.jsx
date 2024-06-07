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
  Tab,
  Tabs,
  Typography,
  Button,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
} from "@mui/icons-material";

const ProfileOverview = ({ userInfo }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" paragraph>
        Developer with over 5 years' experience working in both the public and
        private sectors. Diplomatic, personable, and adept at managing sensitive
        situations. Highly organized, self-motivated, and proficient with
        computers. Looking to boost students’ satisfactions scores for
        International University. Bachelor’s degree in communications.
      </Typography>
      <Typography variant="body1" paragraph>
        It describes the candidate's relevant experience, skills, and
        achievements. The purpose of this career summary is to explain your
        qualifications for the job in 3-5 sentences and convince the manager to
        read the whole resume document.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Education
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              B
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary="BCA - Bachelor of Computer Applications"
            secondary={
              <>
                International University - (2004 - 2010)
                <Typography variant="body2" color="textSecondary">
                  There are many variations of passages of available, but the
                  majority alteration in some form. As a highly skilled and
                  successful product development and design specialist with more
                  than 4 Years of My experience.
                </Typography>
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              M
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary="MCA - Master of Computer Application"
            secondary={
              <>
                International University - (2010 - 2012)
                <Typography variant="body2" color="textSecondary">
                  There are many variations of passages of available, but the
                  majority alteration in some form. As a highly skilled and
                  successful product development and design specialist with more
                  than 4 Years of My experience.
                </Typography>
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              D
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary="Design Communication Visual"
            secondary={
              <>
                International University - (2012 - 2015)
                <Typography variant="body2" color="textSecondary">
                  There are many variations of passages of available, but the
                  majority alteration in some form. As a highly skilled and
                  successful product development and design specialist with more
                  than 4 Years of My experience.
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
      <Typography variant="h5" gutterBottom>
        Experiences
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              W
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary="Web Design & Development Team Leader"
            secondary={
              <>
                International University - (2012 - 2015)
                <Typography variant="body2" color="textSecondary">
                  There are many variations of passages of available, but the
                  majority alteration in some form. As a highly skilled and
                  successful product development and design specialist with more
                  than 4 Years of My experience.
                </Typography>
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              S
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary="Senior Software Engineer"
            secondary={
              <>
                International University - (2015 - 2018)
                <Typography variant="body2" color="textSecondary">
                  There are many variations of passages of available, but the
                  majority alteration in some form. As a highly skilled and
                  successful product development and design specialist with more
                  than 4 Years of My experience.
                </Typography>
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              P
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary="Project Manager"
            secondary={
              <>
                International University - (2018 - Present)
                <Typography variant="body2" color="textSecondary">
                  There are many variations of passages of available, but the
                  majority alteration in some form. As a highly skilled and
                  successful product development and design specialist with more
                  than 4 Years of My experience.
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

const ProfileSettingsForm = ({ userInfo, onSave }) => {
  const [formValues, setFormValues] = useState({
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    email: userInfo.email || "",
    phone: userInfo.phone || "",
    city: userInfo.city || "",
    country: userInfo.country || "",
    address: userInfo.address || "",
  });
  const [profilePic, setProfilePic] = useState(null);

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
      alert("Profile updated successfully");
      onSave();
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Profile Settings
        </Typography>
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
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input type="file" hidden onChange={handleProfilePicChange} />
          </Button>
        </Box>
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

const ProfileSetting = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    address: "",
    picture: null,
  });

  useEffect(() => {
    // Fetch user info from API or state management
    // Assuming this data comes from an API or context
    const fetchedUserInfo = {
      firstName: "Jansh",
      lastName: "Dickens",
      email: "Jansh@gmail.com",
      phone: "+2 345 678 0000",
      city: "New Caledonia",
      country: "New Caledonia",
      address: "Some address",
      picture: null, // Assuming this is the base64 string of the picture
    };
    setUserInfo({
      ...userInfo,
      ...fetchedUserInfo,
      picture: fetchedUserInfo.picture
        ? `data:${fetchedUserInfo.picture.contentType};base64,${fetchedUserInfo.picture.data}`
        : "/assets/avatar.png",
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleProfileUpdate = () => {
    // Logic to handle profile update, e.g., refetch user info
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
          <Typography variant="h6">Jansh Dickens</Typography>
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
              <ListItemText primary="Jansh@gmail.com" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary="+2 345 678 0000" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary="New Caledonia" />
            </ListItem>
          </List>
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
          <Tab label="Settings" />
        </Tabs>
        {tabIndex === 0 && <ProfileOverview userInfo={userInfo} />}
        {tabIndex === 1 && (
          <ProfileSettingsForm
            userInfo={userInfo}
            onSave={handleProfileUpdate}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ProfileSetting;
