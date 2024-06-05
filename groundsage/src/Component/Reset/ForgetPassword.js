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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const { parentRoute, email } = location.state || {};
  const navigate = useNavigate();

  const handleForgetPassword = async () => {
    console.log(email);
    try {
      const response = await fetch(
        "https://groundsageevent-be.onrender.com/api/v1/profile/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        // Password reset successful, handle accordingly (e.g., redirect)
        console.log(response);
        toast.success(response.message);
        navigate("/signin");
      } else {
        // Password reset failed, handle error
        console.log(response);
        toast.error(response.message);
        console.error("Password reset failed:", response.statusText);
      }
    } catch (error) {
      console.error("Password reset failed:", error.message);
      toast.error("An error occurred while resetting password.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "rgb(66, 92, 90)",
          // justifyContent:"space-around",
          padding: { xs: "20px 20px 20px 20px", md: "0px 50px 0px 50px" },
          minHeight: "100vh",
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
              color: "rgb(165, 170, 174)", // Set label color to white
              textAlign: "left",
              fontSize: {
                lg: "40px",
                sm: "35px",
                xs: "28px",
              },

              margin: { xs: "0px", md: "50px 0px 20px 10px" },
            }}
          >
            Reset Password
          </Typography>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)", // Set label color to white
              textAlign: "left",
              fontSize: { lg: "20px", sm: "20px", xs: "18px" },
              margin: "20px 0px 30px 10px",
            }}
          >
            Please create a new password and ensure you remember it for future
            use.
          </Typography>
          <TextField
            id="email"
            variant="filled"
            fullWidth
            value={email}
            disabled
            // onChange={(e) => setEmail(e.target.value)}
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

            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }} // Change label color
            sx={{
              // margin: "5px",
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
              marginBottom: { xs: "10px", md: "15px" },
              "& .css-10botns-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
              {
                WebkitTextFillColor: "#FFFFFF",
              },
            }}
          />
          <TextField
            id="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              // margin: "5px",
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
              marginBottom: { xs: "10px", md: "15px" },
            }}
          />
          <TextField
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              // margin: "5px",
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
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
                borderRadius: "4px", // Add border radius
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                  color: "rgb(50, 50, 50)", // Change text color on hover
                  boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
                },
              }}
              onClick={handleForgetPassword}
            >
              Send
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
            margin: { xs: "20px 0", md: "0" },
          }}
        >
          <Box
            component="img"
            src="../../../Images/audit-7476720_1280 2.svg"
            alt="Right Arrow"
            sx={{ width: { xs: "100%", md: "70%" } }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ForgetPassword;
