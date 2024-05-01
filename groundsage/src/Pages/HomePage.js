import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Footer from "../Component/Footer";

export default function HomePage() {
  const [events, setEvents] = useState([
    {
      event: "Event Name 1",
      description:
        "Celebration with different cuisines from different regions. Do come and enjoy to your hearts.",
    },
    {
      event: "Event Name 2",
      description: "Event Description...........................",
    },
    {
      event: "Event Name 3",
      description:
        "Celebration with different cuisines from different regions. Do come and enjoy to your hearts.",
    },
    {
      event: "Event Name 4",
      description: "Event Description...........................",
    },
  ]);
  return (
    <Box
      sx={{
        backgroundColor: "rgb(66, 92, 90)",
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
          backgroundColor: "rgb(78, 101, 100)",
          borderBottomLeftRadius: "80px",
          borderBottomRightRadius: "80px",
        }}
      >
        <Typography
          variant="h4"
          color="rgb(255, 255, 255)"
          sx={{ margin: "0% 18%", marginTop: "10px" }}
        >
          WELCOME BACK !
        </Typography>
        <Typography
          variant="h5"
          color="rgb(254, 240, 180)"
          sx={{ margin: "0% 18%", marginBottom: "10px" , marginRight : "26%"}}
        >
          {" "}
          Prashant{" "}
        </Typography>
      </Box>
      <Box sx={{ margin: "0% 18%" , display : "flex" , justifyContent : "space-between" , fontSize : "1.6rem" , padding : "5px 0px" , color : "rgb(165, 170, 170)"}}>
        <Box sx={{margin : "0px 8px"}}>Live Events</Box>
        <Box sx={{fontSize : "1.4rem" ,marginRight : "8px"}}>See All <img src="/Images/Vector-1.png"/> </Box>
      </Box>
      <Box sx={{ margin: "1% 18%" }}>
        <Grid container spacing={2}>
          {events.map((item, index) => {
            return (
              <Grid item lg={6} md={6} sm={6} xs={12} key={index}>
                <Box
                  sx={{
                    minHeight: "95%",
                    maxWidth: "70%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "9px",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
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
                          width: "12%",
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
                        10 June
                      </Box>
                      <img
                        src="/home/Group-33311.png"
                        height="55%"
                        style={{ marginRight: "3%" }}
                      />
                    </Box>
                    <img
                      src="/home/imag-84.png"
                      alt=""
                      style={{ borderRadius: "8px", width: "100%" }}
                    />
                  </Box>
                  <Box sx={{ padding: "4px" }}>
                    <Typography
                      variant="h6"
                      color="rgb(254, 240, 180)"
                      sx={{ fontFamily: "Aoboshi One", margin: "5px 0px" }}
                    >
                      {item.event}
                    </Typography>
                    <Typography color="rgb(43, 40, 73)" sx={{ fontFamily: "Poppins" }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ margin: "2% 13%" , height : "20%" , backgroundColor : "rgba(250, 240, 205, 0.8)" ,display : "flex" , justifyContent : "space-between" , borderRadius : "10px"}}>
          <Box sx={{alignContent : "center" , padding : "32px"}}>
            <Typography variant="h4" color="rgb(66, 92, 90)" sx={{fontWeight : "500" , fontFamily : "Aoboshi One"}}>JOIN AN EVENT TODAY!</Typography>
            <Typography color="rgb(72, 77, 112)" sx={{fontWeight : "rgb(72, 77, 112)" ,fontFamily : "Poppins"}}>Join the team with the referral code below!</Typography>
            <Button variant="contained" sx={{backgroundColor : "rgb(14, 47, 47)" , marginTop : "8px" , "&:hover" : {
              backgroundColor : "rgb(14, 47, 47)"
            }}}>Join now</Button>
          </Box>
          <img src="/home/77mLIhf8TW1.png" width="40%"/>
      </Box>
      <Footer/>
    </Box>
  );
}
