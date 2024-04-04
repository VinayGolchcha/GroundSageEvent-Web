import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import Sidbar from "../Component/Sidbar";
import ProfileAboutpage from "./ProfileAboutpage";

const Profile = () => {
  const [content, setContent] = useState("");

  const renderContent = () => {
    switch (content) {
      case "about":
        return <ProfileAboutpage />;
      case "eventHistory":
        return <div>eventHistory</div>;
      case "teams":
        return <div>team</div>;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: "rgb(66, 92, 90)", height: "100vh" }}>
      <Sidbar onItemClick={(content) => setContent(content)} />
      <div style={{ flex: 1, paddingLeft: "20px", paddingTop: "20px" ,}}>
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            fontSize: "56px",
            fontFamily: "Inter",
            fontWeight: "700",
            paddingTop: "10px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          }}
        >
          Profile
        </Typography>
        <Box sx={{margin:"7% 0% 0% 15%"}}>{renderContent()}</Box>
      </div>
    </div>
  );
};

export default Profile;
