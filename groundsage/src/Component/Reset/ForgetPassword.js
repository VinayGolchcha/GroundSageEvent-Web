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

const ForgetPassword = () => {
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
        <Box sx={{ marginTop: "50px", width: "23%", marginLeft: "8%" }}>
          <Typography
            sx={{
              color: "rgb(165, 170, 174)", // Set label color to white
              textAlign: "left",
              fontSize: { lg: "30px", sm: "25px", xs: "18px" },
              margin: "50px 0px 20px 10px",
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
                <Typography sx={{ color: "white" }}>Your password</Typography>
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
              marginBottom: "15px",
            }}
          />
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
              margin: "5px",
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
        <Box>
          <img
            src="../../../Images/audit-7476720_1280 2.svg"
            alt="Right Arrow"
            style={{ marginTop: "18%", marginLeft: "35%", width: "110%" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ForgetPassword;
