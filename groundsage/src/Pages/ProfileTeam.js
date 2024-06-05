import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
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
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [endpoint, setEndpoint] = useState(4);
  // const [eventListLength, setEventListLength] = useState("Show More...");
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
          setData(userDataFromApi);
          console.log(userDataFromApi);
          setLoading(false);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleClick = () => {
    setEndpoint(endpoint === 4 ? data?.event_data.length : 4);
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
        pb: 4,
        width: { xs: "100%", sm: "90%" },
      }}
    >
      <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { xs: "center", md: "flex-start" },
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            // marginLeft: { xs: 0, md: "7%" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                border: "2px solid grey",
                backgroundColor: "rgb(125, 144, 143)",
                p: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginRight: "20px",
              }}
              // onClick={() => setMembers((members) => members + 1)}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center" }}
              >
                {data?.count?.team_count}
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
              // onClick={() => setCount((count) => count + 1)}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center" }}
              >
                {data?.count?.event_count}
                <br />
                <Typography sx={{ color: "rgb(174, 174, 174)" }}>
                  Events
                </Typography>
              </Typography>
            </Box>
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
          {user.user_name} has worked with these following members:
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
          {data?.event_data?.slice(0, endpoint).map((event, index) => (
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
                {event.event_name}
                <Typography
                  sx={{
                    padding: "5px",
                    fontSize: "1.2rem",
                    color: "rgb(174, 174, 174)",
                  }}
                >
                  {event.member_count} members
                </Typography>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: "5px", cursor: "pointer" }}
                  onClick={() => handleExpandList(index)}
                >
                  {event?.members.slice(0, 5).map((member, idx) => (
                    <Box key={idx} sx={{ textAlign: "center" }}>
                      <Avatar>{member.charAt(0).toUpperCase()}</Avatar>
                      <Typography sx={{ color: "white" }}>{member}</Typography>
                    </Box>
                  ))}
                  {event?.members.length > 5 && (
                    <>
                      {[...Array(3)].map((_, idx) => (
                        <img
                          key={idx}
                          src="../../Images/Vector (1).png"
                          alt="ellipsis"
                          style={{
                            width: "5px",
                            height: "8px",
                            marginTop: "20px",
                          }}
                        />
                      ))}
                    </>
                  )}
                </Stack>
                {expandedStates[index] &&
                  event?.members?.length > 5 &&
                  chunkArray(event?.members?.slice(5), 5).map(
                    (chunk, chunkIndex) => (
                      <Stack key={chunkIndex} direction="row" spacing={1}>
                        {chunk.map((member, idx) => (
                          <Box key={idx} sx={{ textAlign: "center" }}>
                            <Avatar>{member.charAt(0).toUpperCase()}</Avatar>
                            <Typography sx={{ color: "white" }}>
                              {member}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    )
                  )}
              </Box>
            </Box>
          ))}
          {data?.event_data?.length > 4 && (
            <Typography
              textAlign="center"
              sx={{
                color: "rgb(255, 255, 255)",
                cursor: "pointer",
                fontFamily: "Roboto",
              }}
              onClick={handleClick}
            >
              {endpoint === 4 ? "Show More" : "Show Less"}
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
