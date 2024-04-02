import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MyCarousel from "../Component/Slider";

const DescriptionPage = () => {
  const rows = [
    { label: "Shop Number :", value: "01" },
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
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: "56px",
          fontFamily: "Inter",
          fontWeight: "700",
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
                  fontWeight:"600"
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
                  fontWeight:"600"
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
              textTransform:"uppercase"
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
          }}
        >
          Go to Rental
        </Button>
      </div>
    </div>
  );
};

export default DescriptionPage;
