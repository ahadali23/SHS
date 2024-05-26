import React, { useState, useEffect } from "react";
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
import ApplyModal from "../ApplyModal";

const JobDetails = () => {
  const [open, setOpen] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  const location = useLocation();
  const { job } = location.state || {};

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!job) {
    return <Typography>Loading...</Typography>;
  }
  useEffect(() => {
    if (job && job.postDate) {
      const postDate = new Date(job.postDate);
      const currentTime = new Date();
      const timeDifference = Math.floor((currentTime - postDate) / (1000 * 60)); // in minutes

      if (timeDifference < 1) {
        setTimeAgo("Now");
      } else if (timeDifference < 60) {
        setTimeAgo(`${timeDifference} min ago`);
      } else if (timeDifference < 1440) {
        const hours = Math.floor(timeDifference / 60);
        setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      } else {
        const days = Math.floor(timeDifference / 1440);
        setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
      }
    }
  }, [job]);

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
                2 Vacancy
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {[
                {
                  label: "Employee type",
                  value: job.jobType,
                },
                { label: "Position", value: job.position },
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
              {job.jobDescription}
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
              height: "auto",
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
                  value: job.jobTitle,
                },
                {
                  icon: <AccessTime />,
                  label: "Experience",
                  value: job.experience,
                },
                {
                  icon: <LocationOn />,
                  label: "Location",
                  value: job.location.city + ", " + job.location.country,
                },
                {
                  icon: <AttachMoney />,
                  label: "Offered Salary",
                  value: job.salary,
                },
                {
                  icon: <School />,
                  label: "Qualification",
                  value: job.education,
                },
                { icon: <Business />, label: "Industry", value: "Private" },
                {
                  icon: <Schedule />,
                  label: "Date Posted",
                  value: timeAgo,
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

      <ApplyModal open={open} handleClose={handleClose} jobId={job._id} />
    </Container>
  );
};

export default JobDetails;
