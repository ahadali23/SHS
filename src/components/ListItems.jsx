import React from "react";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  Settings,
  Logout,
  Home,
  FolderOpen,
  PostAdd,
  UploadFile,
  PsychologyAlt,
  Forum,
  BookmarkBorder,
  Quiz,
  HeadsetMic,
  Feedback,
} from "@mui/icons-material";

const logout = () => {
  // Clear the authentication token from local storage
  localStorage.removeItem("SHS");
  // Redirect the user to the login page
  window.location.href = "/";
};

export const companyListItems = (
  <React.Fragment>
    <ListItemButton id="homeButton" component={Link} to="/dashboard">
      <ListItemIcon>
        <Home sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton id="PostJobButton" component={Link} to="/postjob">
      <ListItemIcon>
        <PostAdd sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Post Job" />
    </ListItemButton>
    <ListItemButton id="RecordButton" component={Link} to="/candidate-record">
      <ListItemIcon>
        <FolderOpen sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Candidate Record" />
    </ListItemButton>
    <ListItemButton id="testButton" component={Link} to="/test-setup">
      <ListItemIcon>
        <PsychologyAlt sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Technical Test" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PsychologyAlt sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Logical Questions" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Forum sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Onsite Meeting" />
    </ListItemButton>
  </React.Fragment>
);

export const candidateListItems = (
  <React.Fragment>
    <ListItemButton id="homeButton" component={Link} to="/dashboard">
      <ListItemIcon>
        <Home sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton id="browseJobsButton" component={Link} to="/jobs">
      <ListItemIcon>
        <UploadFile sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Browse Jobs" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookmarkBorder sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Saved Jobs" />
    </ListItemButton>
    <ListItemButton id="testButton" component={Link} to="/test">
      <ListItemIcon>
        <Quiz sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Technical Test" />
    </ListItemButton>
    <ListItemButton id="interviewButton" component={Link} to="/interview">
      <ListItemIcon>
        <HeadsetMic sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Interview Scheduler" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Feedback sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Interview Feedback" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton id="settingButton" component={Link} to="/setting">
      <ListItemIcon>
        <Settings sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton onClick={logout}>
      <ListItemIcon>
        <Logout sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
