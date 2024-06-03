import React from "react";
import { Typography, Box, Button } from "@mui/material";

const Sidbar = ({ onItemClick, activeContent }) => {
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
        flexDirection: { xs: "row", md: "column" },
        alignItems: { xs: "center", md: "flex-start" },
        justifyContent: { xs: "center", sm: "flex-start" },
        backgroundColor: "rgba(188, 188, 188, 0.21)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "45px",
        margin: { xs: "10px 0px 0px 10px", md: "20px 10px 0px 30px" },
        padding: "2px",
        maxWidth: "fit-content",
        width: "100%",
      }}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          color="primary"
          sx={{
            margin: { xs: "0 10px", sm: "0 0 30px 0" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textDecoration:
              activeContent === button.id
                ? "underline rgb(247, 230, 173)"
                : "none",
            fontSize: { xs: "0.7rem", sm: "1rem" },
            padding: { xs: "5px", sm: "10px" },
          }}
          onClick={() => onItemClick(button.id)}
        >
          <Box
            component="img"
            src={button.imageSrc}
            alt={button.content.toLowerCase()}
            sx={{
              width: { xs: "50%", md: "90%" },
              // maxWidth: { xs: "30px", sm: "50px" },
            }}
          />
          {button.content.split("\n").map((line, i) => (
            <Typography
              variant="button"
              sx={{
                color: "rgb(255, 255, 255)",
                lineHeight: "0.6",
                fontWeight: "600",
                fontFamily: "Inter",
                fontSize: { xs: "0.7rem", sm: "1rem" },
                textAlign: "center",
                marginTop: "5px",
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
