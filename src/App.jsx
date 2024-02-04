import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompanyDashboard from "./pages/CompanyDashboard";
import "./App.css";
import CandidateDashboard from "./pages/CandidateDashboard";
import { useUserInfo } from "./hooks/useUserInfo";

function App() {
  const { loading, userInfo } = useUserInfo();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {!loading && (
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
        )}
        {/* <Route path="/dashboard" element={<CandidateDashboard />}></Route> */}
        {/* <Route path="/cdashboard" element={<CompanyDashboard />}></Route> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
