import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { useUserInfo } from "./hooks/useUserInfo";
import Loading from "./components/Loading";
import CvFile from "./pages/CvFile";
import JobPosting from "./pages/JobPosting";
import BrowseJobs from "./pages/BrowseJobs";
import Interview from "./pages/Interview";
import InterviewSetup from "./pages/InterviewSetup";
import JobInfo from "./pages/JobInfo";
import CandidateRecords from "./pages/CandidateRecords";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CanRecDetails from "./pages/CanRecDetails";
import ApplicantInfo from "./pages/ApplicantInfo";
import QuestionSetup from "./pages/QuestionSetup";
import Test from "./pages/Test";
import TechTest from "./pages/TechTest";
import Settings from "./pages/Settings";
import CompanyDashboard from "./pages/CompanyDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

function App() {
  const { loading, userInfo } = useUserInfo();
  if (loading) {
    return <Loading />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            userInfo.role === "company" ? (
              <CompanyDashboard />
            ) : (
              <CandidateDashboard />
            )
          }
        />
        <Route path="/file" element={<CvFile />} />
        <Route path="/postjob" element={<JobPosting />} />
        <Route path="/jobs" element={<BrowseJobs />} />
        <Route path="/candidate-record" element={<CandidateRecords />} />
        <Route path="/test-setup" element={<Test />} />
        <Route path="/test" element={<TechTest />} />
        <Route path="/record-details/:job_id" element={<CanRecDetails />} />
        <Route path="/application/:applicant_id" element={<ApplicantInfo />} />
        <Route path="/add-questions/:id" element={<QuestionSetup />} />
        <Route path="/jobs/:companyName/:jobTitle" element={<JobInfo />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interview-questions" element={<InterviewSetup />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
