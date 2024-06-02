import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

const Sidbar = ({ onItemClick, activeContent }) => {
  const [content, setContent] = useState(""); // State to track current content

  const buttons = [
    {
      id: "about",
      content: "About",
      imageSrc: "../../../Images/information 2 (1).png",
    },
    {
      id: "eventHistory",
      content: "Event\nHistory",
      imageSrc: "../../../Images/information 1 (1).png",
    },
    {
      id: "teams",
      content: "Teams",
      imageSrc: "../../../Images/team 1 (1).png",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "rgba(188, 188, 188, 0.21)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "45px", // Adjust the border radius as needed
        margin: { xs: "50px 0px 0px 10px", sm: "20px 10px 0px 30px" },
        padding: "2px",
        maxWidth: "fit-content",
        width: "1",
      }}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          color="primary"
          sx={{
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textDecoration:
              activeContent === button.id
                ? "underline rgb(247, 230, 173)"
                : "none",
            fontSize: { xs: "0.7rem", sm: "1rem" }, // Adjust font size for xs devices
            padding: { xs: "5px", sm: "10px" }, // Adjust padding for xs devices
          }}
          onClick={() => onItemClick(button.id)}
        >
          <img
            src={button.imageSrc}
            alt={button.content.toLowerCase()}
            style={{ width: "100%", maxWidth: { xs: "30px", sm: "50px" } }} // Adjust image size for xs devices
          />
          {button.content.split("\n").map((line, i) => (
            <Typography
              variant="button"
              sx={{
                color: "rgb(255, 255, 255)",
                lineHeight: "0.6",
                fontWeight: "600",
                fontFamily: "Inter",
                fontSize: { xs: "0.7rem", sm: "1rem" }, // Adjust font size for xs devices
                textAlign: "center",
                marginTop:"5px",
              }}
              key={i}
            >
              {i > 0 ? <br /> : null}
              {line}
            </Typography>
          ))}
        </Button>
      ))}
    </Box>
  );
};

export default Sidbar;
