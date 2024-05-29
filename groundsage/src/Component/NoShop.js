import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoShop = () => {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "50px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px",
        }}
      >
        <img
          src="../../../Images/checklist.png"
          alt="add-shop"
          // style={{textAlign:"center"}}
        />
      </div>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.54)",
          textAlign: "center",
          fontSize: { xs: "25px", md: "36px" },
          fontFamily: "Inter",
          fontWeight: "400",
          margin: "10px",
        }}
      >
        No Shops Added Yet!
      </Typography>
      <Typography
        sx={{
          color: "rgb(216, 217, 217)",
          textAlign: "center",
          fontSize: { xs: "20px", md: "20px" },
          fontFamily: "Inter",
          fontWeight: "400",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/createshop");
        }}
      >
        Click here to create....
      </Typography>
    </div>
  );
};

export default NoShop;
