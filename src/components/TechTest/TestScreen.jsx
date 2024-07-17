import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  LinearProgress,
} from "@mui/material";

const questions = [
  {
    question:
      "Which of the following are JavaScript data types? (Select all that apply)",
    options: ["String", "Number", "Function", "Array"],
  },
  {
    question:
      "Which of the following are JavaScript data types? (Select all that apply)",
    options: ["String", "Number", "Function", "Array"],
  },
  {
    question:
      "Which of the following are JavaScript data types? (Select all that apply)",
    options: ["String", "Number", "Function", "Array"],
  },
  // Add more questions as needed
];

const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const timerId = setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timerId);
  }, [time, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <Typography variant="h6">{formatTime(time)}</Typography>;
};

const Question = ({
  question,
  options,
  onSubmit,
  totalQuestions,
  currentQuestion,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([]); // Clear options when the question changes
  }, [question]);

  const handleChange = (event) => {
    const option = event.target.name;
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedOptions);
  };

  const handleTimeUp = () => {
    alert("Time's up!");
    onSubmit(selectedOptions);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4">{`Question ${currentQuestion}/${totalQuestions}`}</Typography>
      </Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{question}</Typography>
        <Timer initialTime={240} onTimeUp={handleTimeUp} />
      </Box>
      <LinearProgress
        variant="determinate"
        value={(currentQuestion / totalQuestions) * 100}
      />
      <FormControl component="fieldset" sx={{ mt: 4 }}>
        <FormGroup>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={handleChange}
                  name={option}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onSubmit(selectedOptions, true)}
        >
          Skip
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {currentQuestion === totalQuestions ? "Submit" : "Next"}
        </Button>
      </Box>
    </Container>
  );
};

const TestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleSubmit = (selectedOptions, skip = false) => {
    console.log("Selected Options:", selectedOptions);
    if (skip) {
      console.log("Question was skipped");
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Quiz finished");
      // Handle end of quiz
    }
  };

  return (
    <Question
      question={questions[currentQuestionIndex].question}
      options={questions[currentQuestionIndex].options}
      onSubmit={handleSubmit}
      totalQuestions={questions.length}
      currentQuestion={currentQuestionIndex + 1}
    />
  );
};

export default TestScreen;
