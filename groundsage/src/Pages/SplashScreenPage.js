import { Typography, Button } from "@mui/material";
import React from "react";

const SplashScreenPage = () => {
  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        opacity: 0.9,
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="../../../Images/Splash Screen.png"
          alt="Right Arrow"
          style={{ marginTop: "50px" }}
        />
      </div>
      <Typography
        sx={{
          color: "rgb(24, 49, 47)",
          textAlign: "center",
          fontSize: { lg: "40px", sm: "20px", xs: "18px" },
          fontFamily: "Denk One",
          marginTop: "30px",
          letterSpacing: "4px", // Add space between words
          textTransform: "uppercase",
        }}
      >
        Your One-Stop Solution for Seamless Event Management!
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "rgb(247, 230, 173)",
            color: "rgb(91, 94, 97)",
            padding: "13px 10px 13px 50px",
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px", // Add border radius
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
            fontSize: "16px",
          }}
        >
          LET'S START
          <img
            src="../../../Images/Group 4.svg"
            alt="Right Arrow"
            style={{ marginLeft: "40px" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default SplashScreenPage;
