import React, { useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    activationCode: "", // Added activation code field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Confirm password and password do not match");
      return;
    }
    console.log("Form data:", formData);

    try {
      const response = await fetch(
        "https://groundsageevent-be.onrender.com/api/v1/profile/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            activation_code: formData.activationCode, // Added activation code to API request body
          }),
        }
      );
      if (response.ok) {
        console.log("Registration successful", response);
        toast.success("Registration successful");
        navigate("/signin");
      } else {
        console.log("Registration failed");
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map((error) => error.msg);
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage || "An error occurred");
          });
        } else {
          const errorMessage =
            data.message || "Registration failed. Please try again.";
          toast.error(errorMessage || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error:", error);
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
            // width: { xs: "100%", md: "50%" },
            display: { xs: "flex", md: "block" },
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", md: "30%" },
          }}
        >
          <Typography
            sx={{
              color: "rgb(165, 170, 174)",
              textAlign: "left",
              // fontSize: { lg: "30px", sm: "25px", xs: "18px" },
              fontSize: { lg: "40px", sm: "35px", xs: "28px" },
              margin: "20px 0px 20px 10px",
            }}
          >
            Sign Up
          </Typography>
          <TextField
            id="username"
            name="username"
            label={
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <img
                  src="../../Images/Iconly_Light_Profile.png"
                  alt="Username Icon"
                  style={{ width: "20px", marginRight: "15px" }}
                />
                <Typography sx={{ color: "white" }}>User Name</Typography>
              </Box>
            }
            variant="filled"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              margin: "5px",
              width: { xs: "80%", md: "100%" },
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              marginBottom: { xs: "10px", md: "15px" },
            }}
          />
          <TextField
            id="email"
            name="email"
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
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              margin: "5px",
              width: { xs: "80%", md: "100%" },
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              marginBottom: { xs: "10px", md: "15px" },
            }}
          />
          <TextField
            id="password"
            name="password"
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
                <Typography sx={{ color: "white" }}>Your password</Typography>
              </Box>
            }
            variant="filled"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
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
              width: { xs: "80%", md: "100%" },
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              marginBottom: { xs: "10px", md: "15px" },
            }}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
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
                <Typography sx={{ color: "white" }}>
                  Confirm password
                </Typography>
              </Box>
            }
            variant="filled"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
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
              width: { xs: "80%", md: "100%" },
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              marginBottom: { xs: "10px", md: "15px" },
            }}
          />
          <TextField
            id="activationCode"
            name="activationCode"
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
                ></Box>
                <Typography sx={{ color: "white" }}>Activation Code</Typography>
              </Box>
            }
            variant="filled"
            fullWidth
            value={formData.activationCode}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              margin: "5px",
              width: { xs: "80%", md: "100%" },
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)",
              marginBottom: { xs: "10px", md: "15px" },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "13px 50px 13px 90px",
                marginTop: "25px",
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
              onClick={handleSubmit}
            >
              Sign Up
              <img
                src="../../../Images/Group 4.svg"
                alt="Right Arrow"
                style={{ marginLeft: "50px" }}
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "15px",
            }}
          >
            <Typography
              sx={{
                color: "rgb(165, 170, 174)",
                fontSize: { lg: "18px", sm: "18px", xs: "16px" },
              }}
            >
              Already have an account?
            </Typography>
            <Typography
              sx={{
                color: "rgb(247, 230, 173)",
                marginLeft: "10px",
                fontSize: { lg: "18px", sm: "18px", xs: "16px" },
                cursor: "pointer",
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "50%" },
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

export default SignUpPage;
