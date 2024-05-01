import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [eventList, setEventList] = useState([
    {
      date: " 13th Jun 2024",
      eventType: "FOOD EVENT  - Transaction",
      eventDes:
        "Salary for staff out for this month. Rent collected. New Rods needed for replacement. More tickets needed on the counter. Rent for shop 2 pending.",
      isSelected: false,
    },
    {
      date: "13th Jun 2024",
      eventType: "FOOD EVENT  - Transaction",
      eventDes:
        "Salary for staff out for this month. Rent collected. New Rods needed for replacement. More tickets needed on the counter. Rent for shop 2 pending.",
      isSelected: false,
    },
    {
      date: " 13th Jun 2024",
      eventType: "FOOD EVENT  - Transaction",
      eventDes:
        "Salary for staff out for this month. Rent collected. New Rods needed for replacement. More tickets needed on the counter. Rent for shop 2 pending.",
      isSelected: false,
    },
    {
      date: " 13th Jun 2024",
      eventType: "FOOD EVENT  - Transaction",
      eventDes:
        "Salary for staff out for this month. Rent collected. New Rods needed for replacement. More tickets needed on the counter. Rent for shop 2 pending.",
      isSelected: false,
    },

    // {
    //   date: " 13th Jun 2024",
    //   eventType: "FOOD EVENT  - Transaction",
    //   eventDes: "Celebration with different cuisines from different regions...",
    //   isSelected: false,
    // },
    // {
    //   date: " 13th Jun 2024",
    //   eventType: "FOOD EVENT  - Transaction",
    //   eventDes: "Celebration with different cuisines from different regions...",
    //   isSelected: false,
    //   isSelected: false,
    // },
    // {
    //   date: " 13th Jun 2024",
    //   eventType: "FOOD EVENT  - Transaction",
    //   eventDes: "Celebration with different cuisines from different regions...",
    //   isSelected: false,
    // },
  ]);
  // const [endpoint, setEndpoint] = useState(3)
  const [allselect, setAllselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const maxItems = 3;

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleSaveNote = (newData) => {
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const newItem = {
      date: formattedDate,
      eventType: newData.field1 || "",
      eventDes: newData.field2 || "",
      isSelected: false,
    };

    setEventList([newItem, ...eventList]);
    setIsPopupOpen(false);
    toast.success("Note added successfully!", {
      style: {
        // Change font color
        fontSize: "16px", // Change font size
        fontFamily: "Inter", // Change font family
        fontWeight: "600", // Change font weight
        color: "rgb(66, 92, 90)",
      },
    }); // Use toast to show success message
  };

  const handleAllChange = () => {
    const newEventList = eventList.map((item) => ({
      ...item,
      isSelected: !allselect,
    }));
    setEventList(newEventList);
    setAllselect(!allselect);
  };

  // const handleClick = () => {
  //   if (eventListLength === "Show More...") {
  //     setEndpoint(eventList.length);
  //     setEventListLength("Show Less...");
  //   } else if (eventListLength === "Show Less...") {
  //     setEndpoint(3);
  //     setEventListLength("Show More...");
  //   }
  // };

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
    toast.success("Note Deleted successfully!", {
      style: {
        // Change font color
        fontSize: "16px", // Change font size
        fontFamily: "Inter", // Change font family
        fontWeight: "600", // Change font weight
        color: "rgb(66, 92, 90)",
      },
      // Other options like position, autoClose, etc.
    }); // Use toast to show success message
  };
  const handleSelectChange = () => {
    setSelect(!select);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div style={{ background: "rgb(66, 92, 90)", minHeight: "100vh" }}>
      <ToastContainer position="bottom-right" style={{ color: "red" }} />
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{
          cursor: "pointer",
          width: "45px",
          margin: "10px 0px 0px 20px",
        }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: "56px",
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: "-35px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
        onClick= {refreshPage}
      >
        Notes
      </Typography>

      <Box>
        {" "}
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
                  <Checkbox
                    sx={{ marginRight: "8px" }}
                    variant="outlined"
                    color="neutral"
                    checked={allselect}
                    onChange={handleAllChange}
                  />
                }
                sx={{
                  color: "rgb(216, 217, 217)",
                  marginLeft: "0px",
                  fontFamily: "Poppins",
                  "& .css-ahj2mt-MuiTypography-root": {
                    fontSize: "1.2rem",
                  },
                }}
              />
            ) : (
              <FormControlLabel
                label="Select"
                control={
                  <Checkbox
                    sx={{ marginRight: "8px" }}
                    variant="outlined"
                    color="neutral"
                    checked={select}
                    onChange={handleSelectChange}
                  />
                }
                sx={{
                  color: "rgb(216, 217, 217)",
                  marginLeft: "0px",
                  fontFamily: "Poppins",
                  "& .css-ahj2mt-MuiTypography-root": {
                    fontSize: "1.2rem",
                  },
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
                  style={{ padding: "2px", height: "30px", cursor: "pointer" }}
                  onClick={handleDelete}
                />
              ) : (
                <img
                  src="add-icon.png"
                  alt="add-icon"
                  onClick={handleOpenPopup}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Box>
          </Box>
        )}
        {eventList
          .slice(0, showAll ? eventList.length : maxItems)
          .map((item, index) => {
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
                    sx={{
                      display: "flex",
                      alignItems: "center", // Center the checkboxes vertically
                      justifyContent: "center",
                    }}
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
                </Box>
                <Box
                  sx={{
                    background:
                      "linear-gradient(rgb(65, 93, 91), rgba(115, 135, 135, 0))",
                    //   display: "grid",
                    //   alignItems: "center",
                    padding: "3px",
                    marginLeft: "10px",
                    width: "100%", // Ensure date div takes full width
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(216, 217, 217)",
                        fontWeight: "600",
                        fontSize: "24px",
                        fontFamily: "Poppins",
                      }}
                    >
                      {item.eventType}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgb(254, 240, 180)",
                        fontSize: "1.2rem",
                        fontFamily: "Poppins",
                        textAlign: "right",
                        marginTop: "-10px",
                      }}
                    >
                      {item.date}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      color: "rgb(216, 217, 217)",
                      fontFamily: "Poppins",
                      width: "65%",
                    }}
                  >
                    {item.eventDes}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        {eventList.length > maxItems && (
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px",
            }}
            onClick={toggleShowAll}
          >
            {showAll ? "Show Less..." : "Show More..."}
          </Typography>
        )}
      </Box>
      <AddNotes
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Notes;
