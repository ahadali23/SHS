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
import { useUserInfo } from "../../hooks/useUserInfo";

const Records = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const fetchJobs = async () => {
      if (userInfo?.info?.companyName) {
        try {
          const response = await axios.get(
            `http://localhost:3000/job/get/${userInfo.info.companyName}`
          );
          setJobs(response.data);
        } catch (error) {
          console.error("Error fetching job listings:", error);
        }
      }
    };
    fetchJobs();
  }, [userInfo]);

  const handleListItemClick = async (job) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/apply/get/${job._id}`
      );
      const applicantsForJob = response.data;
      console.log(applicantsForJob);
      const detailUrl = `/record-details/${job._id}`;
      navigate(detailUrl, { state: { job, applicants: applicantsForJob } });
    } catch (error) {
      console.error("Error fetching applicants for job:", error);
    }
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
                  secondary={`Total Applicants: ${job.applicantCount}`}
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
