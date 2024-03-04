import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";

const JobStatus = () => {
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
        Job Status
      </Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        {[
          {
            label: "Apply",
            number: 5,
            icon: <Delete sx={{ color: "red", fontSize: "5px", ml: "5px" }} />,
          },
          {
            label: "Rejected",
            number: 1,
            icon: <Delete sx={{ color: "red", fontSize: "5px", ml: "5px" }} />,
          },
          {
            label: "Ongoing",
            number: 4,
            icon: <Delete sx={{ color: "red", fontSize: "5px", ml: "5px" }} />,
          },
        ].map(({ label, number, icon }) => (
          <Box
            key={number}
            sx={{
              position: "relative",
              mx: 1,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">{number}</Typography>
            </Paper>
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                bottom: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { JobStatus };
