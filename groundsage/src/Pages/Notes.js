import React, { useState, useEffect, useContext } from "react";
import { Typography, Box } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Component/Loading";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditEventPopUp from "../Component/note/EditEventPopUp";
import { AuthContext } from "../ContextApi/AuthContext";
import ConfirmDelete from "../Component/ConfirmDelete";

const Notes = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
    }catch(error){
      setIsLoading(false);
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.error(error);
    }

  }
  const fetchNotes = async () => {
    try{
      setIsLoading(true);
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
      setIsLoading(false);
      console.log(newEventList);
    }catch(error){
      setIsLoading(false);
      setEventList([]);
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[activeEventId])
  const maxItems = 3;

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const refreshPage = () => {
    setSelect(false);
    const newEventList = eventList.map((item) => ({
      ...item,
      isSelected: false,
    }));
    setEventList(newEventList);
    setAllselect(false);
    // window.location.reload(false);
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
    }catch(error){
      console.log(error);
      const errors = error?.response?.data?.errors;
      errors?.forEach(element => {
        toast.error(element?.msg ,  {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          }}); 
      });
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
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
    }catch(error){
      console.log(error.message);
      const errors = error?.response?.data?.errors;
      errors?.forEach(element => {
        toast.error(element?.msg ,  {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          }}); 
      });
      if(error?.response?.message){
        toast.error(error?.response?.message);
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item);
      }
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
    if(ele.length === 0) {
      toast.warning("Please select the note to edit ", {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        }});
        return;
    }
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
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    console.log(newEventList)
    setEventList(newEventList);
  };
  
  const handleDeleteOpen = () => {
    const ele = eventList?.filter((item) => item?.isSelected === true);
    if(ele?.length === 0){
      toast.warning("Please select the note to delete" , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      return;
    }
    handleOpen();
  }
  const handleDelete = () => {
      const ele = eventList?.filter(item => item.isSelected === true);
      setEventList(eventList?.filter(item => item.isSelected !== true));
      const ids = ele?.map(item => item?._id);
      if(ids.length === 0){
        toast.warning("Please select the note to delete ", {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          }});
      }
      deleteNoteByMultipleId(ids);
      handleClose()
    }
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
      <ConfirmDelete open={open} handleClose={handleClose} handleIncomeDelete ={handleDelete}/>
      <ToastContainer position="bottom-right" style={{ color: "red" }} />
      <Box
          component='img'
          src="../../Images/arrow-left.png"
          alt="Share"
          sx={{
            cursor: "pointer",
            width: {xs:"35px",md:"45px"},
            margin: {xs:"20px 0px 0px 20px",md:"10px 0px 0px 20px"},
          }}
          onClick={() => {
            navigate(-1); // Navigate back by one step in the history stack
          }}
        />
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: { xs: "30px",sm:"40px", md: "56px" },
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: {xs:"0px",md:"-40px"},
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
        onClick= {refreshPage}
      >
        Notes
      </Typography>

      <Box>
        {" "}
        {eventList?.length === 0 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60vw",
                width : "100%"
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
                <img src="Images/sticky-note-1.png" />
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
                fontSize : { xs: "27px",sm:"32px", md: "38px" , lg : "38px"}
              }}
            >
              No Notes Added
            </Typography>
              <Typography
                textAlign="center"
                sx={{
                  fontSize: "1.3rem",
                  margin: "25px 0px",
                  color: "rgb(216, 217, 217)",
                  fontFamily: "Poppins",
                  cursor : "pointer",
                  fontSize : {xs : "25px" , sm : "30px" , md : "35px" , lg : "40px"}
                }}
                onClick={() => setIsPopupOpen(true)}
              >
                Click here to create....
              </Typography>
          </Box>
        )}
        {eventList?.length > 0 && (
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
                    onClick={handleDeleteOpen}
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
                        fontSize: {lg : "1.2rem", md : "1.2rem" , sm : "1.2rem" , xs : "14px"},
                      }}
                    >
                      {item?.notes_heading}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgb(254, 240, 180)",
                        fontSize: {lg : "1.2rem", md : "1.2rem" , sm : "1.2rem" , xs : "14px"},
                        fontFamily: "Poppins",
                        textAlign: "right",
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
