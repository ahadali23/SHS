import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CDashContainer from "./CDashContainer";

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
  // ... other questions ...
];

const CandidateTest = () => {
    console.log('ad')
  const location = useLocation();
  const { test } = location.state || { test: {} };
  const [questions, setQuestions] = useState(sampleQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/test/${test._id}/questions`);
  //       setQuestions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching questions:", error);
  //     }
  //   };

  //   fetchQuestions();
  // }, [test._id]);

  const handleAnswerChange = (event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    try {
      await axios.post(`http://localhost:3000/test/${test._id}/submit`, {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
        })),
      });
      alert("Test submitted successfully!");
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (testCompleted) {
    return (
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Test Completed</Typography>
          <Typography variant="body1">
            You have answered all the questions.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitTest}
            sx={{ mt: 2 }}
          >
            Submit Test
          </Button>
        </Box>
      </Container>
    );
  }

  const question = questions[currentQuestion];

  return (<>
    <Container>

      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Question {currentQuestion + 1}
          </Typography>
          <Typography variant="h6">{question.question}</Typography>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Options:</FormLabel>
            <RadioGroup
              name={`question-${currentQuestion}`}
              value={answers[currentQuestion] || ""}
              onChange={handleAnswerChange}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={`${String.fromCharCode(65 + index)}. ${option}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2">
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
      </Box>
    </Container>
    </>
  );
};

export default CandidateTest;
