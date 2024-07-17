import { Typography, Button, TextField, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ReferralCodeScreen = () => {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const { user } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URI;

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/event/join-team-with-referral-code`,
        {
          user_id: user?.user_id,
          referral_code: referralCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user?.token,
            role_id: user?.role_id,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/home");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.error("Error joining team with referral code:", error);
      toast.error(error?.response?.data?.message , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
    }
  };

  return (
    <Box
      sx={{
        background: "rgb(66, 92, 90)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "20px", md: "40px" },
      }}
    >
      <ToastContainer/>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <img
          src="../../../Images/logo_1 1.png"
          alt="Logo"
          style={{ width: "20%" }}
        />
      </Box>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.54)",
          textAlign: "center",
          fontSize: { lg: "40px", sm: "35px", xs: "25px" },
          fontFamily: "Amita",
          marginTop: "40px",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}
      >
        Do You Have a Referral Code?
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20px",
          width: { xs: "80%", sm: "60%", md: "45%" },
        }}
      >
        <TextField
          variant="outlined"
          placeholder="ABCED979834"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "rgb(66, 92, 90)",
            border: "2px dashed rgb(247, 230, 173)",
            borderRadius: "5px",
            color: "rgb(247, 230, 173)",
            "& .MuiInputBase-input": {
              textAlign: "center",
              color: "rgb(247, 230, 173)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "rgb(247, 230, 173)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(247, 230, 173)",
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Button
          variant="contained"
          sx={{
            background: "rgb(247, 230, 173)",
            color: "rgb(91, 94, 97)",
            padding: { xs: "10px 20px", sm: "10px 50px" },
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)",
            fontSize: "16px",
            fontFamily: "Aoboshi One",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)",
              color: "rgb(50, 50, 50)",
              boxShadow: "0px 10px 35px 0px rgb(247, 230, 173)",
            },
          }}
          onClick={handleSave}
        >
          LET’s JOIN TEAM
          <img
            src="../../../Images/Group 4.svg"
            alt="Right Arrow"
            style={{ marginLeft: "20px" }}
          />
        </Button>
      </Box>
      <Typography
        onClick={() => navigate("/home")}
        sx={{
          color: "#FFFFFF",
          fontFamily: "Poppins",
          fontWeight: "700",
          textAlign: "center",
          cursor: "pointer",
          marginTop: "40px",
        }}
      >
        CONTINUE WITHOUT CODE.....
      </Typography>
    </Box>
  );
};

export default ReferralCodeScreen;
