import React from "react";
import CvUploader from "../components/Candidate/Uploaded CV";
import { Box, Toolbar } from "@mui/material";
import CDashContainer from "../components/Candidate/CDashContainer";

const cvFile = () => {
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
        <CvUploader />
      </Box>
    </Box>
  );
};

export default cvFile;
