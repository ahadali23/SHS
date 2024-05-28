import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [position, setPosition] = useState("");
  const [deadline, setDeadline] = useState("");
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "SQL",
    "Angular",
    "Vue.js",
    "Ruby",
    "C#",
    "C++",
    "PHP",
    "Swift",
    "Kotlin",
    "TypeScript",
    "Bootstrap",
    "jQuery",
    "MongoDB",
    "Redux",
    "Express.js",
    "Django",
    "Flask",
    "Spring Framework",
    "Hibernate",
    "ASP.NET",
    ".NET Core",
    "PHP Laravel",
    "Symfony",
    "ASP.NET MVC",
    "Ruby on Rails",
    "Go (Golang)",
    "Rust",
    "Dart",
    "Flutter",
    "Android Development",
    "iOS Development",
    "Xamarin",
    "GraphQL",
    "AWS (Amazon Web Services)",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing (NLP)",
    "Computer Vision",
    "Artificial Intelligence (AI)",
    "Data Science",
    "Big Data",
    "Hadoop",
    "Spark",
    "Kafka",
    "Elasticsearch",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Git",
    "CI/CD",
    "RESTful APIs",
    "Microservices",
    "OAuth",
    "JSON Web Tokens (JWT)",
    "WebSockets",
    "Firebase",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/job/post", {
        jobTitle,
        jobDescription,
        city,
        country,
        jobType,
        salary,
        skills,
        experience,
        education,
        companyName: userInfo.info.companyName,
        position,
        deadline,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Job post failed:", error.response.data);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            mx: "auto",
            my: 5,
          }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="h4" align="center" gutterBottom>
                Post a Job
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  margin="normal"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Job Description"
                  variant="outlined"
                  margin="normal"
                  multiline
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Position"
                  variant="outlined"
                  margin="normal"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      margin="normal"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      variant="outlined"
                      margin="normal"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    label="Job Type"
                  >
                    <MenuItem value="Full-Time">Full Time</MenuItem>
                    <MenuItem value="Part-Time">Part Time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Salary"
                  variant="outlined"
                  margin="normal"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <Autocomplete
                  multiple
                  fullWidth
                  id="skills"
                  options={skillOptions}
                  freeSolo
                  value={skills}
                  onChange={(event, newValue) => {
                    setSkills(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Skills"
                      placeholder="Select or enter skills"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  label="Experience"
                  variant="outlined"
                  margin="normal"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Education"
                  variant="outlined"
                  margin="normal"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Deadline"
                  variant="outlined"
                  margin="normal"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#018a82",
                    "&:hover": {
                      backgroundColor: "#52c9c1",
                    },
                    textTransform: "none",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Post Job
                </Button>
              </form>
            </Container>
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
};

export default JobPost;
