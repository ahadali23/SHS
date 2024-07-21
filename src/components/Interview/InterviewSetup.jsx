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

const InterviewSetup = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const fetchJobs = async () => {
      if (userInfo?.info?.companyName) {
        try {
          const response = await axios.get(
            `http://localhost:3000/job/get/${userInfo.info.companyName}`
          );
          setJobs(response.data);
          setLoaded(true);
        } catch (error) {
          console.error("Error fetching job listings:", error);
        }
      }
    };
    fetchJobs();
  }, [userInfo]);

  const handleListItemClick = (job) => {
    const detailUrl = `/add-interview/${job._id}`;
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
            {jobs.map((job, index) => (
              <ListItem
                key={job._id}
                divider
                onClick={() => handleListItemClick(job)}
                sx={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${
                    index * 0.1
                  }s, transform 0.5s ease ${index * 0.1}s`,
                  my: 2,
                  "&:hover": {
                    transform: "translate(10px, -5px)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                  },
                  "&:focus": {
                    transform: "translate(10px, -5px)",
                    transition: "transform 0.3s ease",
                  },
                }}
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

export default InterviewSetup;
