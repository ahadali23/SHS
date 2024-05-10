import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompanyDashboard from "./pages/CompanyDashboard";
import "./App.css";
import CandidateDashboard from "./pages/CandidateDashboard";
import { useUserInfo } from "./hooks/useUserInfo";
import Loading from "./components/Loading";
import CvFile from "./pages/CvFile";
import JobPosting from "./pages/JobPosting";

function App() {
  const { loading, userInfo } = useUserInfo();
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
      </Routes>
    </Router>
  );
}

export default App;
