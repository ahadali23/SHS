import React from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Email, LinkedIn, GitHub, Twitter } from "@mui/icons-material";
import { useUserInfo } from "../../hooks/useUserInfo";

const data = [
  {
    name: "Week 01",
    applicationSent: 40,
    test: 30,
    interviews: 20,
    rejected: 10,
  },
  {
    name: "Week 02",
    applicationSent: 50,
    test: 40,
    interviews: 30,
    rejected: 20,
  },
  {
    name: "Week 03",
    applicationSent: 60,
    test: 50,
    interviews: 40,
    rejected: 30,
  },
  {
    name: "Week 04",
    applicationSent: 70,
    test: 60,
    interviews: 50,
    rejected: 40,
  },
  {
    name: "Week 05",
    applicationSent: 80,
    test: 70,
    interviews: 60,
    rejected: 50,
  },
  {
    name: "Week 06",
    applicationSent: 90,
    test: 80,
    interviews: 70,
    rejected: 60,
  },
  {
    name: "Week 07",
    applicationSent: 100,
    test: 90,
    interviews: 80,
    rejected: 70,
  },
];

const Dashboard = () => {
  const { userInfo } = useUserInfo();
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard title="Apply" count={86} color="#6A1B9A" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard title="Test" count={75} color="#1976D2" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard title="Interviews" count={45} color="#388E3C" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard title="Profile" count={93} color="#FBC02D" />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Profile userInfo={userInfo} />
        </Grid>
        <Grid item xs={12} md={8}>
          <VacancyStats />
        </Grid>
        <Grid item xs={12} md={5}>
          <RecentActivities />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecommendedJobs />
        </Grid>
      </Grid>
    </Box>
  );
};

const InfoCard = ({ title, count, color }) => (
  <Paper
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      bgcolor: color,
      color: "white",
      borderRadius: 2,
    }}
  >
    <Box sx={{ ml: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{count}</Typography>
    </Box>
  </Paper>
);

const VacancyStats = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ mb: 3 }}>
      Vacancy Stats
    </Typography>
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="applicationSent"
            stroke="#6A1B9A"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="test"
            stroke="#1976D2"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="interviews"
            stroke="#388E3C"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="rejected"
            stroke="#ff4d4f"
            strokeWidth={2}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
);

const Profile = ({ userInfo }) => (
  <Paper
    sx={{
      p: 3,
      mb: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Avatar
      src={userInfo.info.picture}
      alt={`${userInfo.info.companyName}`}
      sx={{ width: 100, height: 100, mb: 2 }}
    />
    <Typography variant="h6">{userInfo.info.companyName}</Typography>
    <Typography variant="body2" color="textSecondary">
      Programmer
    </Typography>
    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
      {userInfo.info.email}
    </Typography>
    <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
      <Button variant="outlined" color="primary" size="small">
        PHP
      </Button>
      <Button variant="outlined" color="primary" size="small">
        Vue
      </Button>
      <Button variant="outlined" color="primary" size="small">
        Laravel
      </Button>
    </Box>
    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
      Experienced programmer with a background in web development and software
      engineering. Passionate about building efficient and scalable
      applications.
    </Typography>
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
      <IconButton
        aria-label="email"
        color="primary"
        href={`mailto:${userInfo.info.email}`}
      >
        <Email />
      </IconButton>
      <IconButton
        aria-label="LinkedIn"
        color="primary"
        href="https://www.linkedin.com/in/oda-dink"
      >
        <LinkedIn />
      </IconButton>
      <IconButton
        aria-label="GitHub"
        color="primary"
        href="https://github.com/oda-dink"
      >
        <GitHub />
      </IconButton>
      <IconButton
        aria-label="Twitter"
        color="primary"
        href="https://twitter.com/oda_dink"
      >
        <Twitter />
      </IconButton>
    </Box>
  </Paper>
);

const RecentActivities = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ mb: 3 }}>
      Recent Activities
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {[...Array(4)].map((_, index) => (
        <Typography key={index} variant="body2">
          Your application has been accepted in <strong>3 Vacancies</strong> -{" "}
          {12 - index} hours ago
        </Typography>
      ))}
    </Box>
  </Paper>
);

const RecommendedJobs = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ mb: 3 }}>
      Recommended Jobs
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <JobCard
          title="PHP Programmer"
          salary="$14,000 - $25,000"
          location="London, England"
          company="Maximoz Team"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <JobCard
          title="Senior Programmer"
          salary="$14,000 - $25,000"
          location="Manchester, England"
          company="Klean n Clin Studios"
        />
      </Grid>
    </Grid>
  </Paper>
);

const JobCard = ({ title, salary, location, company }) => (
  <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2" color="textSecondary">
      {company}
    </Typography>
    <Typography variant="body2" sx={{ my: 1 }}>
      {salary}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {location}
    </Typography>
  </Box>
);

export default Dashboard;
