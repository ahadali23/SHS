import React from "react";
import { Box, Toolbar } from "@mui/material";
import ComDashContainer from "../components/Company/ComDashContainer";
import InterviewSetup from "../components/Interview/InterviewSetup";

const InterviewSchedule = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <ComDashContainer />
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
        <InterviewSetup />
      </Box>
    </Box>
  );
};

export default InterviewSchedule;
