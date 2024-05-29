import React, { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../ContextApi/AuthContext";

const ProfileEvent = () => {
  const [eventList, setEventList] = useState([]);

  const [endpoint, setEndpoint] = useState(4);
  const [eventListLength, setEventListLength] = useState("Show More...");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch data from the API
    console.log(user);
    fetch(
      `https://groundsageevent-be.onrender.com/api/v1/event/get-all-user-event/${user?.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.token,
          role_id: user?.role_id,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const formattedEvents = data.data.map((event) => ({
            eventType: event.event_name,
            date: `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`,
          }));
          setEventList(formattedEvents);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handleClick = () => {
    if (eventListLength === "Show More...") {
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    } else {
      setEndpoint(4);
      setEventListLength("Show More...");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        padding: { xs: "10px", md: "20px" },
      }}
    >
      {eventList.slice(0, endpoint).map((item, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "rgb(66, 92, 90)",
            margin: "2% auto",
            marginLeft: "25px",
            border: "2px solid rgba(0, 0, 0, 0.16)",
            borderRadius: "10px",
            padding: { xs: "8px", md: "16px" },
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            width: { xs: "80%", sm: "80%", md: "80%" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            component="img"
            src="confetti-05.png"
            alt="Confetti"
            sx={{
              width: { xs: "60px", sm: "80px" },
              height: "auto",
              marginBottom: { xs: "10px", sm: "0" },
            }}
          />
          <Box
            sx={{
              background:
                "linear-gradient(rgb(65, 93, 91), rgba(115, 135, 135, 0))",
              marginLeft: { xs: "0", sm: "7%" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.9rem", md: "1.0rem" },
                fontFamily: "Poppins",
              }}
            >
              {item.eventType}
            </Typography>
            <Typography
              sx={{
                color: "rgb(216, 217, 217)",
                fontWeight: "600",
                fontSize: { xs: "1.0rem", md: "1.2rem" },
                fontFamily: "Poppins",
              }}
            >
              {item.date}
            </Typography>
          </Box>
        </Box>
      ))}
      {eventList.length !== 0 && (
        <Typography
          textAlign="center"
          sx={{
            color: "rgb(255, 255, 255)",
            cursor: "pointer",
            fontFamily: "Roboto",
            marginTop: "20px",
            fontSize: { xs: "1.0rem", md: "1.2rem" },
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
