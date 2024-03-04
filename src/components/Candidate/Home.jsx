import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import Jobs from "./Jobs";
import { JobStatus } from "./CandidateDashItem";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {/* <Paper
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 5,
                  height: "auto",
                }}
              >
                <Jobs />
              </Paper> */}
          <Jobs />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              borderRadius: 5,
            }}
          >
            <JobStatus />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
              height: 240,
            }}
          >
            {/* */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
              height: 240,
            }}
          >
            {/*  */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
