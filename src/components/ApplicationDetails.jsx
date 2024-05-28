import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Email, Phone, LocationOn, Language } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ApplicationDetails = () => {
  const location = useLocation();
  const { row } = location.state || { row: {} };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container component="main" maxWidth="lg" sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, margin: "auto" }}
                src="https://via.placeholder.com/100"
                alt="Profile Picture"
              />
              <Typography variant="h6" align="center">
                {row.firstName + row.lastName}
              </Typography>
              <Typography variant="body2" align="center">
                Full Stack Developer
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Profile Overview</Typography>
                <Typography variant="body2">
                  Categories: Software / IT
                </Typography>
                <Typography variant="body2">
                  Offered Salary: $450 per hour
                </Typography>
                <Typography variant="body2">Languages: English</Typography>
                <Typography variant="body2">Experience: 3 Years</Typography>
                <Typography variant="body2">
                  Qualification: Associate Degree
                </Typography>
                {/* <Typography variant="body2">Views: 2574</Typography> */}
              </Box>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Contact Me
              </Button>
              <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                Download CV
              </Button>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Professional Skills</Typography>
                <List>
                  <ListItem>UI Design</ListItem>
                  <ListItem>Web Design</ListItem>
                  <ListItem>Responsive Design</ListItem>
                  <ListItem>Mobile App Design</ListItem>
                </List>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Contact Details</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText primary={row.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText primary="Dodge City, Louisiana" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText primary="+1452 125-6789" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 2, mb: 2 }}>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body2">
                Very well thought out and articulate communication. Clear
                milestones, deadlines and fast work. Patience. Infinite
                patience. No shortcuts. Even if the client is being careless.
              </Typography>
            </Paper>
            <Paper sx={{ padding: 2, mb: 2 }}>
              <Typography variant="h6">Education</Typography>
              <Typography variant="body2">
                <b>BCA - Bachelor of Computer Applications</b> <br />
                International University (2004 - 2010)
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <b>MCA - Master of Computer Application</b> <br />
                International University (2010 - 2012)
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <b>Design Communication Visual</b> <br />
                International University (2012 - 2015)
              </Typography>
            </Paper>
            <Paper sx={{ padding: 2, mb: 2 }}>
              <Typography variant="h6">Experience</Typography>
              <Typography variant="body2">
                <b>Web Design & Development Team Leader</b> <br />
                Creative Agency (2013 - 2016)
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <b>Project Manager</b> <br />
                Jobcy Technology Pvt.Ltd. (2016 - Present)
              </Typography>
            </Paper>
            <Paper sx={{ padding: 2, mb: 2 }}>
              <Typography variant="h6">Projects</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Project 1"
                  style={{ width: "100%" }}
                />
                <img
                  src="https://via.placeholder.com/150"
                  alt="Project 2"
                  style={{ width: "100%" }}
                />
              </Box>
            </Paper>
            {/* <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Add a Review</Typography>
              <TextField label="Your Name" fullWidth sx={{ mt: 1 }} />
              <TextField label="Email" fullWidth sx={{ mt: 1 }} />
              <TextField label="Subject" fullWidth sx={{ mt: 1 }} />
              <TextField
                label="Review"
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit Review
              </Button>
            </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ApplicationDetails;
