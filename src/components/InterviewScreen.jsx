import React, { useState, useRef } from "react";
import { Button, Box, Typography, Container, TextField } from "@mui/material";

const questions = [
  "What is your name?",
  "Why do you want this job?",
  "What are your strengths and weaknesses?",
];

function Interview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const videoRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoRef.current.srcObject = stream;
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      stopRecording();
      alert("Interview completed");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h5" gutterBottom>
        {questions[currentQuestionIndex]}
      </Typography>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      ></video>
      {!isRecording ? (
        <Button variant="contained" color="primary" onClick={startRecording}>
          Start Interview
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNextQuestion}
        >
          Next Question
        </Button>
      )}
    </Box>
  );
}

const InterviewScreen = () => {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const verifyCode = async () => {
    const response = await fetch("http://localhost:3000/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    if (result.success) {
      setIsVerified(true);
    } else {
      alert("Invalid code");
    }
  };

  return (
    <Container>
      {!isVerified ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Enter Your Code
          </Typography>
          <TextField
            label="Code"
            variant="outlined"
            value={code}
            onChange={handleCodeChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={verifyCode}
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Interview />
      )}
    </Container>
  );
};

export default InterviewScreen;
