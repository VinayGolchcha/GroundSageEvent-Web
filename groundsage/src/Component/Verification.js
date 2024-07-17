import React, { useState, useRef, useEffect, useContext } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Initialize state for 4 digits
  const otpFields = useRef([]); // Ref to store references of OTP text fields
  const [timer, setTimer] = useState(20); // Initial timer value set to 20 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const { setIsEmailVerified } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { parentRoute, email } = location.state || {};

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

      setIsEmailVerified(true);
      if (parentRoute === "signin") {
        navigate("/signin"); // Redirect to sign in screen
      } else if (parentRoute === "entermail") {
        navigate("/forgetpassword", {
          state: { email: email },
        }); // Redirect to forget password screen
      }
    } catch (error) {
      toast.error(error?.message);
      if(error?.response?.data?.message){
        const item = error?.response?.data?.message
        toast.error(item);
      }
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      const errArray = error?.response?.data?.errors;
      console.log(errArray);
      errArray?.forEach((error) => {
        toast.error(error?.msg);
      });
    }
  };

  const handleResend = async () => {
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
        throw new Error("Failed to resend OTP");
      }

      setTimer(20); // Reset the timer to 20 seconds
      setIsTimerRunning(true); // Start the timer
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleChange = (index, value, event) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value !== "-") {
      setOtp(newOtp);
    }

    if ((event.key === "Backspace" && index > 0) || value === "") {
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        otpFields.current[previousIndex].focus();
      }
    }

    if (value.length === 1 && index < 3) {
      const nextIndex = index + 1;
      otpFields.current[nextIndex].focus();
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent:{xs:"center"},
          background: "rgb(66, 92, 90)",
          minHeight: "100vh",
          padding: { xs: "20px 20px 0px 20px", md: "0px 50px 0px 50px" },
          overflow: "hidden",
        }}
      >
        <ToastContainer/>
        <Box
          sx={{
            marginTop: { xs: "20px", md: "100px" },
            width: { xs: "100%", md: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems:{xs:"center",md:"start"},
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: "left",
              fontSize: {
                lg: "40px",
                sm: "35px",
                xs: "28px",
              },
              margin: { xs: "10px 0px 0px 10px", md: "50px 0px 0px 10px" },
            }}
          >
            Verification
          </Typography>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: { xs: "center", md: "center" },
              fontSize: { lg: "20px", sm: "20px", xs: "18px" },
              margin: "20px 0px 30px 0px",
            }}
          >
            We’ve sent you the verification code on {email}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {otp?.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
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
                  style: { textAlign: "center", color:"white" },
                }}
                InputProps={{
                  style: { textAlign: "center" },
                }}
                InputLabelProps={{ style: { color: "white" } }} 
                autoFocus={index === 0}
                inputRef={(el) => (otpFields.current[index] = el)}
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
            sx={{
              color: "rgb(165, 170, 174)",
              marginTop: "10px",
              cursor: timer === 0 ? "pointer" : "not-allowed",
            }}
          >
            {timer === 0 ? (
              "Re-send code"
            ) : (
              <>
                Re-send code in{" "}
                <span style={{ color: "rgb(247, 230, 173)" }}>{`0:${
                  timer < 10 ? "0" + timer : timer
                }`}</span>
              </>
            )}
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
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Verification;
