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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

const testTypes = [
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "true-false", label: "True/False" },
  { value: "short-answer", label: "Short Answer" },
];

const sampleQuestions = [
  {
    id: 0,
    question:
      "Which of the following is not a programming language commonly used in full-stack development?",
    options: ["Java", "Python", "HTML", "C#"],
    answer: "HTML",
  },
  {
    id: 1,
    question:
      "Which database type is often associated with full-stack development?",
    options: ["Relational", "NoSQL", "Both", "Neither"],
    answer: "Both",
  },
  {
    id: 2,
    question: "What does CSS stand for in web development?",
    options: [
      "Cascading Style Sheet",
      "Creative Style Sheet",
      "Computer Style Sheet",
      "Coded Style Sheet",
    ],
    answer: "Cascading Style Sheet",
  },
  {
    id: 3,
    question: "Which of the following is not a JavaScript framework?",
    options: ["React", "Vue.js", "Angular", "Hibernate"],
    answer: "Hibernate",
  },
  {
    id: 4,
    question:
      "Which protocol is commonly used for communication between a web server and a client?",
    options: ["HTTP", "FTP", "SSH", "SMTP"],
    answer: "HTTP",
  },
  {
    id: 5,
    question:
      "What is the purpose of RESTful API in full-stack development?",
    options: [
      "To handle server-side operations",
      "To manage databases",
      "To format web pages",
      "To enhance security",
    ],
    answer: "To handle server-side operations",
  },
  {
    id: 6,
    question: "What does MVC stand for in the context of web development?",
    options: [
      "Model View Controller",
      "Most Valuable Code",
      "Master Visual Components",
      "Multiple View Configuration",
    ],
    answer: "Model View Controller",
  },
  {
    id: 7,
    question: "Which of the following is not a version control system?",
    options: ["Git", "Mercurial", "SVN", "HTTP"],
    answer: "HTTP",
  },
  {
    id: 8,
    question: "What does API stand for in web development?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Interaction",
      "Automated Process Integration",
      "All Purpose Interface",
    ],
    answer: "Application Programming Interface",
  },
  {
    id: 9,
    question: "Which of the following is a server-side scripting language?",
    options: ["HTML", "CSS", "JavaScript", "PHP"],
    answer: "PHP",
  },
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
    customQuestion: "",
    answer: "",
  });

  const [questions, setQuestions] = useState(sampleQuestions); // Initialize questions state with null

  // useEffect(() => {
  //   // Fetch questions from the API when the component mounts
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/test/get");
  //       setQuestions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching questions:", error);
  //     }
  //   };

  //   fetchQuestions();
  // }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/test/add-questions",
        {
          ...formData,
          job_id: job._id, // Ensure job_id is correctly included in the request body
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        {questions ? (
          <Grid container spacing={2}>
            {questions.map((question, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography variant="h6">Question {index + 1}:</Typography>
                  <Typography variant="body1">{question.question}</Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography variant="body1">Options:</Typography> */}
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
          <>
            <Typography variant="h4" gutterBottom>
              Test Details Form
            </Typography>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Custom Question"
                    name="customQuestion"
                    multiline
                    rows={4}
                    value={formData.customQuestion}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Answer"
                    name="answer"
                    multiline
                    rows={2}
                    value={formData.answer}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AddQuestions;
