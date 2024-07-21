import React from "react";
import ProfileSetting from "../components/Profile/ProfileSetting";
import { Box, Toolbar } from "@mui/material";
import ComDashContainer from "../components/Company/ComDashContainer";
import CDashContainer from "../components/Candidate/CDashContainer";
import { useUserInfo } from "../hooks/useUserInfo";

const Setting = () => {
  const { userInfo } = useUserInfo();
  return (
    <Box sx={{ display: "flex" }}>
      {userInfo.role === "company" ? <ComDashContainer /> : <CDashContainer />}
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
