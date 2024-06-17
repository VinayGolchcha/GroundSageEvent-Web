import { Typography, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../Component/Refferal.css";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";

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
        // toast.success(response.data.message);
        // onSave && onSave(response.data.data);
        // console.log(response):
        console.log(response.data.message);
        navigate("/home");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      //   toast.error("An error occurred while trying to join the team.");
      console.error("Error joining team with referral code:", error);
    }
  };

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        // opacity: 0.9,
        // padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="../../../Images/logo_1 1.png"
          alt="Right Arrow"
          style={{ marginTop: "40px", width: "20%" }}
        />
      </div>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.54)",
          textAlign: "center",
          fontSize: { lg: "40px", sm: "35px", xs: "25px" },
          fontFamily: "Amita",
          marginTop: "70px",
          letterSpacing: "4px", // Add space between words
          textTransform: "uppercase",
          paddingBottom: "15px",
        }}
      >
        Do You Have a Referral Code?
      </Typography>
      <div style={{ textAlign: "center", height: "20%" }}>
        <TextField
          variant="outlined"
          placeholder="ABCED979834"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          sx={{
            width: { xs: "80%", sm: "60%", md: "45%" },
            backgroundColor: "rgb(66, 92, 90)",
            border: "2px dashed rgb(247, 230, 173)",
            borderRadius: "5px",
            fontSize: "30px",
            textAlign: "center",
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "rgb(247, 230, 173)",
            color: "rgb(91, 94, 97)",
            padding: "13px 10px 13px 50px",
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px", // Add border radius
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
            fontSize: "16px",
            fontFamily: "Aoboshi One",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
              color: "rgb(50, 50, 50)", // Change text color on hover
              boxShadow: "0px 10px 35px 0px rgb(247, 230, 173)", // Change box shadow on hover
            },
          }}
          onClick={handleSave}
        >
          LET’s JOIN TEAM
          <img
            src="../../../Images/Group 4.svg"
            alt="Right Arrow"
            style={{ marginLeft: "40px" }}
          />
        </Button>
      </div>
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
    </div>
  );
};

export default ReferralCodeScreen;
