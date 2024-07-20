import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { useUserInfo } from "../../hooks/useUserInfo";
import JobForm from "./JobForm";

const JobPost = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createNew, setCreateNew] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (userInfo?.info?.companyName) {
        try {
          const response = await axios.get(
            `http://localhost:3000/job/get/${userInfo.info.companyName}`
          );
          console.log(response.data);
          setJobPosts(response.data);
        } catch (error) {
          console.error("There was an error fetching the job posts!", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobPosts();
  }, [userInfo]);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setCreateNew(true);
    // navigate(`/edit-job/${job._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/job/delete/${id}`);
      setJobPosts(jobs.filter((job) => job._id !== id));
      setMessage("Job deleted successfully.");
    } catch (error) {
      console.error("Error deleting job:", error);
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
            my: 5,
          }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
              width: "100%",
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <CircularProgress />
              </Box>
            ) : createNew || jobPosts.length === 0 ? (
              <JobForm job={selectedJob} />
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h5" color={"#018a82"}>
                    Job Posts
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#018a82",
                      "&:hover": {
                        backgroundColor: "#52c9c1",
                      },
                      textTransform: "none",
                      fontSize: 18,
                      fontWeight: "bold",
                      borderRadius: 5,
                    }}
                    onClick={() => {
                      setSelectedJob(null);
                      setCreateNew(true);
                    }}
                  >
                    Create New
                  </Button>
                </Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Job Title</TableCell>
                        <TableCell align="center">Posting Date</TableCell>
                        <TableCell align="center">Deadline</TableCell>
                        <TableCell align="center">Submissions</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobPosts.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.jobTitle}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(row.postedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(row.lastDateToApply).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            {row.applicantCount}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEdit(row)}
                            >
                              <Edit sx={{ color: "orange" }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(row._id)}
                            >
                              <Delete sx={{ color: "red" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
};

export default JobPost;
