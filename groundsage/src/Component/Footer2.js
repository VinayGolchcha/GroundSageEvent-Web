import React, { useContext, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext";
import { toast } from "react-toastify";

const Footer2 = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const apiUrl = process.env.REACT_APP_API_URI;
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  if (
    location.pathname === "/" ||
    location.pathname === "/referral-code" ||
    location.pathname === "/entermail" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/verification" ||
    location.pathname === "/forgetpassword" ||
    location.pathname === "/home/" ||
     location.pathname === "/home"
  ) {
    return null;
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/home/send-feedback`,
        {
          email: user?.email,
          feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user?.token,
            role_id: user?.role_id,
          },
        }
      );
      toast.success("Feedback sent successfully");
      setFeedback("");
      setEmail("");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response from server:", error.response.data);
        toast.error("Something went wrong");
      } else if (error.request) {
        // No response was received from the server
        console.error("No response received from server:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div style={{ background: "rgb(78, 101, 100)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center", // Center vertically
          textAlign: "center", //
          margin: { xs: "0px 10px", md: "0px 50px 0px 50px" },
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex" },
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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

        <Box>
          <img
            src="../../../Images/footer_img.svg"
            alt="Right Arrow"
            style={{ width: "90%", marginRight: "15%" }} // Adjust margin between image and text
          />
        </Box>
      </Box>
    </div>
  );
};

export default Footer2;
