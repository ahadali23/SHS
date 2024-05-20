import React from "react";
import { Box, Toolbar } from "@mui/material";
import CDashContainer from "../components/Candidate/CDashContainer";
import Jobs from "../components/Candidate/Jobs";

const BrowseJobs = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CDashContainer />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          // overflow: "auto",
        }}
      >
        <Toolbar />
        {/* here */}
        <Jobs />
      </Box>
    </Box>
  );
};

export default BrowseJobs;
