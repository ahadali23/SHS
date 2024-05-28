import React from "react";
import { Box, Toolbar } from "@mui/material";
import ComDashContainer from "../components/Company/ComDashContainer";
import RecordDetails from "../components/Company/RecordDetails";

const CanRecDetails = () => {
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
        <RecordDetails />
      </Box>
    </Box>
  );
};

export default CanRecDetails;
