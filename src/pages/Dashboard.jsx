// DashboardLayout.js
import React from "react";
import { Navigate } from "react-router-dom";
import CompanyDashboard from "../pages/CompanyDashboard";
import CandidateDashboard from "../pages/CandidateDashboard";
import { useUserInfo } from "../hooks/useUserInfo";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { loading, userInfo } = useUserInfo();

  if (loading) {
    return <Loading />;
  }

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return userInfo.role === "company" ? (
    <CompanyDashboard />
  ) : (
    <CandidateDashboard />
  );
};

export default Dashboard;
