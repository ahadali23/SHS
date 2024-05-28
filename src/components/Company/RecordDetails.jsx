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
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const steps = ["CV Score", "Test Score", "Interview Score"];

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

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
          <Button variant="outlined" color="success" sx={{ mr: 1 }}>
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
                    <TableCell align="center">{row.interviewScore}</TableCell>
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

  const totalApplicants = applicants.length;

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
      </Paper>
    </Box>
  );
};

export default RecordDetails;
