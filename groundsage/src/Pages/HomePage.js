import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Footer from "../Component/Footer";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Component/Loading";
import { useNavigate } from "react-router-dom";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const names = [
  "Event Name 1",
  "Event Name 2",
  "Event Name 3",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}





export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [personName, setPersonName] = useState([]);
  const [activeEventsList , setActiveEventsList] = useState([]);
  const {eventIds , setActiveEventName, setActiveEvent ,activeEvent , setEvents,events , user , setActiveEventId , activeEventId ,} = useContext(AuthContext);
  const [isloading , setIsLoading] = useState(true);
  let today = new Date();
  console.log(user);
  let len ;
  console.log(events)

  const newActiveEvent =  events?.filter((event) => {
    const endDate = new Date(event.end_date);
    return endDate.valueOf() >= today.valueOf();
});

// const fetchEvents = async () => {
//   try{
//     const res = await axios.get(`https://groundsageevent-be.onrender.com/api/v1/event/get-all-user-event/${user?.user_id}` , { headers: {
//       'authorization': user?.token,
//       'Accept' : 'application/json',
//       'Content-Type': 'application/json', 
//       role_id : user?.role_id
//   } });
//     let eventList = res?.data?.data;
//     setEvents(eventList);
//   //   const newEventList = eventList?.filter((event) => {
//   //     const endDate = new Date(event.end_date);
//   //     return endDate.valueOf() >= today.valueOf();
//   // });
//   // setActiveEventsList(newEventList);
//   // setActiveEvent(newEventList);
//   }catch(err){
//     console.log(err);
//   }
// }
const forrmattedDate = (data) => {
  let date = new Date(data);
  const array = date.toString().split(" ");
  date = array.slice(1,3).join(" ");
  return date
}

