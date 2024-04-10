import React, { useState } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const ProfileAboutpage = () => {
  const [email, setEmail] = useState("rohit8282@mail.com");
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div
      style={
        {
          margin: "5% 0px 0px 30%",
        }
      }
    >
      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          fontWeight: "400",
          fontSize: "34px",
          fontFamily: "Outfit",
          letterSpacing: "0pxf",
        }}
      >
        Prabhat Gupta
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            marginRight: "30%",
          }}
        >
          <TextField
            label="Email:"
            variant="filled"
            fullWidth
            size="small"
            sx={{ width: "450px" }} // Increase the width here
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "22px",
                fontFamily: "Outfit",
              },
            }} // Change label color
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "22px",
                fontFamily: "Outfit",
                letterSpacing: "0pxf",
                background: "rgba(196, 196, 196, 0.39)",
                // padding: "2px 7px 2px 7px",
                borderRadius: "10px",
                marginBottom: "25px",
              },
            }}
          />
          <FormControl variant="filled" sx={{ width: "450px" }}>
            <InputLabel
              id="demo-simple-select-filled-label"
              style={{
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "22px",
                fontFamily: "Outfit",
                letterSpacing: "0pxf",
                textAlign: "center",
              }}
            >
              Role:
            </InputLabel>
            <CustomSelect
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
              size="small"
              disableUnderline
              sx={{
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "22px",
                fontFamily: "Outfit",
                letterSpacing: "0pxf",
                background: "rgba(196, 196, 196, 0.39)",
                borderRadius: "10px",
                marginBottom: "25px",
                "&:focus": {
                  background: "rgba(196, 196, 196, 0.39)", // Change background color on focus
                },
                "&:hover": {
                  background: "rgba(196, 196, 196, 0.39)", // Change background color on focus
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Coordinator</MenuItem>
              <MenuItem value={20}>User</MenuItem>
              <MenuItem value={30}>Third</MenuItem>
            </CustomSelect>
          </FormControl>
          <TextField
            label="Current Team:"
            variant="filled"
            size="small"
            fullWidth
            sx={{ width: "450px" }} // Increase the width here
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
              },
            }} // Change label color
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "22px",
                fontFamily: "Outfit",
                letterSpacing: "0pxf",
                background: "rgba(196, 196, 196, 0.39)",
                // padding: "2px 7px 2px 7px",
                borderRadius: "10px",
                marginBottom: "25px",
              },
            }}
          />
          <TextField
            label="Current Event:"
            variant="filled"
            size="small"
            fullWidth
            sx={{ width: "450px" }} // Increase the width here
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
              },
            }} // Change label color
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "22px",
                fontFamily: "Outfit",
                letterSpacing: "0pxf",
                background: "rgba(196, 196, 196, 0.39)",
                // padding: "2px 7px 2px 7px",
                borderRadius: "10px",
              },
            }}
          />
        </Box>
        <Box
          component="img"
          src="../../../Images/oval_img@2x.png"
          alt="profile"
          sx={{ width: "50%" }}
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "55%",
          marginTop: "25px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "rgb(247, 230, 173)",
            color: "rgb(91, 94, 97)",
            padding: "10px 40px 10px 30px",
            display: "flex",
            margin: "10px 0px 0px 2%",
            // fontFamily:"Aoboshi One",
            alignItems: "center",
            borderRadius: "1px", // Add border radius
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
              color: "rgb(50, 50, 50)", // Change text color on hover
              boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
            },
          }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

const CustomSelect = styled(Select)({
  "& .MuiSelect-icon": {
    color: "white",
  },
});
export default ProfileAboutpage;
