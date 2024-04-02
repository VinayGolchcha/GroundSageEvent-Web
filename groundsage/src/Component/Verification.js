import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Initialize state for 4 digits
  const otpFields = useRef([]); // Ref to store references of OTP text fields
  const [timer, setTimer] = useState(0); // Initial timer value
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  const handleSend = () => {
    // Implement logic to send the code here
    // For demonstration, we'll just start the timer
    setTimer(20); // Set the timer to 20 seconds
    setIsTimerRunning(true); // Start the timer
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
          background: "rgb(66, 92, 90)",
          height: "100vh",
        }}
      >
        <Box sx={{ marginTop: "100px", width: "25%", marginLeft: "8%" }}>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: "left",
              fontSize: { lg: "30px", sm: "25px", xs: "18px" },
              margin: "50px 0px 20px 10px",
            }}
          >
            Verification
          </Typography>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: "left",
              fontSize: { lg: "20px", sm: "20px", xs: "18px" },
              margin: "20px 0px 30px 10px",
            }}
          >
            We’ve sent you the verification code on ssoni3445@gmail.com
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "left" }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                value={digit} // Display "-" if the field is empty
                onChange={(e) => handleChange(index, e.target.value, e)}
                variant="outlined"
                size="small"
                sx={{
                  margin: "0 13px",
                  background: "rgb(115, 135, 135)",
                  width: "56px",
                  borderRadius: "4px",
                  textAlign: "center",
                  // border: "1px solid rgb(188, 189, 163)", // Add border color
                  // "&:hover": {
                  //   borderColor: "rgb(188, 189, 163)", // Reset hover border color to default
                  //   borderRadius: "6px", // Reset hover border radius to default
                  // },
                  // "&:focus": {
                  //   border: "1px solid rgb(188, 189, 163)",
                  //   // borderRadius: "6px", // Reset focus border radius to default
                  // },
                  " & .MuiOutlinedInput-root ": {
                    "&.Mui-focused fieldset": {
                  border: "1px solid rgb(188, 189, 163)", // Add border color
                },
                  },
                }}
                inputProps={{ maxLength: 1, disableUnderline: true ,textAlign:"center"}}
                InputProps={{
                  style: {
                    textAlign: "center", // Align input text to center
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    textAlign: "center", // Align input label to center
                  },
                }}
                autoFocus={index === 0}
                inputRef={(el) => (otpFields.current[index] = el)} // Assign ref to the field
              />
            ))}
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "left", marginLeft: "7%" }}
          >
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "13px 50px 13px 90px",
                marginTop: "50px",
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
              marginLeft: "18%",
              color: "rgb(165, 170, 174)",
              marginTop: "10px",
            }}
          >
            Re-send code in{" "}
            <span style={{ color: "rgb(247, 230, 173)" }}>{`0:${
              timer < 10 ? "0" + timer : timer
            }`}</span>
          </Typography>
        </Box>
        <Box>
          <img
            src="../../../Images/audit-7476720_1280 2.svg"
            alt="Right Arrow"
            style={{ marginTop: "20%", marginLeft: "20%", width: "110%" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Verification;
