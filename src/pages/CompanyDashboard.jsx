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
import ComDashContainer from "../components/Company/ComDashContainer";
import Home from "../components/Company/Home";

const CompanyDashboard = () => {
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
        <Home />
      </Box>
    </Box>
  );
};

export default CompanyDashboard;
