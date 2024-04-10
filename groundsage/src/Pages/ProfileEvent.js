import React, { useState } from 'react'
import Navbar from "../Component/Navbar"
import SidBar from "../Component/Sidbar"
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image1 from "../Component/confetti 1.png"

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
 

  return (
    <div style={{backgroundColor:"rgb(66, 92, 90)"}} >
    <div className='Header'>
      <Navbar/>

</div>
 <Typography component="div" variant="h2"
     sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: "56px",
          fontFamily: "Inter",
          fontWeight: "700",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)",
          padding:'10px',
          marginTop:'20px',
          }} >
           Profile
           </Typography>
           <SidBar/>
           
           <div className='page'
    style={{display:'flex',flexDirection:"column"}}>
    <div className='left'>
       
    </div>
  
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

export default ProfileEvent
