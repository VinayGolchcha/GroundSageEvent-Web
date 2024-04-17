import React, { useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReferralCodePage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const labels = [
    "COORDINATOR",
    "STAFF MEMBER",
    "HELPER",
    "HELPER",
    "STAFF MEMBER",
  ];

  // const handleCopyClick = () => {
  //   // Check if there's something to copy
  //   if (inputValue.trim() !== "") {
  //     navigator.clipboard
  //       .writeText(inputValue)
  //       .then(() => {
  //         alert(inputValue);
  //       })
  //       .catch((error) => {
  //         console.error("Unable to copy text: ", error);
  //       });
  //   }
  // };

  const handleCopyClick = () => {
    const textField = document.getElementById("myTextField");
    // Check if the text field exists and has a value
    if (textField && textField.value.trim() !== "") {
      navigator.clipboard
        .writeText(textField.value)
        .then(() => {
          alert("Copied: " + textField.value);
        })
        .catch((error) => {
          console.error("Unable to copy text: ", error);
        });
    }
  };

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        height: "100vh",
        // padding: "20px",
      }}
    >
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{
          cursor: "pointer",
          width: "45px",
          margin: "10px 0px 0px 20px",
        }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: "56px",
          fontWeight: "700",
          marginBottom: "20px",
          marginTop: "-45px",
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
              id="myTextField"
              variant="filled"
              disabled={true}
              value="FLAJDKAFD"
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
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img
              src="../../Images/copy-content 1.png"
              alt="Share"
              style={{ cursor: "pointer" }}
              onClick={() => handleCopyClick(label)}
            />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ReferralCodePage;
