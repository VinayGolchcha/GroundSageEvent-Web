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

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          background: "rgb(66, 92, 90)",
          // justifyContent:"space-around",
          height: "100vh",
        }}
      >
        <Box sx={{ marginTop: "50px", width: "25%", marginLeft: "8%" }}>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)", // Set label color to white
              textAlign: "left",
              fontSize: { lg: "30px", sm: "25px", xs: "18px" },
              margin: "30px 0px 20px 10px",
            }}
          >
            Sign In
          </Typography>
          <TextField
            id="filled-basic"
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
              marginBottom: "15px",
            }}
          />

          <br />
          <TextField
            id="filled-basic"
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
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                marginTop: 1,
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "13px 50px 13px 90px",
                marginTop: "40px",
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
            >
              Sign In
              <img
                src="../../../Images/Group 4.svg"
                alt="Right Arrow"
                style={{ marginLeft: "50px" }}
              />
            </Button>
          </Box>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)", // Set label color to white
              fontSize: { lg: "20px", sm: "20px", xs: "16px" },
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            OR
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="../../../Images/Group 33505.png"
              alt="Google Login"
              style={{ marginLeft: "9%", cursor: "pointer" }}
            />
          </Box>
          <div
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "rgb(165, 170, 174)",
                fontSize: { lg: "18px", sm: "18px", xs: "16px" },
                textAlign: "center",
              }}
            > 
              Don’t have an account?{" "}
            </Typography>
            <Typography
              sx={{
                color: "rgb(247, 230, 173)", // Change color for the "Sign Up" link
                marginLeft: "10px",
                fontSize: { lg: "18px", sm: "18px", xs: "16px" },
                cursor: "pointer",
              }}
            >
              Sign In
            </Typography>
          </div>
        </Box>
        <Box>
          <img
            src="../../../Images/calendar-5402487_1280 2.svg"
            alt="Right Arrow"
            style={{ marginTop: "37%", marginLeft: "20%" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SignInPage;
