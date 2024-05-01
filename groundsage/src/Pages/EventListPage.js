import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Checkbox from '@mui/joy/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";

export default function EventListPage() {
  const navigate = useNavigate();

  const [eventList, setEventList] = useState([
    
  ]);
  const [endpoint, setEndpoint] = useState(3);
  const [allselect, setAllselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [eventListLength, setEventListLength] = useState("Show More...");

  const handleAllChange = () => {
    const newEventList = eventList.map((item) => ({
      ...item,
      isSelected: !allselect,
    }));
    setEventList(newEventList);
    setAllselect(!allselect);
  };

  const handleClick = () => {
    if(eventListLength === "Show More..."){
      setEndpoint(eventList.length);
      setEventListLength("Show Less...");
    }else if(eventListLength === "Show Less..."){
      setEndpoint(3);
      setEventListLength("Show More...");
    }
  };

  const handleCheckboxChange = (index) => {
    const newEventList = eventList.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setEventList(newEventList);
  };

  const handleDelete = () => {
    const newArray = eventList.filter((item) => item.isSelected !== true);
    setEventList(newArray);
  };
  const handleSelectChange = () => {
    setSelect(!select);
  };
  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        // height: { ...[eventList.length === 0 ? "100vh" : "auto"] },
        minHeight: "100vh",
        minHeight: "100vh",
      }}
    >
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{ cursor: "pointer", width: "45px", marginLeft: "20px" }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
      <Box sx={{ backgroundColor: "rgb(66, 92, 90)", display: "flex" }} onClick = {refreshPage}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "rgb(247, 230, 173)",
            fontWeight: "600",
            width: "100%",
            // padding: "30px",
            marginTop: "-20px",
            fontFamily: "Outfit",
            textShadow: "0 6px rgba(81,67,21,0.8)"
          }}
        >
          All Events
        </Typography>
      </Box>
      {eventList.length !== 0 && (
        <Box
          sx={{
            margin: "2% 18%",
            padding: "0px 15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {select === true ? (
            <FormControlLabel
              label="Select All"
              control={
                <Checkbox sx={{marginRight : "8px"}} variant="outlined" color="neutral" checked={allselect} onChange={handleAllChange} />
              }
              sx={{
                color: "rgb(216, 217, 217)",
                marginLeft: "0px",
                fontFamily: "Poppins",
                "& .css-ahj2mt-MuiTypography-root" : {
                  fontSize : "1.2rem"
                  }
              }}
              
            />
          ) : (
            <FormControlLabel
              label="Select"
              control={
                <Checkbox sx={{marginRight : "8px"}} variant="outlined" color="neutral" checked={select} onChange={handleSelectChange} />
              }
              sx={{
                color: "rgb(216, 217, 217)",
                marginLeft: "0px",
                fontFamily: "Poppins",
                "& .css-ahj2mt-MuiTypography-root" : {
                fontSize : "1.2rem"
                }
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {select === true ? (
              <img
                src="deleteIcon.png"
                alt="delete Icon"
                style={{ padding: "2px", height: "30px" }}
                onClick={handleDelete}
              />
            ) : (
              <img src="add-icon.png" alt="add-icon" />
            )}
          </Box>
        </Box>
      )}
      {eventList.slice(0, endpoint).map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgb(66, 92, 90)",
              margin: "2% 18%",
              border: "2px solid rgba(0, 0, 0, 0.16)",
              borderRadius: "10px",
              padding: "15px",
              display: "flex",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "start", height: "100%" }}
              >
                {select === true && (
                  <Checkbox
                    variant="outlined" 
                    color="neutral"
                    checked={item.isSelected}
                    onChange={() => handleCheckboxChange(index)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </Box>
              <img src="confetti-05.png" alt="Confetti" />
            </Box>
            <Box
              sx={{
                marginLeft: "7%",
                background:
                  "linear-gradient(rgb(65, 93, 91), rgba(115, 135, 135, 0))",
                display: "grid",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography
                sx={{
                  color: "rgb(254, 240, 180)",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                }}
              >
                {item.date}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(216, 217, 217)",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                }}
              >
                {item.eventType}
              </Typography>
              <Typography
                sx={{ color: "rgb(216, 217, 217)", fontFamily: "Poppins" }}
              >
                {item.eventDes}
              </Typography>
            </Box>
          </Box>
        );
      })}
      {eventList.length === 0 && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60vw",
              width: "100vw",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(217, 217, 217, 0.3)",
                borderRadius: "166px",
                padding: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="event-management-1.png" />
            </Box>
          </Box>
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              margin: "25px 0px",
              color: "rgba(255, 255, 255, 0.54)",
              fontFamily: "Outfit",
            }}
          >
            No Events Added
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              fontSize: "1.3rem",
              margin: "25px 0px",
              color: "rgb(216, 217, 217)",
              fontFamily: "Poppins",
            }}
          >
            Click here to create....
          </Typography>
        </Box>
      )}
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
