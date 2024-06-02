import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import Sidbar from "../Component/Sidbar";
import ProfileAboutpage from "./ProfileAboutpage";
import ProfileEvent from "./ProfileEvent";
import ProfileTeam from "./ProfileTeam";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [content, setContent] = useState("about");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (content) {
      case "about":
        return <ProfileAboutpage />;
      case "eventHistory":
        return <ProfileEvent />;
      case "teams":
        return <ProfileTeam />;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: "rgb(66, 92, 90)", minHeight: "100vh" }}>
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
      <div style={{ flex: 1, paddingLeft: "20px", maxWidth: "100vw" }}>
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            fontSize: { xs: "40px", md: "56px" },
            fontFamily: "Inter",
            fontWeight: "700",
            marginTop: "-30px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          }}
        >
          Profile
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          // width: "100vw", // Adjust as needed
          // justifyContent:"space-around"
        }}
      >
        <Box
          sx={{
            width: "20%",
            // display:"flex",
            // // justifyContent: "center", // Center items horizontally
            // alignItems: "flex-start", // Align items to the start vertically
            marginTop: "15px",
          }}
        >
          {" "}
          {/* Adjust sidebar width */}
          <Sidbar
            onItemClick={(content) => setContent(content)}
            activeContent={content}
          />
        </Box>
        <Box sx={{ width: "80%" }}>
          {" "}
          {/* Adjust content area width */}
          {renderContent()}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
