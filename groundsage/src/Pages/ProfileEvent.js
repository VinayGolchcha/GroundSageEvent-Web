import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { AuthContext } from "../ContextApi/AuthContext";

const ProfileEvent = () => {
  const [eventList, setEventList] = useState([]);

  const [endpoint, setEndpoint] = useState(4);
  const [eventListLength, setEventListLength] = useState("Show More...");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
          const formattedEvents = data?.data.map((event) => ({
            eventType: event.event_name,
            date: `${formatDate(event.start_date)} - ${formatDate(
              event.end_date
            )}`,
          }));
          setEventList(formattedEvents);
          setLoading(false);
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

  if (loading) {
    // Show a loading indicator while the data is being fetched
    return (
      <>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "50%",
            left: "50%", // 20% from the left side of the screen
            transform: "translate(-50%, -50%)", // Centering horizontally and vertically
            backgroundColor: "rgb(66, 92, 90)",
            borderRadius: "50%",
            padding: "20px",
          }}
        >
          <CircularProgress sx={{ color: "rgb(247, 230, 173)" }} />
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(66, 92, 90)",
          }}
        >
          <CircularProgress sx={{ color: "rgb(247, 230, 173)" }} />
        </Box>
      </>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        display: { xs: "flex", md: "block" },
        flexDirection: { xs: "column" },
        justifyContent: "center",
        alignItems: "center",
        minHeight:"100vh"
      }}
    >
      {eventList?.slice(0, endpoint).map((item, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "rgb(66, 92, 90)",
            marginTop: "2%",
            // marginLeft: "25px",
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
            marginRight: { xs: "0px", md: "20%" },
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
