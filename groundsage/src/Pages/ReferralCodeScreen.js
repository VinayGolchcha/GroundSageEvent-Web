import { Typography, Button, TextField } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../Component/Refferal.css";

const ReferralCodeScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        opacity: 0.9,
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="../../../Images/Splash Screen.png"
          alt="Right Arrow"
          style={{ marginTop: "50px" }}
        />
      </div>
      <Typography
        sx={{
          color: "rgb(24, 49, 47)",
          textAlign: "center",
          fontSize: { lg: "45px", sm: "35px", xs: "25px" },
          fontFamily: "Amita",
          marginTop: "30px",
          letterSpacing: "4px", // Add space between words
          textTransform: "uppercase",
          paddingBottom : "10px"
        }}
      >
       Do You Have a Referral Code? 
       
      </Typography>
        <div style={{textAlign : "center" , height : "20%"}}>
            <input
                className="custom-input"
                placeholder="ABCED979834"
                style={{
                    width : "45%" ,
                    height : "100px" ,
                    backgroundColor : "rgb(66, 92, 90)" ,
                    border : "2px dashed rgb(247, 230, 173)" ,
                    borderRadius : "5px",
                    fontSize : "30px",
                    textAlign : "center" , 
                    color : "rgb(247, 230, 173)",
                    '::placeholder': {
                        color: 'rgb(247, 230, 173)',
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
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px", // Add border radius
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
            fontSize: "16px",
            fontFamily : "Aoboshi One",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
              color: "rgb(50, 50, 50)", // Change text color on hover
              boxShadow: "0px 10px 35px 0px rgb(247, 230, 173)", // Change box shadow on hover
            },
          }}
        >
          LET’s JOIN TEAM
          <img
            src="../../../Images/Group 4.svg"
            alt="Right Arrow"
            style={{ marginLeft: "40px" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default ReferralCodeScreen;
