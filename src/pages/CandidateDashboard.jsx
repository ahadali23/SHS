import {
  Box,
  Toolbar,
  IconButton,
  List,
  Divider,
  Typography,
  InputBase,
} from "@mui/material";
import {
  ChevronLeft,
  Menu,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import SHSBar from "../components/SHSBar";
import SHSDrawer from "../components/SHSDrawer";
import React, { useState } from "react";
import {
  candidateListItems,
  secondaryListItems,
} from "../components/ListItems";
import CDashContainer from "../components/Candidate/CDashContainer";
import Home from "../components/Candidate/Home";

const CandidateDashboard = () => {
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
        <Home />
      </Box>
    </Box>
  );
};

export default CandidateDashboard;
