import React, { useState } from "react";
import { Typography, TextField, Box } from "@mui/material";

const ProfileAboutpage = () => {
  const [email, setEmail] = useState("rohit8282@mail.com");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          fontWeight: "400",
          fontSize: "26px",
          fontFamily: "Outfit",
          letterSpacing: "0pxf",
        }}
      >
        Prashant Pandey
      </Typography>
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Email:"
          variant="filled"
          fullWidth
          size="small"
          sx={{ width: "370px" }} // Increase the width here
          InputLabelProps={{
            style: { 
              color: "white",
              fontWeight: "400",
              fontSize: "22px",
              fontFamily: "Outfit",
            },
          }} // Change label color
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgb(255, 255, 255)",
              fontWeight: "400",
              fontSize: "22px",
              fontFamily: "Outfit",
              letterSpacing: "0pxf",
              background: "rgba(196, 196, 196, 0.39)",
              // padding: "2px 7px 2px 7px",
              borderRadius: "10px",
              marginBottom: "30px",
            },
          }}
        />
        <TextField
          label="Current Team:"
          variant="filled"
          size="small"
          fullWidth
          sx={{ width: "370px" }} // Increase the width here
          InputLabelProps={{
            style: {
              color: "white",
              fontWeight: "400",
              fontSize: "21px",
              fontFamily: "Outfit",
            },
          }} // Change label color
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgb(255, 255, 255)",
              fontWeight: "400",
              fontSize: "22px",
              fontFamily: "Outfit",
              letterSpacing: "0pxf",
              background: "rgba(196, 196, 196, 0.39)",
              // padding: "2px 7px 2px 7px",
              borderRadius: "10px",
              marginBottom: "30px",
            },
          }}
        />
        <TextField
          label="Current Event:"
          variant="filled"
          size="small"

          fullWidth
          sx={{ width: "370px" }} // Increase the width here
          InputLabelProps={{
            style: {
              color: "white",
              fontWeight: "400",
              fontSize: "21px",
              fontFamily: "Outfit",
            },
          }} // Change label color
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgb(255, 255, 255)",
              fontWeight: "400",
              fontSize: "22px",
              fontFamily: "Outfit",
              letterSpacing: "0pxf",
              background: "rgba(196, 196, 196, 0.39)",
              // padding: "2px 7px 2px 7px",
              borderRadius: "10px",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ProfileAboutpage;
