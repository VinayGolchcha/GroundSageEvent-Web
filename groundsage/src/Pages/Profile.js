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
    <Box
      sx={{
        background: "rgb(66, 92, 90)",
        pb: "30px",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        component="img"
        src="../../Images/arrow-left.png"
        alt="Share"
        sx={{
          cursor: "pointer",
          width: "45px",
          margin: { xs: "10px 0px 0px 10px", md: "10px 0px 0px 10px" },
        }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            fontSize: { xs: "30px",sm:"40px", md: "56px" },
            fontFamily: "Inter",
            fontWeight: "700",
            marginTop: { xs: "0px", md: "-30px" },
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          }}
        >
          Profile
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "20%" },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            marginTop: "15px",
          }}
        >
          <Sidbar
            onItemClick={(content) => setContent(content)}
            activeContent={content}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            marginTop: { xs: "20px", md: "0" },
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
