import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import SidBar from "../Component/Sidbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SimplePopup from "../Component/Popup";
import { useNavigate } from "react-router-dom";

const ProfileTeam = () => {
  const [count, setCount] = useState(0);
  const [members, setmembers] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [eventList, setEventList] = useState([
    {
      eventType: "FOOD EVENT ",
    },
    {
      eventType: "FOOD EVENT 1",
    },
    {
      eventType: "FOOD EVENT 2",
    },
    {
      eventType: "FOOD EVENT 3",
    },

    {
      eventType: "FOOD EVENT 4",
    },
    {
      eventType: "FOOD EVENT 5",
    },
    {
      eventType: "FOOD EVENT 6",
    },
  ]);

  const [endpoint, setEndpoint] = useState(4);

  const [eventListLength, setEventListLength] = useState("Show More...");

  const handleClick = () => {
    if (eventListLength === "Show More...") {
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    } else if (eventListLength === "Show Less...") {
      setEndpoint(3);
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

  const handleSavePopupData = (data) => {
    // Save the data (you can perform your save logic here)
    console.log("Popup data saved:", data);

    // Close the popup
    handlePopupClose();

    // Navigate back to the profile about page
    navigate("/profile");
  };

  return (
    <div>
      <div className="profile" style={{ backgroundColor: "rgb(66, 92, 90)" }}>
        <div
          className="boxes"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            <Box
              // height={40}
              // width={120}
              my={4}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{
                border: "2px solid grey",
                display: "flex",
                backgroundColor: "rgb(125, 144, 143)",
                marginRight: "20px",
              }}
            >
              <Typography
                onClick={() => setmembers((members) => members + 1)}
                component="div"
                variant="h6"
                style={{
                  color: "white",
                  justifyContent: "center",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {members}
                <br></br>
                <Typography style={{ color: "rgb(174, 174, 174)" }}>
                  Teams
                </Typography>
              </Typography>
            </Box>
            <Box
              my={4}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{
                border: "2px solid grey",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "rgb(125, 144, 143)",
              }}
            >
              <Typography
                onClick={() => setCount((count) => count + 1)}
                component="div"
                variant="h6"
                style={{
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {count}
                <Typography style={{ color: "rgb(174, 174, 174)" }}>
                  Events
                </Typography>
              </Typography>
            </Box>
          </div>
          <div className="jointeam">
            <img
              src="../../Images/Group 33665.png"
              alt="add"
              style={{
                cursor: "pointer",
              }}
              // onClick={handleOpenPopup} // Add onClick event to open the popup
              onClick={handlePopupOpen}
            ></img>
            <Typography
              style={{
                color: "rgb(174, 174, 174)",
                cursor: "pointer",
              }}
              onClick={handlePopupOpen}
            >
              join team
            </Typography>
          </div>
        </div>
        <Typography
          component="div"
          variant="h5"
          style={{ color: "grey", marginTop: "20px" }}
        >
          Prashant Pandey has worked with these following members:
        </Typography>
      </div>

      <div
        className="right"
        style={{
          width: "100%",
          // float: "left",
          boxSizing: "border-box",
          backgroundColor: "rgb(66, 92, 90)",
          display:'flex'
        }}
      >
        <Box>
          {eventList.slice(0, endpoint).map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: "rgb(66, 92, 90)",
                  // margin: "2%",  
                  border: "2px solid rgba(0, 0, 0, 0.16)",
                  borderRadius: "10px",
                  padding: "15px",
                  display: "flex",
                  justifyContent:"space-between",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // width:"40%"
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
                    <Typography style={{ padding: "5px", fontSize: "1.2rem" }}>
                      9members
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{ marginTop: "15px", cursor: "pointer" }}
                  >
                    <Avatar>A</Avatar>
                    <Avatar>B</Avatar>
                    <Avatar>C</Avatar>
                    <Avatar>D</Avatar>
                    <Avatar>E</Avatar>
                    <img
                      src="../../Images/Vector (1).png"
                      alt="dx"
                      style={{ width: "8px", height: "8px", marginTop: "20px" }}
                    ></img>
                    <img
                      src="../../Images/Vector (1).png"
                      alt="qefvwdf"
                      style={{ width: "8px", height: "8px", marginTop: "20px" }}
                    ></img>
                    <img
                      src="../../Images/Vector (1).png"
                      alt="wqfw"
                      style={{ width: "8px", height: "8px", marginTop: "20px" }}
                    ></img>
                  </Stack>
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

        {isPopupOpen && (
          <SimplePopup
            open={isPopupOpen}
            onClose={handlePopupClose}
            onSave={handleSavePopupData}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileTeam;
