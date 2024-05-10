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

export const companyListItems = (
  <React.Fragment>
    <ListItemButton id="PostJobButton" component={Link} to="/postjob">
      <ListItemIcon>
        <PostAdd sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Post Job" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FolderOpen sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Candidate Record" />
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
    <ListItemButton>
      <ListItemIcon>
        <UploadFile sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Browse Jobs" />
    </ListItemButton>
    <ListItemButton id="uploadedCVButton" component={Link} to="/file">
      <ListItemIcon>
        <UploadFile sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Uploaded CV" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookmarkBorder sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Saved Jobs" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Quiz sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Technical Test" />
    </ListItemButton>
    <ListItemButton>
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
    <ListItemButton>
      <ListItemIcon>
        <Settings sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Logout sx={{ color: "#018a82", fontSize: "2.5rem" }} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
