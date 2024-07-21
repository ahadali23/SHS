import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const InterviewQuestions = () => {
  const location = useLocation();
  const { job } = location.state || { job: {} };
  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewWindowStart: "",
    interviewWindowEnd: "",
    interviewDuration: "",
  });

  const [interviewSchedules, setInterviewSchedules] = useState([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchInterviewSchedules = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/interview/interview-schedules"
      );
      if (response.data) {
        setInterviewSchedules(response.data);
      } else {
        setInterviewSchedules([]);
      }
    } catch (error) {
      console.error("Error fetching interview schedules:", error);
    }
  };

  useEffect(() => {
    fetchInterviewSchedules();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (event) => {
    setCustomQuestion(event.target.value);
  };

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/interview/interview-schedules/${job._id}/questions`,
        {
          question: customQuestion,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCustomQuestion("");
      setOpen(false);
      fetchInterviewSchedules();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/interview/interview-schedules",
        { ...formData, job_id: job._id },
        { headers: { "Content-Type": "application/json" } }
      );
      setFormData({
        interviewDate: "",
        interviewWindowStart: "",
        interviewWindowEnd: "",
        interviewDuration: "",
      });
      fetchInterviewSchedules();
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
  };

  const handleOpen = (question = null) => {
    setSelectedQuestion(question);
    setCustomQuestion(question ? question.text : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuestion(null);
    setCustomQuestion("");
  };

  const handleUpdateQuestion = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/interview/interview-schedules/${job._id}/questions/${selectedQuestion._id}`,
        {
          question: customQuestion,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCustomQuestion("");
      setOpen(false);
      fetchInterviewSchedules();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(
        `http://localhost:3000/interview/interview-schedules/${job._id}/questions/${questionId}`
      );
      fetchInterviewSchedules();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Schedule Interview
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Interview Date"
                  type="date"
                  name="interviewDate"
                  InputLabelProps={{ shrink: true }}
                  value={formData.interviewDate}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Interview Window Start Time"
                  type="time"
                  name="interviewWindowStart"
                  InputLabelProps={{ shrink: true }}
                  value={formData.interviewWindowStart}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Interview Window End Time"
                  type="time"
                  name="interviewWindowEnd"
                  InputLabelProps={{ shrink: true }}
                  value={formData.interviewWindowEnd}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Interview Duration (minutes)"
                  type="number"
                  name="interviewDuration"
                  value={formData.interviewDuration}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Schedule Interview
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Questions
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            startIcon={<AddIcon />}
          >
            Add Question
          </Button>
          {interviewSchedules.length > 0 ? (
            interviewSchedules.map((schedule) => (
              <Box key={schedule._id} sx={{ my: 2 }}>
                <Typography variant="h6">
                  Interview Schedule: {schedule.interviewDate}
                </Typography>
                <List>
                  {schedule.questions.map((question, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleOpen(question)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteQuestion(question._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText primary={question.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          ) : (
            <Typography>No questions available.</Typography>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedQuestion ? "Update Question" : "Add Custom Question"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={customQuestion}
            onChange={handleQuestionChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={
              selectedQuestion ? handleUpdateQuestion : handleAddQuestion
            }
            color="primary"
          >
            {selectedQuestion ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InterviewQuestions;
