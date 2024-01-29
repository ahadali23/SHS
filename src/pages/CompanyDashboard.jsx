import {
  Box,
  Toolbar,
  IconButton,
  List,
  Container,
  Grid,
  Paper,
  Divider,
  Typography,
} from "@mui/material";
import { ChevronLeft, Menu, Notifications, Person } from "@mui/icons-material";
import SHSBar from "../components/SHSBar";
import SHSDrawer from "../components/SHSDrawer";
import React, { useState } from "react";
import { companyListItems, secondaryListItems } from "../components/ListItems";
import {
  ActiveJobs,
  DeleteJobs,
  SuccessHiring,
} from "../components/CompanyDashItems";

const CompanyDashboard = () => {
  const [open, setOpen] = useState(true);
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
            KiloByteZone{" "}
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
          <Divider sx={{ my: 10 }} />
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
          height: "100vh",
          // overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  borderRadius: 5,
                }}
              >
                <ActiveJobs />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  borderRadius: 5,
                }}
              >
                <DeleteJobs />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  borderRadius: 5,
                }}
              >
                <SuccessHiring />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 5,
                  height: 240,
                }}
              >
                {/* */}
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 5,
                  height: 240,
                }}
              >
                {/*  */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CompanyDashboard;