useEffect(()=> {
  fecthApiHome();
},[])
console.log(activeEvent);

  const fecthApiHome = async() => {
    try{
      const res = await axios.get(`https://groundsageevent-be.onrender.com/api/v1/home/home-page/${user?.user_id}`, {
        headers : {
          'authorization': user?.token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json', 
          role_id : user?.role_id
        }
      });
      console.log(res)
      setActiveEvent(res?.data?.data);
      setActiveEventId(res?.data?.data[0]?.id);
      setActiveEventName(res?.data?.data[0]?.event_name);
      len =  activeEvent?.length-1;
      console.log(len)
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
  
    }
  }
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  // const [activeEvents, setEvents] = useState([
  //   {
  //     event: "Event Name 1",
  //     description:
  //       "Celebration with different cuisines from different regions. Do come and enjoy to your hearts.",
  //   },
  //   {
  //     event: "Event Name 2",
  //     description: "Event Description...........................",
  //   },
  //   {
  //     event: "Event Name 3",
  //     description:
  //       "Celebration with different cuisines from different regions. Do come and enjoy to your hearts.",
  //   },
  //   {
  //     event: "Event Name 4",
  //     description: "Event Description...........................",
  //   },
  // ]);
  if(isloading){
    return(
      <Loading/>
    )
  }else {

    return (
      <Box
        sx={{
          backgroundColor: "rgb(66, 92, 90)",
          paddingBottom : "20px"
        }}
      >
        <Typography
          align="center"
          color="rgb(255, 255, 255)"
          sx={{ fontFamily: "Aoboshi One" }}
        >
          To Switch Events Click Here!
        </Typography>
  
        <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column for small screens, row for larger screens
          justifyContent: 'space-between',
          backgroundColor: 'rgb(78, 101, 100)',
          borderBottomLeftRadius: '80px',
          borderBottomRightRadius: '80px',
          padding: { xs: '20px', md: '40px' , lg : "0px" }, // Responsive padding
          alignItems: 'center', // Align items to the center vertically in column mode
        }}
      >
        <Box
          sx={{
            margin: { xs: '0 5%', md: '0 18%' }, // Responsive margin
            textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
          }}
        >
          <Typography
            variant="h4"
            color="rgb(255, 255, 255)"
            sx={{ marginTop: '10px', width: 'fit-content', fontSize : {
              xs : "1.9rem"
            } }}
          >
            WELCOME BACK!
          </Typography>
          <Typography
            variant="h5"
            color="rgb(254, 240, 180)"
            sx={{ marginBottom: '10px', width: 'fit-content' , [theme.breakpoints.down('400')]: {
              width : "100%",
              textAlign : 'center'
            }, }}
          >
            {activeEvent[activeEvent?.length - 1]?.username.toUpperCase()}
          </Typography>
        </Box>
        
      </Box>
        
        <Box sx={{ display : "flex" , width : "100vw", justifyContent : "center" , fontSize : {lg : "1.6rem" , md : "1.6rem" , sm : "1.6rem" , xs : "1.2rem"} , padding : "5px 0px" , color : "rgb(165, 170, 170)"}}>
         <Box sx={{
          display : "flex" ,
          justifyContent : "space-between" ,
          alignItems : "center", 
          width : {lg : "60%" , md : "60%" , sm : "43%", xs : "56%"}
         }}>
            <Box sx={{margin : "0px 8px"}}>Live Events</Box>
            <Box sx={{fontSize : {lg : "1.6rem" , md : "1.6rem" , sm : "1.6rem" , xs : "1.2rem"} ,marginRight : "4%"}}>See All <img src="/Images/Vector-1.png"/> </Box>
          </Box>
        </Box>
        <Box sx={{ display : "flex" , justifyContent : "center" , alignItems : "center" , paddingBottom : "16px"}}>
          <Grid container sx={{height : "100%" , width : "75%" ,display : "flex", alignItems : "center" , justifyContent : "center"}}>
            {activeEvent?.map((item, index) => {
              if(index === activeEvent?.length -1 ){
                return;
              }
              return (
                <Grid item lg={6} md={6} sm={10} xs={12} key={index} sx={{marginBottom : "5px" , display : "flex", justifyContent : "center"}} >
                  <Box
                    sx={{
                      minHeight: "95%",
                      maxWidth: { lg : "80%" , md : "70%" , sm : "350px" , xs : "250px"},
                      width : "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      padding: "9px",
                      borderRadius: "8px",
                      overflow : "hidden"
                    }}
                  >
                    <Box sx={{ position: "relative" , height : "180px"}}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          zIndex: "1000",
                          position: "absolute",
                          height: "25%",
                          width: "100%",
                          padding: "10px 0px",
                        }}
                      >
                        <Box
                          sx={{
                            marginLeft: "3%",
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                            width: "11%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            color: "rgb(240, 99, 90)",
                            fontFamily: "Aoboshi One",
                            borderRadius: "10px",
                            paddingLeft: "7%",
                            paddingRight: "2%",
                          }}
                        >
                          {forrmattedDate(item?.start_date)}
                        </Box>
                        <img
                          src="/home/Group-33311.png"
                          height="55%"
                          style={{ marginRight: "3%" , }}
                        />
                      </Box>
                      <img
                        src={item?.image_url === null ? "/home/imag-84.png" : item?.image_url}
                        alt=""
                        style={{ borderRadius: "8px",maxHeight : "200px"  , width: "100%"   ,height : "100%" , objectFit : "cover" }}
                      />
                    </Box>
                  <Box sx={{ padding: "4px", maxHeight: { lg: "200px", md: "180px", sm: "160px", xs: "140px" }, overflowY: "auto" }}>
                    <Typography
                      variant="h6"
                      color="rgb(254, 240, 180)"
                      sx={{ fontFamily: "Aoboshi One", margin: "5px 0px" }}
                    >
                      {item?.event_name}
                    </Typography>
                    <Typography color="rgb(43, 40, 73)" sx={{ fontFamily: "Poppins", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: { lg: 4, md: 3, sm: 2, xs: 2 }, WebkitBoxOrient: "vertical" }}>
                      {item?.event_description}
                    </Typography>
                  </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box sx={{
          display : "flex" ,
          alignItems : "center" ,
          justifyContent : "center"
        }}>
        <Box
        sx={{
          
          width : "70%", // Responsive margin
          height: { xs: 'auto', md: '20%' }, // Responsive height
          backgroundColor: 'rgba(250, 240, 205, 0.8)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on larger screens
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px',
          fontSize: { xs: '1rem', md: '1.2rem' }, // Responsive font size// Responsive padding
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' , padding : "16px  20px" } }}>
          <Typography
            variant="h4"
            color="rgb(66, 92, 90)"
            sx={{ fontWeight: 500, fontFamily: 'Aoboshi One' }}
          >
            JOIN AN EVENT TODAY!
          </Typography>
          <Typography
            color="rgb(72, 77, 112)"
            sx={{ fontWeight: '400', fontFamily: 'Poppins', marginTop: '8px' }}
          >
            Join the team with the referral code below!
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgb(14, 47, 47)',
              marginTop: '16px',
              '&:hover': {
                backgroundColor: 'rgb(14, 47, 47)'
              }
            }}
            onClick={() => {
              navigate("/Profile");
            }}
          >
            Join now
          </Button>
          
        </Box>
        <Box
          component="img"
          src="/home/77mLIhf8TW1.png"
          sx={{
            width: { xs: '100%', md: '40%' }, // Full width on small screens, 40% on larger screens
             // Margin on top for small screens
            borderRadius: '10px' // Adding border-radius for better appearance
          }}
        />
        </Box>
        
      </Box>
      </Box>
    );
  }
}
