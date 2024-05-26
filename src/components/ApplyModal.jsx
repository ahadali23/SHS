import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Fade, Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { AttachFile, Close } from "@mui/icons-material";
import { useUserInfo } from "../hooks/useUserInfo";
import axios from "axios";

const ApplyModal = ({ open, handleClose, jobId }) => {
  const { userInfo } = useUserInfo();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.info.firstName || "",
        lastName: userInfo.info.lastName || "",
        email: userInfo.info.email || "",
      });
    }
  }, [userInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("firstName", formData.firstName);
    formDataObj.append("lastName", formData.lastName);
    formDataObj.append("email", formData.email);
    formDataObj.append("file", file);
    formDataObj.append("jobID", jobId);
    formDataObj.append("userID", userInfo.info.userId);

    try {
      const response = await axios.post(
        "http://localhost:3000/apply/application",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error("There was an error submitting the application!", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Apply For This Job
          </Typography>
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <MuiFileInput
              value={file}
              onChange={handleFileChange}
              placeholder="Select CV/Resume"
              InputProps={{
                inputProps: {
                  accept: ".pdf",
                },
                startAdornment: <AttachFile />,
              }}
              clearIconButtonProps={{
                title: "Remove",
                children: <Close fontSize="small" />,
              }}
              sx={{ mt: 1 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" sx={{ ml: 1 }}>
                Send Application
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ApplyModal;
