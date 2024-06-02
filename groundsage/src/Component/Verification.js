import React, { useState, useRef, useEffect, useContext } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Initialize state for 4 digits
  const otpFields = useRef([]); // Ref to store references of OTP text fields
  const [timer, setTimer] = useState(0); // Initial timer value
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { setIsEmailVerified } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setIsTimerRunning(false); // Stop the timer when it reaches 0
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [isTimerRunning]);

  const handleSend = async () => {
    try {
      const { parentRoute, email } = location.state || {};

      const response = await fetch(
        "https://groundsageevent-be.onrender.com/api/v1/profile/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: parseInt(otp.join(""), 10), email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      console.log(response);
      console.log(parentRoute);
      setIsEmailVerified(true);
      if (parentRoute === "signin") {
        navigate("/signin"); // Redirect to sign in screen
      } else if (parentRoute === "entermail") {
        navigate("/forgetpassword", {
          state: { email: email },
        }); // Redirect to forget password screen
      }
    } catch (error) {
      // Handle error
      console.error("Error verifying OTP:", error);
      // toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleResend = () => {
    // Implement logic to resend the code here
    // For demonstration, we'll just restart the timer
    setTimer(20); // Reset the timer to 20 seconds
    setIsTimerRunning(true); // Start the timer
  };

  const handleChange = (index, value, event) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Replace "-" with an empty string when user starts typing
    if (value !== "-") {
      setOtp(newOtp);
    }

    // Handle backspace key or clearing the field
    if ((event.key === "Backspace" && index > 0) || value === "") {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        otpFields.current[previousIndex].focus(); // Move focus to the previous field if exists
      }
    }

    // Auto move to next field if digit entered and not the last field
    if (value.length === 1 && index < 3) {
      const nextIndex = index + 1;
      otpFields.current[nextIndex].focus(); // Move focus to the next field
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          background: "rgb(66, 92, 90)",
          minHeight: "100vh",
          padding: { xs: "20px 20px 0px 20px", md: "0px 50px 0px 50px" },
          overflow:"hidden",
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "20px", md: "100px" },
            width: { xs: "100%", md: "30%" },
            padding: { xs: "20px", md: "0" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // marginLeft: "3%",
            // marginRight:{xs:"20%",md:"0%"}
          }}
        >
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: "left",
              fontSize: { lg: "30px", sm: "25px", xs: "18px" },
              margin: { xs: "10px 0px 0px 10px", md: "50px 0px 0px 10px" },
            }}
          >
            Verification
          </Typography>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: { xs: "center", md: "left" },
              fontSize: { lg: "20px", sm: "20px", xs: "18px" },
              margin: "20px 0px 30px 0px",
            }}
          >
            We’ve sent you the verification code on ssoni3445@gmail.com
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                value={digit} // Display "-" if the field is empty
                onChange={(e) => handleChange(index, e.target.value, e)}
                variant="outlined"
                size="small"
                sx={{
                  margin: "0 8px",
                  background: "rgb(115, 135, 135)",
                  width: { xs: "40px", md: "56px" },
                  borderRadius: "4px",
                  textAlign: "center",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "1px solid rgb(188, 189, 163)",
                    },
                  },
                }}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                }}
                InputProps={{
                  style: { textAlign: "center" },
                }}
                autoFocus={index === 0}
                inputRef={(el) => (otpFields.current[index] = el)} // Assign ref to the field
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "13px 50px 13px 90px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "rgb(247, 230, 173)",
                  color: "rgb(50, 50, 50)",
                  boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)",
                },
              }}
              onClick={handleSend}
            >
              Send
              <img
                src="../../../Images/Group 4.svg"
                alt="Right Arrow"
                style={{ marginLeft: "50px" }}
              />
            </Button>
          </Box>
          <Typography
            onClick={handleResend}
            disabled={timer !== 0}
            sx={{
              // marginLeft: "18%",
              color: "rgb(165, 170, 174)",
              marginTop: "10px",
              cursor: timer === 0 ? "pointer" : "not-allowed",
            }}
          >
            Re-send code in{" "}
            <span style={{ color: "rgb(247, 230, 173)" }}>{`0:${
              timer < 10 ? "0" + timer : timer
            }`}</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "70%" },
            margin: { xs: "20px 0", md: "0" },
          }}
        >
          <Box
            component="img"
            src="../../../Images/audit-7476720_1280 2.svg"
            alt="Verification Illustration"
            sx={{
              width: { xs: "100%", md: "70%" },
              // maxWidth: "500px",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Verification;
