import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EnterMail = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const response = await fetch(
        "https://groundsageevent-be.onrender.com/api/v1/profile/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send OTP");
        console.log(response);
      }

      // If successful response, show success message
      console.log(response);
      toast.success("OTP sent successfully!");
      navigate("/verification", {
        state: { parentRoute: "entermail", email: email },
      });
      // You can add further logic here like redirecting to OTP verification page
    } catch (error) {
      // Handle error
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again later.");
    }
  };

  return (
    <div style={{ background: "rgb(66, 92, 90)", minHeight: "100vh" }}>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          background: "rgb(66, 92, 90)",
          justifyContent: "space-around",
          flexDirection: { xs: "column-reverse", md: "row" },
          // justifyContent:"space-around",
          padding: { xs: "20px", md: "50px" },
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "0px", md: "40px" },
            // width: { xs: "100%", md: "50%" },
            display: { xs: "flex", md: "block" },
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: { xs: "20px", md: "90px" },
            width: { xs: "100%", md: "30%" },
            marginLeft:{xs:"0px",md:"3%"}
          }}
        >
          {" "}
          <Typography
            sx={{
              color: "rgb(165, 170, 174)", // Set label color to white
              textAlign: "left",
              fontSize: { lg: "30px", sm: "25px", xs: "18px" },
              margin: "30px 0px 20px 10px",
            }}
          >
            Enter your email
          </Typography>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)", // Set label color to white
              textAlign: "left",
              fontSize: { lg: "20px", sm: "20px", xs: "18px" },
              margin: "20px 0px 30px 10px",
            }}
          >
            An Otp will be send to the registered email below, once the email is
            verified, you can move forward to reset your password.
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src="../../Images/Message.png"
                  alt="Username Icon"
                  style={{ width: "20px", marginRight: "15px" }}
                />
                <Typography sx={{ color: "white" }}>Email</Typography>
              </Box>
            }
            variant="filled"
            fullWidth
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
              marginTop: { xs: "0px", md: "15px" },
            }}
          />
          <br />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "13px 50px 13px 90px",
                marginTop: { xs: "0px", md: "40px" },
                display: "flex",
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
              onClick={handleSendOTP}
            >
              Save
              <img
                src="../../../Images/Group 4.svg"
                alt="Right Arrow"
                style={{ marginLeft: "50px" }}
              />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "70%" },
            margin: { xs: "20px 0", md: "0px 0px 0px 50px" },
            marginTop: { xs: "20px", md: "50px" },
          }}
        >
          <Box
            component="img"
            src="../../../Images/audit-7476720_1280 1.svg"
            alt="Right Arrow"
            sx={{
              marginRight: { xs: "0", lg: "25%" },
              margin: { xs: "10px 20px 10px 20px", md: "0" },
              width: { xs: "100%", md: "70%" },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default EnterMail;
