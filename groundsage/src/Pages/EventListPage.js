import { useContext, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loading from "../Component/Loading";
import { AuthContext } from "../ContextApi/AuthContext";
import EditEvent from "../Component/event/EditEvent";



export default function EventListPage() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [file, setFIle] = useState([]);
  const [endpoint, setEndpoint] = useState(3);
  const [allselect, setAllselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [eventListLength, setEventListLength] = useState("Show More...");
  const [isLoading , setIsLoading] = useState(true);
  const [selectedId , setSelectedId] = useState(null);
  const [selectedItem , setSelectedItem] = useState(null);
  const [isEdit , setIsEdit] = useState(false);
  const {user , setEventIds , eventIds , setEvents , setActiveEvent , setActiveEventId, activeEventId} = useContext(AuthContext);
  
  const today = new Date();

  const handleEditEventApi = async (body) => {
    try{
      console.log(body);
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key , body[key]);
      })
      const files = body?.files;
      files.forEach((f) => {
        formData.append("files" , f);
      })
      const publicIds = body?.public_ids;
      console.log(publicIds);
      // publicIds.forEach((id) => {
        // formData.append('public_ids', publicIds); 
      // });

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/event/update-event/${selectedId}`,
        formData , {
          headers: {
            'authorization': `${user?.token}`, // Ensure the token format is correct
            'Accept': 'application/json',
            role_id : user?.role_id
          }
        }
      );
      console.log(res);
      toast.success(res?.data?.data , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        }});
        setIsEdit(!isEdit);
    }catch(err){
      console.log(err);
      toast.error(err);
    }
  }
  const fetchEvents = async () => {
    try{
      const res = await axios.get(`https://groundsageevent-be.onrender.com/api/v1/event/get-all-user-event/${user?.user_id}` , { headers: {
        'authorization': user?.token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        role_id : user?.role_id
    } });
      let eventList = res?.data?.data;
      eventList = eventList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setEvents(eventList);
      const newEventList = eventList?.map((item) => ({...item , isSelected : false}));
      setEventList(newEventList);
      setEventIds(newEventList.map((item) => ( {id : item?.id , event_name : item?.event_name } )));
      console.log(eventIds);
      setIsLoading(false);
      console.log(res)
      toast.success("events fetched successfully");
    }catch(err){
      console.log(err);
      toast.error(err?.response?.data.message);
      setIsLoading(false);
    }
  }

  useEffect(()=> {
    fetchEvents();
  },[])

  const handleAllChange = () => {
    const newEventList = eventList.map((item) => ({
      ...item,
      isSelected: !allselect,
    }));
    setEventList(newEventList);
    setAllselect(!allselect);
  };

  const handleClick = () => {
    if (eventListLength === "Show More...") {
      setEndpoint(eventList?.length);
      setEventListLength("Show Less...");
    } else if (eventListLength === "Show Less...") {
      setEndpoint(3);
      setEventListLength("Show More...");
    }
  };

  const handleEditEvent = () => {
    const ele = eventList?.filter(item => item.isSelected === true);
    console.log(ele);
    if(ele.length > 1) {
      toast.warning("Cannot Edit the multiple Events" , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
        // Other options like position, autoClose, etc.
      });
      return
    }
    setSelectedId(ele[0]?.id);
    setSelectedItem(ele[0]);
    setIsEdit(true);
    
  }
  const handleCheckboxChange = (index) => {
    console.log(index)
    const newEventList = eventList.map((item, i) => {
      if (item?.id === index) {
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
  const forrmattedDate = (data) => {
    let date = new Date(data);
    const array = date.toString().split(" ");
    date = array.slice(1,4).join(" ");
    return date
  }
  if(isLoading){
    return (<Loading/>);
  }else{
  };

  return (
    <>
    { isEdit === true ? (<EditEvent selectedItem = {selectedItem} handleSaveEvent = {handleEditEventApi} />) : (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
        // height: { ...[eventList.length === 0 ? "100vh" : "auto"] },
        // minHeight: "100vh",
        // minHeight: "100vh",
        padding: "20px 20px 50px 20px",
      }}
    >     
      <ToastContainer position="bottom-right" style={{ color: "red" }} />
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{ cursor: "pointer", width: "45px", marginLeft: "20px" }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
      <Box
        sx={{ backgroundColor: "rgb(66, 92, 90)", display: "flex" }}
        onClick={refreshPage}
      >
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
            textShadow: "0 6px rgba(81,67,21,0.8)",
            fontSize: { xs: "40px", md: "56px" },
          }}
        >
          All Events
        </Typography>
      </Box>
      {eventList?.length !== 0 && (
        <Box
          sx={{
            margin: { xs: "20px", md: "2% 18%" },
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
              <img src="edit-image.png" alt="edit Icon" style={{ padding: "2px", height: "23px" }} onClick={handleEditEvent}/>
              {/* <img
                src="deleteIcon.png"
                alt="delete Icon"
                style={{ padding: "2px", height: "30px" }}
                onClick={handleDelete}
              /> */}
              </>
            ) : (
              <Link to="/create-event"><img src="add-icon.png" alt="add-icon" /></Link>
            )}
          </Box>
        </Box>
      )}
      {eventList?.slice(0, endpoint).map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgb(66, 92, 90)",
              margin: { xs: "20px", md: "2% 18%" },
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
                    onChange={() => handleCheckboxChange(item?.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </Box>
              <img
                src="confetti-05.png"
                alt="Confetti"
                style={{ width: "90%" }}
              />
            </Box>
            <Box
              sx={{
                marginLeft: { xs: "0px", md: "7%" },
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
                {forrmattedDate(item?.created_at)}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(216, 217, 217)",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                }}
              >
                {item?.event_name}
              </Typography>
              <Typography
                sx={{ color: "rgb(216, 217, 217)", fontFamily: "Poppins" }}
              >
                {item?.event_description}
              </Typography>
            </Box>
          </Box>
        );
      })}
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
          <Link to="/create-event">
            <Typography
              textAlign="center"
              sx={{
                fontSize: "1.3rem",
                margin: "25px 0px",
                color: "rgb(216, 217, 217)",
                fontFamily: "Poppins",
                cursor : "pointer"
              }}
            >
              Click here to create....
            </Typography>
          </Link>
        </Box>
      )}
      {eventList?.length !== 0 && (
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
    </Box>)}
    </>
  );}

