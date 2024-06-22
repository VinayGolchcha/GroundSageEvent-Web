import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../ContextApi/AuthContext";
import debounce from "lodash.debounce";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const debouncedCheckEmailVerificationStatus = useCallback(
    debounce(async (email) => {
      if (!email) return;

      try {
        const response = await fetch(
          "https://groundsageevent-be.onrender.com/api/v1/profile/check-email-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const isEmailVerified = data.data?.is_email_verified === 1;
          setIsEmailVerified(isEmailVerified);
        } else {
          toast.error(data.message || "Email verification failed.");
        }
      } catch (error) {
        toast.error("An error occurred while checking email verification.");
      }
    }, 2000), // 1000ms debounce delay
    []
  );

    useEffect(() => {
    if (email && !isEmailVerified) {
      debouncedCheckEmailVerificationStatus(email);
    }
  }, [email, isEmailVerified, debouncedCheckEmailVerificationStatus]);

  const handleSubmit = async () => {
    debouncedCheckEmailVerificationStatus();
    try {
      const response = await fetch(
        "https://groundsageevent-be.onrender.com/api/v1/profile/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful");
        const userData = data?.data?.[0];
        setUser(userData);
        console.log(userData);
        navigate("/referral-code");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleVerify = async () => {
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

      navigate("/verification", {
        state: { parentRoute: "signin", email: email },
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          background: "rgb(66, 92, 90)",
          justifyContent: "space-around",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh",
          padding: { xs: "20px 20px 20px 20px", md: "0px 50px 0px 50px" },
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "20px", md: "50px" },
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: "left",
              fontSize: { lg: "40px", sm: "35px", xs: "28px" },
              margin: "30px 0px 20px 10px",
            }}
          >
            Sign In
          </Typography>
          <TextField
            id="email"
            label={
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => debouncedCheckEmailVerificationStatus(email)}
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    color={isEmailVerified ? "success" : "primary"}
                    onClick={handleVerify}
                    sx={{
                      color: isEmailVerified ? "green" : "#162D3A",
                      fontWeight: 600,
                    }}
                  >
                    {isEmailVerified && email.length > 0
                      ? "Email Verified"
                      : "Verify Email"}
                  </Button>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              margin: "5px",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              marginBottom: { xs: "10px", md: "15px" },
              width: { xs: "100%", md: "60%" },
            }}
          />
          <TextField
            id="password"
            label={
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "15px",
                  }}
                >
                  <img
                    src="../../Images/Lock.png"
                    alt="Password Icon"
                    style={{ width: "18px" }}
                  />
                </Box>
                <Typography sx={{ color: "white" }}>Password</Typography>
              </Box>
            }
            variant="filled"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityIcon
                        style={{ color: "white", marginRight: "10px" }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        style={{ color: "white", marginRight: "10px" }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              margin: "5px",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              width: { xs: "100%", md: "60%" },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end",width:"60%" }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                marginTop: 1,
                cursor: "pointer",
                // width: { xs: "100%", md: "60%" },
              }}
              onClick={() => navigate("/entermail")}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", md: "60%" },
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "13px 100px",
                marginTop: "40px",
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
                marginBottom: "25px",
              }}
              onClick={handleSubmit}
            >
              Sign In
              <img
                src="../../../Images/Group 4.svg"
                alt="Right Arrow"
                style={{ marginLeft: "20px" }}
              />
            </Button>
          </Box>
          {/* <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              fontSize: { lg: "20px", sm: "20px", xs: "16px" },
              marginTop: "40px",
              textAlign: "center",
              width: { xs: "100%", md: "60%" },
            }}
          >
            OR
          </Typography> */}
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", md: "60%" },
            }}
          >
            {/* <Box
              component="img"
              src="../../../Images/Group 33505.png"
              alt="Google Login"
              style={{ cursor: "pointer" }} */}
          {/* /> */}
          {/* </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", md: "60%" },
              marginBottom: "15px",
            }}
          >
            <Typography
              sx={{
                color: "rgb(165, 170, 174)",
                fontSize: { lg: "18px", sm: "18px", xs: "16px" },
                textAlign: "center",
              }}
            >
              Don’t have an account?
            </Typography>
            <Typography
              sx={{
                color: "rgb(247, 230, 173)",
                marginLeft: "10px",
                fontSize: { lg: "18px", sm: "18px", xs: "16px" },
                cursor: "pointer",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: { xs: "100%", md: "70%" },
            margin: { xs: "10px 0", md: "0" },
          }}
        >
          <Box
            component="img"
            src="../../../Images/calendar-5402487_1280 2.svg"
            alt="Calendar"
            sx={{
              width: { xs: "100%", md: "80%" },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SignInPage;
