import React, { useState } from "react";
import { Container, Box, Button, Divider, Typography } from "@mui/material";
import CompanySignup from "../components/Company/CompanySignup";
import CandidateSignup from "../components/Candidate/CandidateSignup";

const Signup = () => {
  const [showCompany, setShowCompany] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);

  const handleCompanySignup = () => {
    setShowCompany(true);
    setShowCandidate(false);
  };
  const handleClose = () => {
    setShowCompany(false);
    setShowCandidate(false);
  };

  const handleCandidateSignup = () => {
    setShowCompany(false);
    setShowCandidate(true);
  };

  return (
    <>
      {showCompany ? (
        <CompanySignup onClose={handleClose} />
      ) : showCandidate ? (
        <CandidateSignup onClose={handleClose} />
      ) : (
        <Box
          sx={{
            backgroundColor: "#018a82",
            minHeight: "100vh",
            overflow: "auto",
            margin: "-8px -8px",
          }}
        >
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              padding: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%", textAlign: "center", marginBottom: 2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleCompanySignup}
                  sx={{
                    width: "100%",
                    borderRadius: "50px",
                    backgroundColor: "white",
                    color: "#018a82",
                    "&:hover": {
                      backgroundColor: "#52c9c1",
                      color: "white",
                    },
                    textTransform: "none",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Join as Company
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Divider
                    sx={{
                      width: "50%",
                      marginTop: 2,
                      marginBottom: 2,
                      "&::before, &::after": {
                        borderColor: "white",
                      },
                    }}
                  >
                    <Typography style={{ fontSize: 20, color: "white" }}>
                      OR
                    </Typography>
                  </Divider>
                </Box>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleCandidateSignup}
                  sx={{
                    width: "100%",
                    borderRadius: "50px",
                    backgroundColor: "#018a82",
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#52c9c1",
                    },
                    textTransform: "none",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Join as Candidate
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Signup;
