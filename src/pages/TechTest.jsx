import React from "react";
import { Box, Toolbar } from "@mui/material";
import CDashContainer from "../components/Candidate/CDashContainer";
import TestScreen from "../components/TechTest/TestScreen";

const TechTest = () => {
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
        <TestScreen />
      </Box>
    </Box>
  );
};

export default TechTest;