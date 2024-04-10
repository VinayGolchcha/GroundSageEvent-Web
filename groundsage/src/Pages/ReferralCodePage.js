import React from "react";
import { Typography, TextField, Box } from "@mui/material";

const ReferralCodePage = () => {
  const labels = [
    "COORDINATOR",
    "STAFF MEMBER",
    "HELPER",
    "HELPER",
    "STAFF MEMBER",
  ];

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        height: "100vh",
        padding: "20px",
      }}
    >
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{ cursor: "pointer" }}
      />
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: "56px",
          fontWeight: "700",
          marginBottom: "20px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
      >
        Events
      </Typography>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.54)",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "400",
          marginBottom: "45px",
        }}
      >
        Share Your Referral Code and Build Your Team!
      </Typography>
      <div
        style={{
          background: "rgb(66, 92, 90)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {labels.map((label, index) => (
          <Box
            key={index}
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "left",
              background: "rgb(78, 101, 100)",
              maxWidth: "fit-content",
              padding: "15px 40px 15px 40px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "25px",
                fontFamily: "Poppins",
                textAlign: "left",
                width: "200px",
              }}
            >
              {label}
            </Typography>
            <TextField
              variant="filled"
              sx={{
                color: "white",
                margin: "0px 10px 0px 30px",
                "& input": { paddingTop: "10px", paddingBottom: "10px" },
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  color: "rgb(250, 236, 191)",
                  background: "rgba(151, 151, 151, 0.73)",
                  borderRadius: "10px",
                  fontSize: "22px",
                },
              }}
            />
            <img
              src="../../Images/copy-content 1.png"
              alt="Share"
              style={{ cursor: "pointer" }}
            />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ReferralCodePage;
