import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TablePagination,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const steps = ["CV Score", "Test Score", "Interview Score"];

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleListItemClick = (row) => {
    const detailUrl = `/application/${row._id}`;
    console.log(row)
    navigate(detailUrl, { state: { row } });
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.firstName} {row.lastName}
        </TableCell>
        <TableCell align="center">{row.cvScore}</TableCell>
        <TableCell align="center">
          {new Date(row.date).toLocaleDateString()}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            color="success"
            sx={{ mr: 1 }}
            onClick={() => {
              handleListItemClick(row);
            }}
          >
            View
          </Button>
          <Button variant="contained" color="error">
            Reject
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
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
                    <TableCell align="center">CV Score</TableCell>
                    <TableCell align="center">Test Score</TableCell>
                    <TableCell align="center">Interview Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{row.cvScore}</TableCell>
                    <TableCell align="center">{row.testScore}</TableCell>
                    <TableCell align="center">{row.interviewScores.score}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const RecordDetails = () => {
  const location = useLocation();
  const { job, applicants } = location.state || { job: {}, applicants: [] };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalApplicants = applicants.length;
  const paginatedApplicants = applicants.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box m={3}>
      <Paper sx={{ borderRadius: 8, height: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {job.jobTitle}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Total Applicants: {totalApplicants}
        </Typography>
        <TableContainer>
          <Table aria-label="collapsible table" sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">CV Score</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.map((row) => (
                <Row key={row.firstName + row.lastName} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalApplicants}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default RecordDetails;
