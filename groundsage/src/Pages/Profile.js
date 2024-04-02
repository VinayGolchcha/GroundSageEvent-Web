import { Typography, Box, Button } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <div style={{ background: "rgb(66, 92, 90)", height: "100vh" }}>
      <Box>
        <Button>About</Button>
        <Button>Event History</Button>
        <Button>Teams</Button>
      </Box>
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
      <Box>
        <Box>
          <Typography>Prashant Pandey</Typography>
          <Typography>Email : pandeyprashant0012@gmail.com</Typography>
          <Typography>Role: Coordinator</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
