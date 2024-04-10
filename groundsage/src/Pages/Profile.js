import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import Sidbar from "../Component/Sidbar";
import ProfileAboutpage from "./ProfileAboutpage";
import ProfileEvent from "./ProfileEvent";
import ProfileTeam from "./ProfileTeam";

const Profile = () => {
  const [content, setContent] = useState("");

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
      <div style={{ flex: 1, paddingLeft: "20px", paddingTop: "20px" }}>
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
      </div>
      <Box
        sx={{
          display: "flex",
          // justifyContent: "space-between",
          // width: {xs:"100%",md:"75%",lg:"75%"},
        }}
      >
        <Sidbar onItemClick={(content) => setContent(content)} />
        <Box
          sx={{
            // margin: "3% 0px 0px 15%",
            // marginTop:"5%"
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
