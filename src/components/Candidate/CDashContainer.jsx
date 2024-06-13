import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  List,
  Divider,
  Typography,
  InputBase,
  Box,
  Avatar,
} from "@mui/material";
import { ChevronLeft, Menu, Notifications, Search } from "@mui/icons-material";
import SHSBar from "../SHSBar";
import SHSDrawer from "../SHSDrawer";
import NotificationPopover from "../NotificationPopover"; // Import the new component
import { candidateListItems, secondaryListItems } from "../ListItems";
import { useUserInfo } from "../../hooks/useUserInfo";

const CDashContainer = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { loading, userInfo } = useUserInfo();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SHSBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
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
          <Box
            sx={{
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
                borderRadius: "20px",
                backgroundColor: "white",
                paddingLeft: "40px",
              }}
            />
            <Search
              sx={{
                mt: "3px",
                color: "#018a82",
                fontSize: "25px",
                position: "absolute",
                left: "10px",
                zIndex: 1,
              }}
            />
          </Box>
          <IconButton
            sx={{ fontSize: "1rem", color: "white" }}
            onClick={handleNotificationsClick}
          >
            <Notifications />
          </IconButton>
          <NotificationPopover
            anchorEl={anchorEl}
            handleClose={handleNotificationsClose}
          />
          <Typography
            component="div"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ display: "flex", alignItems: "center" }}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                {userInfo && (
                  <>
                    {userInfo.info.firstName} {userInfo.info.lastName}
                    <Avatar
                      sx={{ ml: 2 }}
                      src={userInfo.info.picture || "path_to_default_avatar"}
                      alt={`${userInfo.info.firstName} ${userInfo.info.lastName}`}
                    />
                  </>
                )}
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
    </>
  );
};

export default CDashContainer;
