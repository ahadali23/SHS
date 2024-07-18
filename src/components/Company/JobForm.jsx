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
import { industries } from "../IndustryList";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../CustomSnackbar";

const JobPost = ({ job }) => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState(job?.jobTitle || "");
  const [position, setPosition] = useState(job?.position || "");
  const [jobIndustry, setJobIndustry] = useState(job?.jobIndustry || "");
  const [jobType, setJobType] = useState(job?.jobType || "");
  const [vacancy, setVacancy] = useState(job?.vacancy || "");
  const [experience, setExperience] = useState(job?.experience || "");
  const [skills, setSkills] = useState(job?.skills || []);
  const [postedDate, setPostedDate] = useState(job?.postedDate || "");
  const [lastDateToApply, setLastDateToApply] = useState(
    job?.lastDateToApply || ""
  );
  const [closeDate, setCloseDate] = useState(job?.closeDate || "");
  const [gender, setGender] = useState(job?.gender || "");
  const [salaryFrom, setSalaryFrom] = useState(job?.salaryFrom || "");
  const [salaryTo, setSalaryTo] = useState(job?.salaryTo || "");
  const [city, setCity] = useState(job?.location.city || "");
  const [state, setState] = useState(job?.location.state || "");
  const [country, setCountry] = useState(job?.location.country || "");
  const [educationLevel, setEducationLevel] = useState(
    job?.educationLevel || ""
  );
  const [description, setDescription] = useState(job?.description || "");
  const [status, setStatus] = useState(job?.status || "Active");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if ((job && job.postedDate) || job.lastDateToApply) {
      try {
        const postDate = new Date(job.postedDate);
        const last = new Date(job.lastDateToApply);
        const formatPostDate = postDate.toISOString().slice(0, 10);
        const formatLastDate = last.toISOString().slice(0, 10);
        setPostedDate(formatPostDate);
        setLastDateToApply(formatLastDate);
      } catch (error) {
        console.error("Error parsing postedDate:", error);
        setPostedDate(new Date().toISOString().slice(0, 10));
      }
    } else {
      const today = new Date().toISOString().slice(0, 10);
      setPostedDate(today);
    }
  }, [job]);
  useEffect(() => {
    if (lastDateToApply) {
      const nextDay = new Date(
        new Date(lastDateToApply).getTime() + 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10);
      setCloseDate(nextDay);
    }
  }, [lastDateToApply]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await axios.post("http://localhost:3000/job/post", {
        companyName: userInfo.info.companyName,
        jobTitle,
        position,
        jobIndustry,
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
      setMessage({
        type: "success",
        text: "Job Added Successfully",
      });
      console.log(response.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
      console.error("Job post failed:", error.response.data);
    }
  };

  const handleClose = () => {
    setMessage(null);
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
              <Typography
                component="h1"
                variant="h4"
                color={"#018a82"}
                align="center"
                gutterBottom
              >
                Post a Job
              </Typography>
              <form onSubmit={handleSubmit}>
                {message && (
                  <CustomSnackbar
                    open={true}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    transistion={Slide}
                    severity={message.type}
                    message={message.text}
                  />
                )}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Job Title"
                      variant="outlined"
                      margin="normal"
                      value={jobTitle}
                      autoFocus
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      className="custom-focused-border"
                    >
                      <InputLabel>Industry</InputLabel>
                      <Select
                        value={jobIndustry}
                        onChange={(e) => setJobIndustry(e.target.value)}
                        label="Job Industry"
                        required
                        className="custom-focused-border"
                      >
                        {industries.map((industry) => (
                          <MenuItem key={industry} value={industry}>
                            {industry}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      className="custom-focused-border"
                    >
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
                      required
                      className="custom-focused-border"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      className="custom-focused-border"
                      variant="outlined"
                      margin="normal"
                      required
                    >
                      <InputLabel>Select Experience</InputLabel>
                      <Select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        label="Select Experience"
                      >
                        <MenuItem value="Fresh">Fresh</MenuItem>
                        <MenuItem value="<1 yr">&lt;1 yr</MenuItem>
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
                      className="custom-focused-border"
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={option}
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            sx={{
                              backgroundColor: "#018a82",
                              color: "white",
                              fontWeight: "bold",
                            }}
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Select Gender</InputLabel>
                      <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Select Gender"
                        required
                        className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
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
                      required
                      className="custom-focused-border"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup
                        row
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{
                          "& .MuiRadio-root": {
                            color: "#018a82",
                          },
                          "& .Mui-checked": {
                            color: "#018a82",
                          },
                        }}
                      >
                        <FormControlLabel
                          value="Active"
                          control={
                            <Radio
                              sx={{
                                color: "#018a82",
                                "&.Mui-checked": {
                                  color: "#018a82",
                                },
                              }}
                            />
                          }
                          label="Active"
                        />
                        <FormControlLabel
                          value="Inactive"
                          control={
                            <Radio
                              sx={{
                                color: "#018a82",
                                "&.Mui-checked": {
                                  color: "#018a82",
                                },
                              }}
                            />
                          }
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
