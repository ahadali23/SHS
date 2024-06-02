import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  TextField,
  Paper,
} from "@mui/material";

const questions = [
  "What is your name?",
  "Why do you want this job?",
  "What are your strengths and weaknesses?",
];

function Interview({ stream }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }

    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleNextQuestion();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording, stream]);

  const startRecording = () => {
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
    clearInterval(timerRef.current);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60); // Reset timer for the next question
    } else {
      stopRecording();
      alert("Interview completed");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {isRecording && (
        <>
          <Typography variant="h5" gutterBottom>
            {questions[currentQuestionIndex]}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Time left: {timeLeft}s
          </Typography>
        </>
      )}
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      ></video>
      {!isRecording ? (
        <Button variant="contained" color="primary" onClick={startRecording}>
          Go
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
  const [hasPermissions, setHasPermissions] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [stream, setStream] = useState(null);
  const [startInterview, setStartInterview] = useState(false); // New state for starting the interview
  const videoRef = useRef(null);

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
      requestMediaPermissions();
    } else {
      alert("Invalid code");
    }
  };

  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
      setHasPermissions(true);
      setShowInstructions(true); // Show instructions after permissions are granted
    } catch (err) {
      alert("Media permissions denied");
    }
  };

  const handleStartInterview = () => {
    setShowInstructions(false);
    setStartInterview(true);
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
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
              fullWidth
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
        ) : !hasPermissions ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Typography variant="h4" gutterBottom>
              Requesting Media Permissions...
            </Typography>
          </Box>
        ) : showInstructions ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Typography variant="h4" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please ensure you are in a quiet environment with a good internet
              connection. Make sure your face is clearly visible and the audio
              is clear. You will have 1 minute to answer each question. Click
              "Start Interview" when you are ready.
            </Typography>
            <video
              ref={videoRef}
              autoPlay
              style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
            ></video>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartInterview}
              style={{ marginTop: "20px" }}
            >
              Start Interview
            </Button>
          </Box>
        ) : (
          startInterview && <Interview stream={stream} /> // Render the Interview component when startInterview is true
        )}
      </Paper>
    </Container>
  );
};

export default InterviewScreen;
