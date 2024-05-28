import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Grid,
  Paper,
  Collapse,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  TableFooter,
  Divider,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Recordsss = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [filteredJob, setFilteredJob] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRows, setOpenRows] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job/get");
        setJobs(response.data);
        if (response.data.length > 0) {
          setFilteredJob(response.data[0]._id); // default to first job
        }
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/apply/get");
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchJobs();
    fetchApplicants();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeFilter = (event) => {
    setFilteredJob(event.target.value);
    setPage(0);
  };

  const handleToggleRow = (userID) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [userID]: !prevOpenRows[userID],
    }));
  };

  const filteredApplicants = applicants.filter(
    (applicant) => applicant.jobID === filteredJob
  );

  const steps = ["CV Score", "Test Score", "Interview Score"];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            mx: 2,
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
              boxShadow: 3,
              ml: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h5" component="h2">
                Applicants List ({filteredApplicants.length})
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="job-filter-label">Filter by Job</InputLabel>
                <Select
                  labelId="job-filter-label"
                  value={filteredJob}
                  label="Filter by Job"
                  onChange={handleChangeFilter}
                >
                  {jobs.map((job) => (
                    <MenuItem key={job._id} value={job._id}>
                      {job.jobTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell>Applied as</TableCell>
                    <TableCell>Applied on</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApplicants
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((applicant) => (
                      <React.Fragment key={applicant.userID}>
                        <TableRow>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleToggleRow(applicant.userID)}
                            >
                              {openRows[applicant.userID] ? (
                                <KeyboardArrowUp fontSize="small" />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                src={applicant.avatar}
                                alt={
                                  applicant.firstName + " " + applicant.lastName
                                }
                                sx={{ marginRight: 1 }}
                              />
                              <Typography>
                                {applicant.firstName + " " + applicant.lastName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{applicant.appliedAs}</TableCell>
                          <TableCell>
                            {new Date(applicant.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ mr: 1 }}
                            >
                              View
                            </Button>
                            <Button variant="contained" color="error">
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Collapse
                              in={openRows[applicant.userID]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box
                                sx={{
                                  margin: 1,
                                  p: 2,
                                  border: 1,
                                  borderColor: "grey.300",
                                  borderRadius: 2,
                                  backgroundColor: "grey.100",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                >
                                  Progress
                                </Typography>
                                <Stepper activeStep={0} alternativeLabel>
                                  {steps.map((label) => (
                                    <Step key={label}>
                                      <StepLabel>{label}</StepLabel>
                                    </Step>
                                  ))}
                                </Stepper>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                  sx={{ mt: 2 }}
                                >
                                  Performance
                                </Typography>
                                <Table size="small" aria-label="performance">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>CV Score</TableCell>
                                      <TableCell>Test Score</TableCell>
                                      <TableCell>Interview Score</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>{applicant.cvScore}</TableCell>
                                      <TableCell>
                                        {applicant.testScore}
                                      </TableCell>
                                      <TableCell>
                                        {applicant.interviewScore}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      component="div"
                      count={filteredApplicants.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
};

export default Recordsss;
