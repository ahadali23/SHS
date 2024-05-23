import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const JobDetails = () => {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1">
        {job.jobTitle}
      </Typography>
      <Typography variant="h6" component="h2">
        {job.companyName}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {job.location.city}, {job.location.country}
      </Typography>
      {/* Add more job details as needed */}
    </Box>
  );
};

export default JobDetails;
