import { useState, useEffect } from "react";
import axios from "axios";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({ info: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("SHS");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:3000/user/userinfo",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log(response, "res");
        setUserInfo({ info: response.data.userInfo, role: response.data.role });
      } catch (error) {
        console.error("Error fetching user info", error);
        setError("Error fetching user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return {
    userInfo,
    loading,
    error,
    tokenExists: Boolean(localStorage.getItem("SHS")),
  };
};
