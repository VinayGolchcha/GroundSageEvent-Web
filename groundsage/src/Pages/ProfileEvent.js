import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import SidBar from "../Component/Sidbar";

<<<<<<< HEAD

import { Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
    

const ProfileEvent = () => {


=======
import { Box, Typography } from "@mui/material";

const ProfileEvent = () => {
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
  const [eventList, setEventList] = useState([
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event First Name",
<<<<<<< HEAD
     
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Second Name",
<<<<<<< HEAD

    
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Third Name",
<<<<<<< HEAD
      
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Fourth Name",
<<<<<<< HEAD
   
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
    },

    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Fifth Name",
<<<<<<< HEAD
      
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "Event Sixth Name",
<<<<<<< HEAD
     
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
    },
    {
      date: "13th April 2024 - 13th Jun 2024",
      eventType: "FOOD EVENT",
<<<<<<< HEAD
    
    },
  ]);
 
=======
    },
  ]);
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd

  const [endpoint, setEndpoint] = useState(4);

  const [eventListLength, setEventListLength] = useState("Show More...");

<<<<<<< HEAD


  const handleClick = () => {
    if(eventListLength === "Show More..."){
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    }else if(eventListLength === "Show Less..."){
=======
  const handleClick = () => {
    if (eventListLength === "Show More...") {
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    } else if (eventListLength === "Show Less...") {
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
      setEndpoint(4);
      setEventListLength("Show More...");
    }
  };

<<<<<<< HEAD



=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
  return (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        // height: { ...[eventList.length === 0 ? "100vh" : "auto"] }
<<<<<<< HEAD
        
        marginLeft:"130px"
      }}
    >
     
      
      {eventList.slice(0, endpoint).map((item, index) => {
        
=======

        marginLeft: "130px",
      }}
    >
      {eventList.slice(0, endpoint).map((item, index) => {
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
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
<<<<<<< HEAD
               
                justifyContent: "center",
                width:'700px'
              }}
            >
              
              <img src="confetti-05.png" alt="Confetti" style={{marginLeft:'-100px'}} />
            </Box>
            <Box
              sx={{
               marginRight:'40%',
=======

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
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
                background:
                  "linear-gradient(rgb(65, 93, 91), rgba(115, 135, 135, 0))",
                display: "grid",
                alignItems: "center",
<<<<<<< HEAD
               
                
               
=======
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.0rem",
                  fontFamily: "Poppins",
<<<<<<< HEAD
                   display:'block'
=======
                  display: "block",
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
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
<<<<<<< HEAD
               {item.date} 
              </Typography>
            
=======
                {item.date}
              </Typography>
>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
            </Box>
          </Box>
        );
      })}
<<<<<<< HEAD
     
=======

>>>>>>> 9e2ad9496ce096dc35e442aa378e9a9233ba99dd
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
}
 


export default ProfileEvent;


