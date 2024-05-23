import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";

const JobDetails = () => {
  const location = useLocation();
  const { job } = location.state || {};

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
              // ml:1,
              display: "flex",
              flexDirection: "column",
              height: 240,
              // borderRadius: 5,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <Paper
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              // borderRadius: 5,
              height: 240,
            }}
          >
            <Box>
              <Typography>Job Overview</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobDetails;

{
  /* <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1">
        {job.jobTitle}
      </Typography>
      <Typography variant="h6" component="h2">
        {job.companyName}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {job.location.city}, {job.location.country}
      </Typography>
    </Box> */
}
