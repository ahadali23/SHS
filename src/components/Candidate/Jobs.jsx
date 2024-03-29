import React from "react";
import { Box, Typography, Button, IconButton, Paper } from "@mui/material";
import { Share, BookmarkBorder } from "@mui/icons-material";

const jobs = [
  {
    title: "Software Engineer",
    company: "ABC Tech",
    address: "Karachi, Pakistan",
  },
  {
    title: "Data Analyst",
    company: "XYZ Corp",
    address: "Karachi, Pakistan",
  },
  {
    title: "Frontend Developer",
    company: "123 Web Solutions",
    address: "New York, USA",
  },
  {
    title: "UX/UI Designer",
    company: "Design Innovations",
    address: "London, UK",
  },
  {
    title: "Full Stack Developer",
    company: "Tech Hub",
    address: "San Francisco, USA",
  },
];

const Jobs = () => {
  return (
    <div>
      {jobs.map((job, index) => (
        <Paper
          key={index}
          sx={{
            m: 2,
            borderRadius: 10, // Adjust the value for desired curveness
            padding: 1,
          }}
        >
          <Box sx={{ p: 2, mb: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#018a82",
                fontWeight: "bold",
              }}
            >
              {job.title}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small" color="primary">
                  <Share sx={{ color: "#018a82", fontSize: "2rem" }} />
                </IconButton>
                <IconButton size="small" color="primary">
                  <BookmarkBorder sx={{ color: "#018a82", fontSize: "2rem" }} />
                </IconButton>
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {job.company}
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {job.address}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                display: "block",
                backgroundColor: "#018a82",
                "&:hover": {
                  backgroundColor: "#52c9c1",
                },
                textTransform: "none",
              }}
            >
              Details
            </Button>
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default Jobs;
