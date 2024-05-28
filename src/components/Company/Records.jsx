import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Records = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job/get");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/apply/get");
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchJobs();
    fetchApplicants();
  }, []);

  const handleListItemClick = (job) => {
    console.log("Jobs:", jobs);
    console.log("Applicants:", applicants);
    const detailUrl = `/record-details/${job._id}`;
    navigate(detailUrl, { state: { job, applicants } });
  };

  const countApplicantsForJob = (jobId) => {
    return applicants.filter((applicant) => applicant.jobID === jobId).length;
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Current Jobs
      </Typography>
      {jobs.length > 0 ? (
        <Paper elevation={3}>
          <List>
            {jobs.map((job) => (
              <ListItem
                key={job._id}
                divider
                onClick={() => handleListItemClick(job)}
              >
                <ListItemText
                  primary={job.jobTitle}
                  secondary={`Total Applicants: ${countApplicantsForJob(
                    job._id
                  )}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Box textAlign="center" marginTop="2rem">
          <Typography variant="body1">No jobs available.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Records;
