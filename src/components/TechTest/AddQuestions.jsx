import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const testTypes = [
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "true-false", label: "True/False" },
  { value: "short-answer", label: "Short Answer" },
];

const AddQuestions = () => {
  const location = useLocation();
  const { job } = location.state || { job: {} };
  const [formData, setFormData] = useState({
    testDate: "",
    testWindowStart: "",
    testWindowEnd: "",
    testDuration: "",
    testType: "",
    numberOfQuestions: "",
  });

  const [questions, setQuestions] = useState([]);
  const [customQuestionData, setCustomQuestionData] = useState({
    question: "",
    type: "",
    options: [],
    answer: "",
  });
  const [open, setOpen] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/test/get");
      console.log(response.data);
      if (response.data.length > 0) {
        setQuestions(response.data[0].questions);
        console.log(questions);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCustomQuestionChange = (event) => {
    const { name, value } = event.target;
    setCustomQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOption = () => {
    setCustomQuestionData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ""],
    }));
  };

  const handleOptionChange = (event, index) => {
    const newOptions = customQuestionData.options.slice();
    newOptions[index] = event.target.value;
    setCustomQuestionData((prevData) => ({
      ...prevData,
      options: newOptions,
    }));
  };

  const handleDeleteOption = (index) => {
    const newOptions = customQuestionData.options.slice();
    newOptions.splice(index, 1);
    setCustomQuestionData((prevData) => ({
      ...prevData,
      options: newOptions,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/test/add-test",
        {
          ...formData,
          job_id: job._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setFormData({
        testDate: "",
        testWindowStart: "",
        testWindowEnd: "",
        testDuration: "",
        testType: "",
        numberOfQuestions: "",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCustomQuestionSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/test/add-custom-question",
        {
          ...customQuestionData,
          job_id: job._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setCustomQuestionData({
        question: "",
        type: "",
        options: [],
        answer: "",
      });
      setOpen(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Test Details Form
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Test Date"
                  type="date"
                  name="testDate"
                  InputLabelProps={{ shrink: true }}
                  value={formData.testDate}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Test Window Start Time"
                  type="time"
                  name="testWindowStart"
                  InputLabelProps={{ shrink: true }}
                  value={formData.testWindowStart}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Test Window End Time"
                  type="time"
                  name="testWindowEnd"
                  InputLabelProps={{ shrink: true }}
                  value={formData.testWindowEnd}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Test Duration (minutes)"
                  type="number"
                  name="testDuration"
                  value={formData.testDuration}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Test Type</InputLabel>
                  <Select
                    name="testType"
                    value={formData.testType}
                    onChange={handleChange}
                    label="Test Type"
                  >
                    {testTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Questions"
                  type="number"
                  name="numberOfQuestions"
                  value={formData.numberOfQuestions}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add Custom Question
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box sx={{ my: 4 }}>
          {questions.length > 0 ? (
            <Grid container spacing={2}>
              {questions.map((question, index) => (
                <React.Fragment key={question._id.$oid}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Question {index + 1}:</Typography>
                    <Typography variant="body1">{question.question}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {question.options.map((option, optionIndex) => (
                      <Typography
                        key={optionIndex}
                        variant="body2"
                      >{`${String.fromCharCode(
                        65 + optionIndex
                      )}. ${option}`}</Typography>
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Answer:</Typography>
                    <Typography variant="body2">{question.answer}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          ) : (
            <Typography>No questions available.</Typography>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Custom Question</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Question"
              name="question"
              value={customQuestionData.question}
              onChange={handleCustomQuestionChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={customQuestionData.type}
              onChange={handleCustomQuestionChange}
              label="Type"
            >
              {testTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {customQuestionData.type === "multiple-choice" && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Options:
              </Typography>
              {customQuestionData.options.map((option, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <TextField
                    fullWidth
                    value={option}
                    onChange={(e) => handleOptionChange(e, index)}
                    label={`Option ${index + 1}`}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteOption(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddOption}
              >
                Add Option
              </Button>
            </Box>
          )}
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Answer"
              name="answer"
              value={customQuestionData.answer}
              onChange={handleCustomQuestionChange}
              required
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCustomQuestionSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddQuestions;
