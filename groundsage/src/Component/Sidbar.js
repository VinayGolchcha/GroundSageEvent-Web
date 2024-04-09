import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

const Sidbar = ({ onItemClick }) => {
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
    <div>
      <Box
        sx={{
          position: "fixed",
          // top: "50%",
          // transform: "translateY(-50%)",
          top: "60%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "rgba(188, 188, 188, 0.21)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "45px", // Adjust the border radius as needed
          margin: "20px 0px 0px 30px",
          padding: "5px",
          // opacity:"20%"
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
            }}
            onClick={() => onItemClick(button.id)}
          >
            <img
              src={button.imageSrc}
              alt={button.content.toLowerCase()}
              style={{ margin: "4px 0px 10px 0px", width: "100%" }}
            />
            {button.content.split("\n").map((line, i) => (
              <Typography
                variant="button"
                sx={{
                  color: "rgb(255, 255, 255)",
                  lineHeight: "0.6",
                  fontWeight: "600",
                  fontFamily: "Inter",
                }}
                key={i}
              >
                {i > 0 ? <br /> : null}
                {line}{" "}
              </Typography>
            ))}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default Sidbar;
