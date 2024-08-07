import React from "react";
import { Box, Toolbar } from "@mui/material";
import ComDashContainer from "../components/Company/ComDashContainer";
import InterviewQuestions from "../components/Interview/InterviewQuestions";

const AddInterview = () => {
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
        <InterviewQuestions />
      </Box>
    </Box>
  );
};

export default AddInterview;
