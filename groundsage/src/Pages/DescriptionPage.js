import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MyCarousel from "../Component/Slider";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const DescriptionPage = () => {
  const navigate = useNavigate();
  let { shopIndex } = useParams();
  const location = useLocation();
  const shopDetails = location.state && location.state.shopDetails;

  const selectedShop = shopDetails[shopIndex];
  console.log(selectedShop);

  const rows = [
    { label: "Shop Number :", value: `${parseInt(shopIndex) + 1}` },
    { label: "Shop DESCRIPTION :", value: "Small shop" },
    { label: "Shop Area :", value: "1200 sq." },
    { label: "Rent:", value: "10k / month" },
    { label: "Shop Location :", value: "NEar Entrance" },
  ];

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        padding: "0px",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{ cursor: "pointer", width: "45px", marginLeft: "20px" }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: "56px",
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: "-30px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
      >
        Shop Description
      </Typography>
      <MyCarousel />
      <Box
        sx={{
          margin: "0 auto",
          textAlign: "center",
          border: "3px solid rgb(112, 141, 161)",
          borderRadius: "7px",
          display: "flex",
          maxWidth: "fit-content",
          padding: "12px 30px 5px 30px",
          marginTop: "10px",
          borderColor: "rgb(112, 141, 161)", // Added border color
        }}
      >
        <Box sx={{ flex: 1 }}>
          {/* Map over the rows array to render the content */}
          {rows.map((row, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "left",
                textTransform: "uppercase",
              }}
            >
              <Typography
                variant="h6"
                display="inline"
                gutterBottom
                sx={{
                  color: "rgb(165, 170, 174)",
                  fontSize: "20px",
                  fontFamily: "Poppins",
                  lineHeight: "1.5",
                  fontWeight: "600",
                }}
              >
                {row.label}
              </Typography>
              <Typography
                variant="h6"
                display="inline"
                gutterBottom
                sx={{
                  color: "rgb(255, 255, 255)",
                  fontSize: "20px",
                  fontFamily: "Poppins",
                  lineHeight: "1.5",
                  fontWeight: "600",
                }}
              >
                {row.value}
              </Typography>
            </div>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="../../../Images/矢量 180.png"
            alt="Right Arrow"
            style={{ width: "45%", margin: "0px 20px 0px 60px" }}
          />
          <Typography
            sx={{
              color: "rgb(146, 235, 233)",
              fontWeight: "700",
              fontSize: "18px",
              margin: "5px 20px 0px 60px",
              textTransform: "uppercase",
              // fontFamily:"Roboto"
            }}
          >
            Vacant
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          size="large"
          variant="contained" // Make the button contained if active dom
          sx={{
            color: "rgb(91, 94, 97)",
            background: "rgb(247, 230, 173)",
            marginTop: "20px",
            marginBottom: "5px",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
              color: "rgb(50, 50, 50)", // Change text color on hover
              boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
            },
          }}
          onClick={() => {
            navigate("/rental-agreement");
          }}
        >
          Go to Rental
        </Button>
      </div>
    </div>
  );
};

export default DescriptionPage;
