import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const SignInPage = () => {
  return (
    <div>
      <Box sx={{ display: "flex", background: " rgb(66, 92, 90)" }}>
        <Box sx={{ marginLeft: "50px" }}>
          <Typography
            sx={{
              color: "rgb(24, 49, 47)",
              textAlign: "left",
              fontSize: { lg: "20px", sm: "20px", xs: "18px" },
              marginTop: "30px",
            }}
          >
            Sign In
          </Typography>
          <TextField id="filled-basic" label="Filled" variant="filled" sx={{margin:"5px"}}/> <br/>
          <TextField id="filled-basic" label="Filled" variant="filled" sx={{margin:"5px"}} />
          <Typography
            variant="body2"
            sx={{
              color: "white",
              marginTop: 1,
              marginLeft: "60%",
            }}
          >
            Forgot Password?
          </Typography>
          <Button
            sx={{
              marginTop: "20px",
              width: "100%", // Set button width to 100%
              background: "#FF5151",
              padding: "10px",
              color: "#010101",
              fontWeight: 600,
            }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Box>
        <Box>
          <img
            src="../../../Images/calendar-5402487_1280 2.svg"
            alt="Right Arrow"
            style={{ marginLeft: "40px" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SignInPage;
