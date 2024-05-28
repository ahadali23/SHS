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

const TestSetup = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job/get");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleListItemClick = (job) => {
    const detailUrl = `/add-questions/${job._id}`;
    navigate(detailUrl, { state: { job } });
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
                <ListItemText primary={job.jobTitle} />
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

export default TestSetup;
