<<<<<<< HEAD
import React, { useState } from 'react'
import Navbar from "../Component/Navbar"
import SidBar from "../Component/Sidbar"
import Typography from '@mui/material/Typography';
=======
import React from "react";
import Navbar from "../Component/Navbar";
import SidBar from "../Component/Sidbar";
import Typography from "@mui/material/Typography";
>>>>>>> 2997d0f2bb612bbb502befcbcab9c91f46376cd3

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image1 from "../Component/confetti 1.png";

<<<<<<< HEAD
const ProfileEvent = ({}) => {
  const[count,setCount]=useState(0);
  const box = [
    {
      id: "Event Name",
      date: "14 april-20april",
      imageSrc: "../Component/confetti 1.png",
    },
    {
      id: "Event Name",
      date: "14 april-20april",
      imageSrc: "../Component/confetti 1.png",
    },
    {
      id: "Event Name",
      date: "14 april-20april",
      imageSrc: "../Component/confetti 1.png",
    },
  ];
 

=======
const ProfileEvent = () => {
>>>>>>> 2997d0f2bb612bbb502befcbcab9c91f46376cd3
  return (
    <div style={{ backgroundColor: "rgb(66, 92, 90)" }}>
      <div
        className="page"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="left"></div>

        <div
          className="right"
          style={{
            width: "50%",
            float: "left",
            boxSizing: "border-box",
            display: "f",
          }}
        >
          <div className="card1">
            <Card
              sx={{
                display: "flex",
                width: "726px",
                marginLeft: "320px",  
                marginTop: "22px",
                backgroundColor: "rgb(66, 92, 90)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={Image1}
                  style={{
                    width: "90px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  component="div"
                  variant="h5"
                  style={{
                    color: "white",
                    display: "block",
                    marginLeft: "100px",
                    marginTop: "30px",
                  }}
                >
                  EVENT SECOND NAME
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    style={{
                      color: "white",
                    }}
                  >
                    13th April 2024 - 13th June 2024
                  </Typography>
                </Typography>

                <CardContent sx={{ flex: "1 0 auto" }}></CardContent>
              </Box>
            </Card>
          </div>
        </div>
        <div
          className="right"
          style={{
            width: "50%",
            float: "left",
            boxSizing: "border-box",
            display: "f",
          }}
        >
          <div className="card1">
            <Card
              sx={{
                display: "flex",
                width: "726px",
                marginLeft: "320px",
                marginTop: "22px",
                backgroundColor: "rgb(66, 92, 90)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={Image1}
                  style={{
                    width: "90px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  component="div"
                  variant="h5"
                  style={{
                    color: "white",
                    display: "block",
                    marginLeft: "100px",
                    marginTop: "30px",
                  }}
                >
                  EVENT SECOND NAME
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    style={{
                      color: "white",
                    }}
                  >
                    13th April 2024 - 13th June 2024
                  </Typography>
                </Typography>

                <CardContent sx={{ flex: "1 0 auto" }}></CardContent>
              </Box>
            </Card>
          </div>
        </div>
        <div
          className="right"
          style={{
            width: "50%",
            float: "left",
            boxSizing: "border-box",
            display: "f",
          }}
        >
          <div className="card1">
            <Card
              sx={{
                display: "flex",
                width: "726px",
                marginLeft: "320px",
                marginTop: "22px",
                backgroundColor: "rgb(66, 92, 90)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={Image1}
                  style={{
                    width: "90px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  component="div"
                  variant="h5"
                  style={{
                    color: "white",
                    display: "block",
                    marginLeft: "100px",
                    marginTop: "30px",
                  }}
                >
                  EVENT SECOND NAME
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    style={{
                      color: "white",
                    }}
                  >
                    13th April 2024 - 13th June 2024
                  </Typography>
                </Typography>

                <CardContent sx={{ flex: "1 0 auto" }}></CardContent>
              </Box>
            </Card>
          </div>
        </div>
        <div
          className="right"
          style={{
            width: "50%",
            float: "left",
            boxSizing: "border-box",
            display: "f",
          }}
        >
          <div className="card1">
            <Card
              sx={{
                display: "flex",
                width: "726px",
                marginLeft: "320px",
                marginTop: "22px",
                backgroundColor: "rgb(66, 92, 90)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={Image1}
                  style={{
                    width: "90px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  component="div"
                  variant="h5"
                  style={{
                    color: "white",
                    display: "block",
                    marginLeft: "100px",
                    marginTop: "30px",
                  }}
                >
                  EVENT SECOND NAME
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    style={{
                      color: "white",
                    }}
                  >
                    13th April 2024 - 13th June 2024
                  </Typography>
                </Typography>

                <CardContent sx={{ flex: "1 0 auto" }}></CardContent>
              </Box>
            </Card>
          </div>
        </div>
      </div>
      <Typography
        component="div"
        variant="subtitle1"
        style={{
          color: "rgb(216, 217, 217)",
          textAlign: "center",
          marginTop: "20px",
          textAlign:"center"
        }}
      >
        Show More...
      </Typography>
    </div>
<<<<<<< HEAD
  
   <div className='right' style={{width:'100%',boxSizing:'border-box',display:'f'}}>
   <div className='card1'>
    <Card sx={{ display: 'flex',width:"726px",
    marginLeft:'320px',
    marginTop:'22px',
    backgroundColor:'rgb(66, 92, 90)',
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
   }}>
      <Box 
      sx={{ display: 'flex', flexDirection: 'row',}}>
      <img src={Image1}
        style={{width:'90px',marginTop:"20px",marginLeft:'20px',marginBottom:'10px'}}
      />
      <Typography component="div" variant="h5"style={{
            color:"white",display:'block',marginLeft:"100px",marginTop:"30px"}}>
           EVENT SECOND NAME
           <Typography variant="subtitle1" color="text.secondary" 
          style={{
            color:"white"}}>
             13th April 2024 - 13th  June 2024
          </Typography>
        
          </Typography>
          
        <CardContent sx={{ flex: '1 0 auto' }}>
       
         
        </CardContent>
       
      </Box>
      
    </Card>
    </div>
 </div>
 <div className='right' style={{width:'50%',float:'left',boxSizing:'border-box',display:'f'}}>
   <div className='card1'>
    <Card sx={{ display: 'flex',width:"726px",
    marginLeft:'320px',
    marginTop:'22px',
    backgroundColor:'rgb(66, 92, 90)',
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
   }}>
      <Box 
      sx={{ display: 'flex', flexDirection: 'row',}}>
      <img src={Image1}
        style={{width:'90px',marginTop:"20px",marginLeft:'20px',marginBottom:'10px'}}
      />
      <Typography component="div" variant="h5"style={{
            color:"white",display:'block',marginLeft:"100px",marginTop:"30px"}}>
           EVENT SECOND NAME
           <Typography variant="subtitle1" color="text.secondary" 
          style={{
            color:"white"}}>
             13th April 2024 - 13th  June 2024
          </Typography>
        
          </Typography>
          
        <CardContent sx={{ flex: '1 0 auto' }}>
       
         
        </CardContent>
       
      </Box>
      
    </Card>
    </div>
 </div>
 <div className='right' style={{width:'50%',float:'left',boxSizing:'border-box',display:'f'}}>
   <div className='card1'>
    <Card sx={{ display: 'flex',width:"726px",
    marginLeft:'320px',
    marginTop:'22px',
    backgroundColor:'rgb(66, 92, 90)',
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
   }}>
      <Box 
      sx={{ display: 'flex', flexDirection: 'row',}}>
      <img src={Image1}
        style={{width:'90px',marginTop:"20px",marginLeft:'20px',marginBottom:'10px'}}
      />
      <Typography component="div" variant="h5"style={{
            color:"white",display:'block',marginLeft:"100px",marginTop:"30px"}}>
           EVENT SECOND NAME
           <Typography variant="subtitle1" color="text.secondary" 
          style={{
            color:"white"}}>
             13th April 2024 - 13th  June 2024
          </Typography>
        
          </Typography>
          
        <CardContent sx={{ flex: '1 0 auto' }}>
       
         
        </CardContent>
       
      </Box>
      
    </Card>
    </div>
 </div>
 <div className='right' style={{width:'50%',float:'left',boxSizing:'border-box',display:'f'}}>
   <div className='card1'>
    <Card sx={{ display: 'flex',width:"726px",
    marginLeft:'320px',
    marginTop:'22px',
    backgroundColor:'rgb(66, 92, 90)',
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
   }}>
      <Box 
      sx={{ display: 'flex', flexDirection: 'row',}}>
      <img src={Image1}
        style={{width:'90px',marginTop:"20px",marginLeft:'20px',marginBottom:'10px'}}
      />
      <Typography component="div" variant="h5"style={{
            color:"white",display:'block',marginLeft:"100px",marginTop:"30px"}}>
           EVENT SECOND NAME
           <Typography variant="subtitle1" color="text.secondary" 
          style={{
            color:"white"}}>
             13th April 2024 - 13th  June 2024
          </Typography>
        
          </Typography>
          
        <CardContent sx={{ flex: '1 0 auto' }}>
       
         
        </CardContent>
       
      </Box>
      
    </Card>
    </div>
 </div>
    </div>
   
    <Typography component="div" variant="subtitle1"  onClick={()=>setCount(prev=>prev+1 )}
    style={{color:'rgb(216, 217, 217)',textAlign:'center',marginTop:'30px'}}>Show More...
    </Typography>
    </div>
  
  )
}
=======
  );
};
>>>>>>> 2997d0f2bb612bbb502befcbcab9c91f46376cd3

export default ProfileEvent;
