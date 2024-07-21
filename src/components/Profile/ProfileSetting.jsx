import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Company from "./Company";
import Candidate from "./Candidate";

const ProfileSetting = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("SHS");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("http://localhost:3000/user/userinfo", {
        headers: {
          "x-auth-token": token,
        },
      });
      const fetchedUserInfo = response.data.userInfo;
      console.log(fetchedUserInfo)
      const userRole = response.data.role;
      setUserInfo({
        ...fetchedUserInfo,
        picture: fetchedUserInfo.picture,
        role: userRole,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleProfileUpdate = () => {
    fetchUserInfo();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {userInfo.role === "company" ? (
        <Company
          userInfo={userInfo}
          handleProfileUpdate={handleProfileUpdate}
        />
      ) : (
        <Candidate
          userInfo={userInfo}
          handleProfileUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default ProfileSetting;
