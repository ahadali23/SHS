import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
import { useUserInfo } from "../../hooks/useUserInfo";

const JobDetails = () => {
  const { userInfo } = useUserInfo();
  const [open, setOpen] = useState(false);
  const [btnText, setBtnText] = useState("Apply Now");
  const [timeAgo, setTimeAgo] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [applied, setApplied] = useState(false); // Track if user has applied

  const location = useLocation();
  const { job } = location.state || {};

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (job && job.postedDate) {
      const postDate = new Date(job.postedDate);
      const currentTime = new Date();
      const timeDifference = Math.floor((currentTime - postDate) / (1000 * 60)); // in minutes

      if (timeDifference < 1) {
        setTimeAgo("Now");
      } else if (timeDifference < 60) {
        setTimeAgo(`${timeDifference} min ago`);
      } else if (timeDifference < 1440) {
        const hours = Math.floor(timeDifference / 60);
        setTimeAgo(`${hours} hour${hours !== 1 ? "s" : ""} ago`);
      } else {
        const days = Math.floor(timeDifference / 1440);
        setTimeAgo(`${days} day${days !== 1 ? "s" : ""} ago`);
      }
    }
  }, [job]);

  useEffect(() => {
    const fetchAppliedStatus = async () => {
      const id = userInfo.info.userId;
      console.log(id)
      try {
        const response = await axios.get(
          `http://localhost:3000/apply/find/${userInfo.info.userId}`
        );
        const applicantApplied = response.data;
        if (applicantApplied.length > 0) {
          setBtnText("Applied");
          setApplied(true); // Set applied state to true if user has applied
        }
      } catch (error) {
        console.error("Error fetching applicants for job:", error);
      } finally {
        setLoading(false); // Update loading state after fetch
      }
    };

    fetchAppliedStatus();
  }, [userInfo.info.userId]);

  const handleApply = () => {
    if (!applied) {
      handleOpen(); // Open apply modal if user hasn't applied
    }
  };

  if (!job || loading) {
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
                {job.vacancy} Vacancy
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
              {job.description}
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
                  value: `${job.location.city}, ${job.location.country}`,
                },
                {
                  icon: <AttachMoney />,
                  label: "Offered Salary",
                  value: `${job.salaryFrom} - ${job.salaryTo}`,
                },
                {
                  icon: <School />,
                  label: "Qualification",
                  value: job.educationLevel,
                },
                {
                  icon: <Business />,
                  label: "Industry",
                  value: job.jobIndustry,
                },
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
                    <Typography>{item.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="medium"
              sx={{
                mt: 2,
                backgroundColor: applied ? "#52c9c1" : "#018a82",
                "&:hover": {
                  backgroundColor: applied ? "#52c9c1" : "#52c9c1",
                },
                textTransform: "none",
                fontSize: 16,
                fontWeight: "bold",
                cursor: applied ? "not-allowed" : "pointer",
                pointerEvents: applied ? "none" : "auto",
              }}
              onClick={handleApply}
              disabled={applied}
            >
              {btnText}
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
