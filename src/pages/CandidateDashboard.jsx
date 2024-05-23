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
import { useUserInfo } from "../hooks/useUserInfo";
import Home from "../components/Candidate/Home";

const CandidateDashboard = () => {
  const [open, setOpen] = useState(true);
  const { loading, userInfo } = useUserInfo();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SHSBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu sx={{ fontSize: "2.5rem" }} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              right: 300,
            }}
          >
            <InputBase
              placeholder="Search..."
              sx={{
                color: "#018a82",
                borderRadius: "20px", // Adjust the value for the desired radius
                backgroundColor: "white",
                paddingLeft: "40px", // Space for the icon
              }}
            />
            <Search
              sx={{
                mt: "3px",
                color: "#018a82",
                fontSize: "25px",
                position: "absolute",
                left: "10px", // Adjust the value for the desired position
                zIndex: 1, // Set a higher zIndex value
              }}
            />
          </div>
          <IconButton
            sx={{
              fontSize: "1rem",
              color: "white",
            }}
          >
            <Notifications />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              color: "white",
              m: "2px 5px",
              p: "2px 5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                {userInfo &&
                  userInfo.info.firstName + " " + userInfo.info.lastName}{" "}
                <IconButton
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "#018a82",
                    fontSize: "1rem",
                    ml: "5px",
                  }}
                >
                  <Person />
                </IconButton>
              </>
            )}
          </Typography>
        </Toolbar>
      </SHSBar>
      <SHSDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft sx={{ fontSize: "2.5rem" }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {candidateListItems}
          <Divider sx={{ my: 4 }} />
          {secondaryListItems}
        </List>
      </SHSDrawer>
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
