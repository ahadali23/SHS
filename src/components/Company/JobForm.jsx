import React, { useState, useEffect } from "react";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Autocomplete,
  Chip,
} from "@mui/material";
import axios from "axios";
import { skillOptions } from "../SkillsList";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState();
  const [position, setPosition] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [postedDate, setPostedDate] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [gender, setGender] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setPostedDate(today);
    console.log(userInfo.info.companyName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/job/post", {
        companyName: userInfo.info.companyName,
        jobTitle,
        position,
        jobCategory,
        jobType,
        vacancy,
        experience,
        skills,
        postedDate,
        lastDateToApply,
        closeDate,
        gender,
        salaryFrom,
        salaryTo,
        city,
        state,
        country,
        educationLevel,
        description,
        status,
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
            <Container maxWidth="md">
              <Typography variant="h4" align="center" gutterBottom>
                Post a Job
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Job Title"
                      variant="outlined"
                      margin="normal"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      variant="outlined"
                      margin="normal"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Job Category</InputLabel>
                      <Select
                        value={jobCategory}
                        onChange={(e) => setJobCategory(e.target.value)}
                        label="Job Category"
                      >
                        <MenuItem value="Category1">Category 1</MenuItem>
                        <MenuItem value="Category2">Category 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="No. of Vacancy"
                      variant="outlined"
                      margin="normal"
                      value={vacancy}
                      onChange={(e) => setVacancy(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Select Experience</InputLabel>
                      <Select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        label="Select Experience"
                      >
                        <MenuItem value="1 yr">1 yr</MenuItem>
                        <MenuItem value="2 yrs">2 yrs</MenuItem>
                        <MenuItem value="3 yrs">3 yrs</MenuItem>
                        <MenuItem value="4+ yrs">4+ yrs</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Posted Date"
                      variant="outlined"
                      margin="normal"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={postedDate}
                      onChange={(e) => setPostedDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Date to Apply"
                      variant="outlined"
                      margin="normal"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={lastDateToApply}
                      onChange={(e) => setLastDateToApply(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Close Date"
                      variant="outlined"
                      margin="normal"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={closeDate}
                      onChange={(e) => setCloseDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Select Gender</InputLabel>
                      <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Select Gender"
                      >
                        <MenuItem value="Any">Any</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Salary From"
                      variant="outlined"
                      margin="normal"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Salary To"
                      variant="outlined"
                      margin="normal"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Enter City"
                      variant="outlined"
                      margin="normal"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Enter State"
                      variant="outlined"
                      margin="normal"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Enter Country"
                      variant="outlined"
                      margin="normal"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Enter Education Level"
                      variant="outlined"
                      margin="normal"
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      variant="outlined"
                      margin="normal"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup
                        row
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <FormControlLabel
                          value="Active"
                          control={<Radio />}
                          label="Active"
                        />
                        <FormControlLabel
                          value="Inactive"
                          control={<Radio />}
                          label="Inactive"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      onClick={() => navigate(-1)}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#018a82",
                        "&:hover": {
                          backgroundColor: "#52c9c1",
                        },
                        textTransform: "none",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
};

export default JobPost;
