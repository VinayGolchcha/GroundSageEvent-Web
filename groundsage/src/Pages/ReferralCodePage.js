import React, { useContext } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

const ReferralCodePage = () => {
  const navigate = useNavigate();
  const { RCode } = useContext(AuthContext);

  console.log(RCode);
  const handleCopyClick = (referralCode) => {
    if (referralCode) {
      navigator.clipboard
        .writeText(referralCode)
        .then(() => {
          alert("Copied: " + referralCode);
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
        overflow: "auto",
        padding: "20px 20px 50px 20px",
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
          fontSize: { xs: "30px", sm: "40px", md: "56px" },
          fontWeight: "700",
          marginBottom: "20px",
          marginTop: { xs: "0px", md: "-45px" },
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)",
        }}
      >
        Events
      </Typography>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.54)",
          textAlign: "center",
          fontSize: { xs: "25px", md: "36px" },
          fontWeight: "400",
          marginBottom: "45px",
        }}
      >
        Share Your Referral Code and Build Your Team!
      </Typography>
      <Box
        sx={{
          background: "rgb(66, 92, 90)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: { xs: "20px", md: "0px" },
        }}
      >
        {RCode.map((role, index) => (
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
              marginBottom: "10px", // Added margin for spacing between rows
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: { xs: "20px", md: "25px" },
                fontFamily: "Poppins",
                textAlign: "left",
                width: "200px",
              }}
            >
              {role.role_name.toUpperCase()}
            </Typography>
            <TextField
              id={`referralCode-${index}`}
              variant="filled"
              disabled={true}
              value={role.referral_code}
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
                  fontSize: { xs: "15px", md: "22px" },
                },
              }}
            />
            <img
              src="../../Images/copy-content 1.png"
              alt="Copy"
              style={{ cursor: "pointer" }}
              onClick={() => handleCopyClick(role.referral_code)}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default ReferralCodePage;
