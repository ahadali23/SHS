import { CheckCircle, Delete, Work } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import React from "react";

const ActiveJobs = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          backgroundColor: "#018a82",
          color: "white",
          padding: "10px",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        gutterBottom
      >
        Activated Jobs
      </Typography>
      <Typography
        component="p"
        variant="h4"
        sx={{
          color: "black",
          mt: 8,
          fontSize: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        05 <Work sx={{ color: "green", fontSize: "45px", ml: "5px" }} />
      </Typography>
    </Box>
  );
};

const DeleteJobs = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          backgroundColor: "#018a82",
          color: "white",
          padding: "10px",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        gutterBottom
      >
        Deleted Jobs
      </Typography>
      <Typography
        component="p"
        variant="h4"
        sx={{
          color: "black",
          mt: 8,
          fontSize: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        02 <Delete sx={{ color: "red", fontSize: "45px", ml: "5px" }} />
      </Typography>
    </Box>
  );
};

const SuccessHiring = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          backgroundColor: "#018a82",
          color: "white",
          padding: "10px",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        gutterBottom
      >
        Successful Hires
      </Typography>
      <Typography
        component="p"
        variant="h4"
        sx={{
          color: "black",
          mt: 8,
          fontSize: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        20 <CheckCircle sx={{ color: "green", fontSize: "45px", ml: "5px" }} />
      </Typography>
    </Box>
  );
};

export { ActiveJobs, DeleteJobs, SuccessHiring };
