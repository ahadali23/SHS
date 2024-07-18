import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  List,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { ChevronLeft, Menu, Notifications } from "@mui/icons-material";
import SHSBar from "../SHSBar";
import SHSDrawer from "../SHSDrawer";
import { companyListItems, secondaryListItems } from "../ListItems";
import { useUserInfo } from "../../hooks/useUserInfo";

const ComDashContainer = () => {
  const [open, setOpen] = useState(true);
  const { loading, userInfo } = useUserInfo();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
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
                {userInfo && (
                  <>
                    {userInfo.info.companyName}
                    <Avatar
                      sx={{ ml: 2 }}
                      src={userInfo.info.picture || "path_to_default_avatar"}
                      alt={`${userInfo.info.companyName}`}
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
          {companyListItems}
          <Divider sx={{ my: 4 }} />
          {secondaryListItems}
        </List>
      </SHSDrawer>
    </>
  );
};

export default ComDashContainer;
