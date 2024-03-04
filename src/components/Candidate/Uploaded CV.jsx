import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { CloudUpload, Clear } from "@mui/icons-material";
import axios from "axios";
import { useUserInfo } from "../../hooks/useUserInfo";

const CvUploader = () => {
  const { userInfo } = useUserInfo();

  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInDB, setFileInDB] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [buttonText, setButtonText] = useState("Upload");
  const [cvFile, setCvFile] = useState({ fileName: null, file: null });

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/file/get/${userInfo.info._id}`
        );
        setCvFile({
          fileName: response.data.fileName,
          file: response.data.file,
        });
        setButtonText("Edit");
        setFileInDB(true);
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };
    fetchCV();
  }, [userInfo]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  }, []);

  const handleFileChange = (file) => {
    setLoading(true);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = useCallback((event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setButtonText("Save");
      handleFileChange(files[0]);
    }
  }, []);

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    switch (buttonText) {
      case "Upload":
      case "Save":
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("candidateId", userInfo.info._id);

        try {
          const response = await axios.post(
            "http://localhost:3000/file/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          window.location.reload();
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        break;
      case "Edit":
        setEditMode(true);
        setFileInDB(false);
        console.log(editMode + "" + fileInDB + " " + buttonText);
        break;
      default:
        console.log("eroor");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            mx: "auto",
            my: 10,
          }}
        >
          {(!fileInDB || editMode === true) && (
            <Paper
              variant="outlined"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
                padding: 8,
                textAlign: "center",
                cursor: "pointer",
                background: dragOver ? "#eee" : "#fafafa",
                position: "relative",
              }}
            >
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChange}
              />
              <label htmlFor="raised-button-file">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <CloudUpload style={{ fontSize: 60 }} />
                  </IconButton>
                  <Typography>
                    Drag and drop files here or click to select files
                  </Typography>
                </Box>
              </label>
              {loading && (
                <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Paper>
          )}

          {selectedFile && (
            <Box mt={3}>
              <Typography variant="body1" mb={2}>
                {selectedFile.name}
                <Clear
                  color="error"
                  sx={{ fontSize: 16, cursor: "pointer", ml: 3 }}
                  onClick={handleClearFile}
                />
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ display: "block", m: "auto" }}
                onClick={handleUpload}
              >
                {buttonText}
              </Button>
            </Box>
          )}
          {fileInDB && cvFile && (
            <Box mt={3}>
              <Typography variant="body1" mb={2}>
                {cvFile.fileName}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ display: "block", m: "auto" }}
                onClick={handleUpload}
              >
                {buttonText}
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default CvUploader;
