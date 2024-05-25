import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  Chip,
  Modal,
  TextField,
  Backdrop,
  Fade,
} from "@mui/material";
import {
  Work,
  AccessTime,
  LocationOn,
  AttachMoney,
  School,
  Business,
  Schedule,
  Group,
} from "@mui/icons-material";
import { MuiFileInput } from 'mui-file-input'

const JobDetails = () => {
  const location = useLocation();
  const { job } = location.state || {};

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            sx={{
              mt: 2,
              p: 3,
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              {job.jobTitle}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Group sx={{ color: "#018a82", mr: 1 }} />
              <Typography variant="body1" sx={{ mr: 2 }}>
                8 Vacancy
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {[
                {
                  label: "Employee type",
                  value: "Full Time",
                },
                { label: "Position", value: "Senior" },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.label}
                    </Typography>
                    <Typography>{item.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Job Description
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              As a Product Designer, you will work within a Product Delivery
              Team fused with UX, engineering, product and data talent. You will
              help the team design beautiful interfaces that solve business
              challenges for our clients. We work with a number of Tier 1 banks
              on building web-based applications for AML, KYC and Sanctions List
              management workflows. This role is ideal if you are looking to
              segue your career into the FinTech or Big Data arenas.
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Responsibilities
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              As a Product Designer, you will work within a Product Delivery
              Team fused with UX, engineering, product and data talent. You
              will:
              <ul>
                <li>Have sound knowledge of commercial activities.</li>
                <li>
                  Build next-generation web applications with a focus on the
                  client side.
                </li>
                <li>
                  Work on multiple projects at once, and consistently meet draft
                  deadlines.
                </li>
                <li>
                  Have already graduated or are currently in any year of study.
                </li>
                <li>
                  Revise the work of previous designers to create a unified
                  aesthetic for our brand materials.
                </li>
              </ul>
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Qualification
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <ul>
                <li>
                  B.C.A / M.C.A under National University course complete.
                </li>
                <li>3 or more years of professional design experience.</li>
                <li>
                  Have already graduated or are currently in any year of study.
                </li>
                <li>
                  Advanced degree or equivalent experience in graphic and web
                  design.
                </li>
              </ul>
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Skill & Experience
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <ul>
                <li>Understanding of key Design Principal.</li>
                <li>Proficiency With HTML, CSS, Bootstrap.</li>
                <li>WordPress: 1 year (Required).</li>
                <li>
                  Experience designing and developing responsive design
                  websites.
                </li>
                <li>Web designing: 1 year (Preferred).</li>
              </ul>
            </Typography>
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {job.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    backgroundColor: "#018a82",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <Paper
            sx={{
              mt: 2,
              p: 2,
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              borderRadius: 2,
              height: "auto", // Adjusted height to fit all content
              // backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Job Overview
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                {
                  icon: <Work />,
                  label: "Job Title",
                  value: "Product Designer",
                },
                {
                  icon: <AccessTime />,
                  label: "Experience",
                  value: "0-3 Years",
                },
                { icon: <LocationOn />, label: "Location", value: "New York" },
                {
                  icon: <AttachMoney />,
                  label: "Offered Salary",
                  value: "$35k - $45k",
                },
                {
                  icon: <School />,
                  label: "Qualification",
                  value: "Bachelor Degree",
                },
                { icon: <Business />, label: "Industry", value: "Private" },
                {
                  icon: <Schedule />,
                  label: "Date Posted",
                  value: "Posted 2 hrs ago",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#EBE9FE",
                      color: "#018a82",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ ml: 0 }}>{item.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{
                mt: 2,
                backgroundColor: "#018a82",
                "&:hover": {
                  backgroundColor: "#52c9c1",
                },
                textTransform: "none",
                fontSize: 16,
                fontWeight: "bold",
              }}
              onClick={handleOpen}
            >
              Apply Now
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="medium"
              sx={{
                mt: 2,
                color: "#F6CC53",
                backgroundColor: "#FEF7E5",
                // "&:hover": {
                //   backgroundColor: "#52c9c1",
                // },
                textTransform: "none",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add To Bookmark
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Apply For This Job
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Message"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
              <MuiFileInput value={file} onChange={handleChange} />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" sx={{ ml: 1 }}>
                  Send Application
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default JobDetails;
