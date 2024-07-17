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
import { Email, Phone, LocationOn } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ApplicationDetails = () => {
  const location = useLocation();
  const { row } = location.state || { row: {} };
  const pdfUrl = row.file;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    const fileName = `${row.firstName}_${row.lastName}_CV.pdf`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container component="main" maxWidth="lg" sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, margin: "auto" }}
                src={row.picture}
                alt={`${row.firstName} ${row.lastName}`}
              />
              <Typography variant="h6" align="center">
                {row.firstName} {row.lastName}
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
              </Box>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Contact Me
              </Button>
              <Button
                onClick={handleDownload}
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
              >
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
              {/* pdf here */}
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfUrl} />
              </Worker>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ApplicationDetails;
