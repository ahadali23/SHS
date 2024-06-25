import React from "react";
import { Box, Toolbar } from "@mui/material";
import CDashContainer from "../components/Candidate/CDashContainer";
import Jobs from "../components/Candidate/Jobs";
import CandidateTest from "../components/Candidate/CandidateTest";

const TechnicalTest = () => {
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
          // overflow: "auto",
        }}
      >
        <Toolbar />
        {/* here */}
        <CandidateTest />
      </Box>
    </Box>
  );
};

export default TechnicalTest;
