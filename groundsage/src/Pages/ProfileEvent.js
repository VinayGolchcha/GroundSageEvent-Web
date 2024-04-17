import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import SidBar from "../Component/Sidbar";

import { Box, Typography } from "@mui/material";

const ProfileEvent = () => {
  const [eventList, setEventList] = useState([
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event First Name",
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Second Name",
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Third Name",
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Fourth Name",
    },

    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Fifth Name",
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Sixth Name",
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "FOOD EVENT",
    },
  ]);

  const [endpoint, setEndpoint] = useState(4);

  const [eventListLength, setEventListLength] = useState("Show More...");

  const handleClick = () => {
    if (eventListLength === "Show More...") {
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    } else if (eventListLength === "Show Less...") {
      setEndpoint(4);
      setEventListLength("Show More...");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        // height: { ...[eventList.length === 0 ? "100vh" : "auto"] }

        marginLeft: "130px",
      }}
    >
      {eventList.slice(0, endpoint).map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgb(66, 92, 90)",
              margin: "2% 12%",
              border: "2px solid rgba(0, 0, 0, 0.16)",
              borderRadius: "10px",
              padding: "8px",
              display: "flex",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Box
              sx={{
                display: "flex",

                justifyContent: "center",
                width: "700px",
              }}
            >
              <img
                src="confetti-05.png"
                alt="Confetti"
                style={{ marginLeft: "-100px" }}
              />
            </Box>
            <Box
              sx={{
                marginRight: "40%",
                background:
                  "linear-gradient(rgb(65, 93, 91), rgba(115, 135, 135, 0))",
                display: "grid",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.0rem",
                  fontFamily: "Poppins",
                  display: "block",
                }}
              >
                {item.eventType}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(216, 217, 217)",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                }}
              >
                {item.date}
              </Typography>
            </Box>
          </Box>
        );
      })}

      {eventList.length !== 0 && (
        <Typography
          textAlign="center"
          sx={{
            color: "rgb(255, 255, 255) ",
            cursor: "pointer",
            fontFamily: "Roboto",
          }}
          onClick={handleClick}
        >
          {eventListLength}
        </Typography>
      )}
    </Box>
  );
};

export default ProfileEvent;
