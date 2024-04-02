import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Footer = () => {
  return (
    <div style={{ background: "rgb(78, 101, 100)" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 50px 0px 50px",
          paddingTop: "20px",
        }}
      >
        <Box>
          <img
            src="../../../Images/logo_1 1.png"
            alt="Right Arrow"
            style={{ marginRight: "5px", width: "45%" }} // Adjust margin between image and text
          />
          <Typography
            sx={{
              color: "rgb(255, 255, 255)",
              fontFamily: "Inter",
              lineHeight: "1",
              marginTop: "10px",
              fontWeight: "600",
            }}
          >
            Your One-Stop Solution for
            <br /> Seamless Event Management!
          </Typography>
        </Box>
        <Box sx={{ marginLeft: "-10%" }}>
          <Typography
            sx={{
              color: "rgb(255, 255, 255)",
              fontFamily: "Inter",
              lineHeight: "1",
              marginTop: "10px",
              fontWeight: "500",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Your Review is important to us{" "}
          </Typography>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            size="small"
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }} // Change label color
            sx={{
              margin: "5px",
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
            }}
          />
          <br />
          <TextField
            id="filled-basic"
            label="review"
            variant="filled"
            size="small"
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }} // Change label color
            sx={{
              margin: "5px",
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
            }}
          />
          <Button
            variant="contained"
            sx={{
              background: "rgb(247, 230, 173)",
              color: "rgb(91, 94, 97)",
              padding: "5px 40px 5px 30px",
              display: "flex",
              margin: "10px 0px 0px 2%",
              alignItems: "center",
              borderRadius: "4px", // Add border radius
              boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                color: "rgb(50, 50, 50)", // Change text color on hover
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
              },
            }}
          >
            Send
          </Button>
        </Box>
        <Box>
          <img
            src="../../../Images/footer_img.svg"
            alt="Right Arrow"
            style={{ marginRight: "5px", width: "100%" }} // Adjust margin between image and text
          />
        </Box>
      </Box>
      <Typography
        sx={{
          color: "rgb(196, 196, 196)",
          textAlign: "center",
          padding: "5px 0px 5px 15px",
          fontWeight: "500",
          fontSize: "16px",
          fontFamily:'Outfit',
          letterSpacing:"0px"
        }}
      >
        © 2024 All Rights Reserved
      </Typography>
    </div>
  );
};

export default Footer;
