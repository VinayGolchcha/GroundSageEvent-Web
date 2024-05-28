import React, { useState, useEffect, useContext } from "react";
import { Typography, Box } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Component/Loading";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditEventPopUp from "../Component/note/EditEventPopUp";
import { AuthContext } from "../ContextApi/AuthContext";

const Notes = () => {
  const [eventList, setEventList] = useState([
  ]);
  // const [endpoint, setEndpoint] = useState(3)
  const [allselect, setAllselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(true);
  const [isEditPopupOpen , setIsEditPopupOpen] = useState(false);
  const [selectedId , setSelectedId] = useState(null);
  const [selectedItem , setSelectedItem] = useState(null);
  const {user , activeEventId} = useContext(AuthContext);
  console.log(user);
  console.log(activeEventId);
  const deleteNoteByMultipleId = async (ids) => {
    console.log(ids)
    try{
      const res = axios.delete(`${process.env.REACT_APP_API_URI}/note/delete-note`  ,{
        headers: {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          role_id : user?.role_id
        },
        data: { ids }
      }
      );
      console.log(res);
      fetchNotes();
    }catch(err){
      toast.error(err);
    }

  }
  const fetchNotes = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/note/fetch-notes/${user?.user_id}/${activeEventId}`, {
        headers: {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
        }
      });
      const newEventList = res?.data?.data?.map((item) => ({...item , isSelected : false}))
      setEventList(newEventList);
      console.log(eventList);
      setIsLoading(false)
    }catch(err){
      setIsLoading(false);
      toast.error(err.message);
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[])
  const maxItems = 3;

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const refreshPage = () => {
    window.location.reload(false);
  }
  
  const forrmattedDate = (data) => {
    let date = new Date(data);
    const array = date.toString().split(" ");
    date = array.slice(1,4).join(" ");
    return date
  }

  const handleSaveEditNote = async (body) => {
    try{
      const res = await axios.put(`${process.env.REACT_APP_API_URI}/note/update-note/${selectedId}` , body ,{
        headers: {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          role_id : user?.role_id
        }
      });
      console.log(res);
      toast.success(res?.data.data, {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },});
        fetchNotes();
    }catch(err){
      console.log(err);
    }
  }
  const handleSaveNote = async (body) => {
    // const formattedDate = new Date().toLocaleDateString("en-US", {
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",
    // });

    // const newItem = {
    //   date: formattedDate,
    //   eventType: newData.field1 || "",
    //   eventDes: newData.field2 || "",
    //   isSelected: false,
    // };

    // setEventList([newItem, ...eventList]);
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/note/create-note` , body ,{
        headers: {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          role_id : user?.role_id
        }
      }
       );
      setIsPopupOpen(false);
      console.log(res);
      toast.success("Note added successfully!", {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },});
        fetchNotes();
    }catch(err){
      console.log(err.message);
    }
    
     // Use toast to show success message
  };

  const deleteNoteById = async(id) => {
    try{
      const res = await axios.delete(`${process.env.REACT_APP_API_URI}/note/delete-note/${id}` , {
        headers : {
        'authorization': user?.token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }
      });
      console.log(res);
      toast.success(res.data.message, {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
        // Other options like position, autoClose, etc.
      }); // Use toast to show success message
      fetchNotes();
    }catch(err){
      toast.error(err);
      console.log(err);
    }
  }
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
  const handleEditOpenPopup = () => {
    const ele = eventList?.filter(item => item.isSelected === true);
    if(ele.length > 1){
      toast.warning("Cannot edit the multiple notes ", {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
        // Other options like position, autoClose, etc.
      })
      return ;
    }
    setSelectedId(ele[0]?._id);
    setSelectedItem(ele[0]);
    setIsEditPopupOpen(!isEditPopupOpen);
  }

  const handleCheckboxChange = (index) => {
    const newEventList = eventList.map((item, i) => {
      if (item._id === index) {
        return { ...item, isSelected: true };
      }
      return item;
    });
    console.log(newEventList)
    setEventList(newEventList);
  };

  const handleDelete = () => {
    const ele = eventList?.filter(item => item.isSelected === true);

      const ids = ele?.map(item => item?._id);
      deleteNoteByMultipleId(ids);}
  const handleSelectChange = () => {
    setSelect(!select);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  if(isLoading){
    return(<Loading/>)
  }else{
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
        {eventList?.length !== 0 && (
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
                <>
                  <ModeEditIcon sx={{color : "white" , cursor : "pointer"}} onClick={handleEditOpenPopup}/>
                  <img
                    src="deleteIcon.png"
                    alt="delete Icon"
                    style={{ padding: "2px", height: "30px", cursor: "pointer" }}
                    onClick={handleDelete}
                  />
                </>
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
          ?.slice(0, showAll ? eventList?.length : maxItems)
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
                        onChange={() => handleCheckboxChange(item?._id)}
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
                      {item?.notes_heading}
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
                      {forrmattedDate(item?.date)}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      color: "rgb(216, 217, 217)",
                      fontFamily: "Poppins",
                      width: "65%",
                    }}
                  >
                    {item?.notes_description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        {eventList?.length > maxItems && (
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
        user={user}
        activeEventId = {activeEventId}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveNote}
      />
      <EditEventPopUp
      open={isEditPopupOpen}
      onClose={() => setIsEditPopupOpen(false)}
      onSave={handleSaveEditNote}
      item = {selectedItem}
      />
    </div>
  );}
};

export default Notes;
