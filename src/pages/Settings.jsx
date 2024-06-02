import React from "react";
import ProfileSetting from "../components/ProfileSetting";
import { Box, Toolbar } from "@mui/material";
import CDashContainer from "../components/Candidate/CDashContainer";

const Setting = () => {
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
        <ProfileSetting />
      </Box>
    </Box>
  );
};

export default Setting;
