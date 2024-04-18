import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";

const EnterEmail = () => {
    const navigate = useNavigate();
        const [email, setEmail] = useState('');
        
        const handleSubmit = (e) => {
          e.preventDefault();
          // Here you can handle form submission, like sending email data to server or performing other actions
          console.log("Email submitted:", email);
        };
  return (
    <>
    <div className='header' 
    style={{backgroundColor:'rgb(66, 92, 90)'}}>
   <img 
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{ cursor: "pointer", width: "45px", marginLeft: "20px",backgroundColor:'rgb(66, 92, 90)' }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />
     <Typography variant='h2'
     style={{color:'rgb(247, 230, 173)',
     backgroundColor:'rgb(66, 92, 90)',
     textAlign:'center',
     padding:'10px' }}>
     Email
     
     </Typography>
     </div>
    <body style={{backgroundColor:'rgb(66, 92, 90)',padding:'100px'}}>
    <div style={{display:'flex'}}>
    <div className='left' >
    <Typography variant='h3' style={{color:'grey',}}>Enter your mail</Typography>
    <Typography  style={{color:'grey'}}>
    An Otp will be send to the registered<br></br>
    email below, once the email is verified,<br></br>
      you can move forward to reset your password.
    </Typography>
    
    <TextField
            id="filled-basic"
            label={
              <Box
                sx={{ display: "flex", alignItems: "center", height: "80%", }}
              >
                <img
                  src="../../Images/Message.png"
                  alt="Username Icon"
                  style={{ width: "20px", marginRight: "15px" }}
                />
                <Typography sx={{ color: "white" }}>abc@gmail.com</Typography>
              </Box>
            }
            variant="filled"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: { color: "white", margin: "1px" },
            }}
            InputLabelProps={{ style: { color: "white" } }} // Change label color
            sx={{
              margin: "5px",
              // width: "130%",
              borderRadius: "4px",
              background: "rgb(115, 135, 135)",
              border: "1px solid rgb(188, 189, 163)", // Add border color
              marginBottom: "15px",
              marginTop:'20px'
        
            }}
          />
       
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "rgb(247, 230, 173)",
            color: "rgb(91, 94, 97)",
            padding: "13px 10px 13px 50px",
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px", // Add border radius
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
            fontSize: "16px",
            marginLeft:'20px',
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
              color: "rgb(50, 50, 50)", // Change text color on hover
              boxShadow: "0px 10px 35px 0px rgb(247, 230, 173)", // Change box shadow on hover
              
            },
          }}
        
        >
          SAVE
          <img
            src="../../../Images/Group 4.svg"
            alt="Right Arrow"
            style={{ marginLeft: "40px", }}
          />
        </Button>
        </div>
        <div className='Right'>
        <Box style={{paddingLeft:'160px'}}>
<img src='../../Images/audit-7476720_1280 1 (1).png' alt='wd'></img>
</Box>
   </div>
    </div>
    </body>
    </>
  )
}

export default EnterEmail
