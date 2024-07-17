import React, { useState, useRef, useEffect } from "react";
import { Button, Box, Typography, Container, Paper } from "@mui/material";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import axios from "axios";

const questions = [
  "What is your name?",
  "Why do you want this job?",
  "What are your strengths and weaknesses?",
];

function Interview({ stream }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const recordRTC = useRef(null);
  const webcamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      startRecording();
      startTimer();
    } else {
      stopRecording();
      clearInterval(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const startRecording = () => {
    const options = {
      mimeType: "video/mp4",
    };
    recordRTC.current = RecordRTC(stream, options);
    recordRTC.current.startRecording();
  };

  const stopRecording = () => {
    if (recordRTC.current) {
      recordRTC.current.stopRecording(() => {
        const blob = recordRTC.current.getBlob();
        const mp4Blob = new Blob([blob], { type: "video/mp4" });
        saveRecording(mp4Blob);
        // saveRecording(blob);
      });
    }
  };

  const saveRecording = (blob) => {
    const formData = new FormData();
    formData.append("video", blob, "interview.mp4");

    const token = localStorage.getItem("SHS");
    console.log("Retrieved Token: ", token);

    axios
      .post("http://localhost:3000/interview/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token, // Include the token in the headers
        },
      })
      .then((response) => {
        console.log("Video uploaded successfully", response.data);
        alert("Interview completed and video uploaded for analysis.");
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
        alert("Error uploading video. Please try again.");
      });
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNextQuestion();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60); // Reset timer for the next question
    } else {
      setIsRecording(false);
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
      <Webcam
        ref={webcamRef}
        audio={true}
        videoConstraints={{ facingMode: "user" }}
        style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      />
      {!isRecording ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsRecording(true)}
        >
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
  const [isVerified, setIsVerified] = useState(false);
  const [stream, setStream] = useState(null);

  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
      setIsVerified(true);
    } catch (err) {
      alert("Media permissions denied");
    }
  };

  useEffect(() => {
    if (!isVerified) {
      requestMediaPermissions();
    }
  }, [isVerified]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 5, marginTop: 10 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          {!isVerified ? (
            <Typography variant="h4" gutterBottom>
              Requesting Media Permissions...
            </Typography>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1" gutterBottom>
                Please ensure you are in a quiet environment with a good
                internet connection. Make sure your face is clearly visible and
                the audio is clear. You will have 1 minute to answer each
                question. Click "Go" to start the interview.
              </Typography>
              <Interview stream={stream} />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default InterviewScreen;
