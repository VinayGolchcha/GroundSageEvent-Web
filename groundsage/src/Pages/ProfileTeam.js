import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SimplePopup from "../Component/Popup";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../ContextApi/AuthContext";

const ProfileTeam = () => {
  const [count, setCount] = useState(0);
  const [members, setMembers] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {user} = useContext(AuthContext);

  const [eventList, setEventList] = useState([
    {
      eventType: "FOOD EVENT",
      teams: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    },
    { eventType: "FOOD EVENT 1", teams: ["D", "E"] },
    { eventType: "FOOD EVENT 2", teams: ["F", "G", "H"] },
    { eventType: "FOOD EVENT 3", teams: ["I", "J", "K", "L"] },
    { eventType: "FOOD EVENT 4", teams: ["M"] },
    {
      eventType: "FOOD EVENT 5",
      teams: ["N", "O", "P", "Q", "R", "P", "Q", "R", "S", "T", "U", "V"],
    },
    { eventType: "FOOD EVENT 6", teams: ["S", "T"] },
  ]);
  const [endpoint, setEndpoint] = useState(4);
  const [eventListLength, setEventListLength] = useState("Show More...");
  const [expandedStates, setExpandedStates] = useState(Array(7).fill(false));

  useEffect(() => {
    // Fetch data from the API
    console.log(user);
    fetch(
      "https://groundsageevent-be.onrender.com/api/v1/profile/get-user-event-and-team-count",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.token,
          role_id: user?.role_id,
        },
        body: JSON.stringify({
          user_id: user?.user_id,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const userDataFromApi = data.data;
          
          console.log(userDataFromApi);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleClick = () => {
    if (eventListLength === "Show More...") {
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    } else {
      setEndpoint(4);
      setEventListLength("Show More...");
    }
  };

  const navigate = useNavigate();

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleExpandList = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };


  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const handleSavePopupData = (data) => {
    console.log("Popup data saved:", data);
    handlePopupClose();
    navigate("/profile");
  };

  return (
    <Box sx={{ backgroundColor: "rgb(66, 92, 90)", pb: 4,width:{xs:"100%",sm:"90%"} }}>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            // marginLeft: { xs: 0, md: "7%" },
            
          }}
        >
          <Box
            sx={{
              border: "2px solid grey",
              backgroundColor: "rgb(125, 144, 143)",
              p: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setMembers((members) => members + 1)}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", textAlign: "center" }}
            >
              {members}
              <br />
              <Typography sx={{ color: "rgb(174, 174, 174)" }}>
                Teams
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              border: "2px solid grey",
              backgroundColor: "rgb(125, 144, 143)",
              p: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setCount((count) => count + 1)}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", textAlign: "center" }}
            >
              {count}
              <br />
              <Typography sx={{ color: "rgb(174, 174, 174)" }}>
                Events
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              textAlign: "center",
              ml: { xs: 0, sm: "auto" },
            }}
            onClick={handlePopupOpen}
          >
            <img src="../../Images/Group 33665.png" alt="add" />
            <Typography sx={{ color: "rgb(174, 174, 174)" }}>
              Join team
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h5"
          sx={{ color: "grey", mt: 2, textAlign: "center" }}
        >
          Prashant Pandey has worked with these following members:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            px: { xs: 2, md: 4 },
          }}
        >
          {eventList.slice(0, endpoint).map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "rgb(66, 92, 90)",
                border: "2px solid rgba(0, 0, 0, 0.16)",
                borderRadius: "10px",
                p: 2,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                // width:{xs:"100%",sm:"90%"} 
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins",
                }}
              >
                {item.eventType}
                <Typography
                  sx={{
                    padding: "5px",
                    fontSize: "1.2rem",
                    color: "rgb(174, 174, 174)",
                  }}
                >
                  {item.teams.length} members
                </Typography>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: "5px", cursor: "pointer" }}
                  onClick={() => handleExpandList(index)}
                >
                  {item.teams.slice(0, 5).map((team, idx) => (
                    <Avatar key={idx}>{team}</Avatar>
                  ))}
                  {item.teams.length > 5 && (
                    <>
                      {[...Array(3)].map((_, idx) => (
                        <img
                          key={idx}
                          src="../../Images/Vector (1).png"
                          alt="ellipsis"
                          style={{
                            width: "8px",
                            height: "8px",
                            marginTop: "20px",
                          }}
                        />
                      ))}
                    </>
                  )}
                </Stack>
                {expandedStates[index] &&
                  item.teams.length > 5 &&
                  chunkArray(item.teams.slice(5), 5).map(
                    (chunk, chunkIndex) => (
                      <Stack key={chunkIndex} direction="row" spacing={1}>
                        {chunk.map((team, idx) => (
                          <Avatar key={idx}>{team}</Avatar>
                        ))}
                      </Stack>
                    )
                  )}
              </Box>
            </Box>
          ))}
          {eventList.length > 4 && (
            <Typography
              textAlign="center"
              sx={{
                color: "rgb(255, 255, 255)",
                cursor: "pointer",
                fontFamily: "Roboto",
              }}
              onClick={handleClick}
            >
              {eventListLength}
            </Typography>
          )}
        </Box>
        {isPopupOpen && (
          <SimplePopup
            open={isPopupOpen}
            onClose={handlePopupClose}
            onSave={handleSavePopupData}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProfileTeam;
