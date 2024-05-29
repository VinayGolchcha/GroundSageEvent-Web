import React, { useState, useEffect, useContext } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../ContextApi/AuthContext";

const ProfileAboutpage = () => {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    role: "",
    currentTeam: "",
    currentEvent: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.token) {
      console.error("No user or token found");
      return;
    }
    // Fetch data from the API
    console.log(user);
    fetch(
      "https://groundsageevent-be.onrender.com/api/v1/profile/get-user-about-page-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.token,
          role_id: user?.role_id,
        },
        body: JSON.stringify({
          user_id: user?.user_id,
          user_name: user?.user_name,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const userDataFromApi = data.data[0];
          setUserData({
            email: userDataFromApi.email,
            role: userDataFromApi.role_name,
            currentTeam: userDataFromApi.team_name,
            currentEvent: userDataFromApi.event_name,
          });
          console.log(userDataFromApi);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Box
      sx={{
        width: { xs: "80%", md: "60%" },
        margin: { xs: "15px 50px", md: "0" },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: { md: "center" },
          justifyContent: { md: "space-between" },
        }}
      >
        <Box
          component="img"
          src="../../../Images/oval_img@2x.png"
          alt="profile"
          sx={{
            width: { xs: "50%", md: "25%" },
            display: { xs: "block", md: "none" },
            margin: { xs: "0 auto", md: "0" },
          }}
        />
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            fontWeight: "400",
            fontSize: { xs: "24px", md: "34px" },
            fontFamily: "Outfit",
            letterSpacing: "0px",
            marginTop: { xs: "20px", md: "0" },
          }}
        >
          Prabhat Gupta
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          marginTop: "25px",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "auto" },
            marginRight: { md: "30%" },
          }}
        >
          <TextField
            label="Email:"
            variant="filled"
            fullWidth
            size="small"
            sx={{
              width: { xs: "100%", md: "450px" },
              marginBottom: "25px",
              "& .MuiInputBase-root.Mui-disabled": {
                color: "white", // Change font color to white
              },
            }}
            value={userData.email}
            disabled // Set disabled attribute to true
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
              },
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
                background: "rgba(196, 196, 196, 0.39)",
                borderRadius: "10px",
              },
              "& .MuiInputBase-root.Mui-disabled": {
                color: "white", // Change font color to white
              },
            }}
          />
           <TextField
            label="Role:"
            variant="filled"
            fullWidth
            size="small"
            sx={{
              width: { xs: "100%", md: "450px" },
              marginBottom: "25px",
              "& .MuiInputBase-root.Mui-disabled": {
                color: "white", // Change font color to white
              },
            }}
            value={userData.role_name}
            disabled // Set disabled attribute to true
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
              },
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
                background: "rgba(196, 196, 196, 0.39)",
                borderRadius: "10px",
              },
              "& .MuiInputBase-root.Mui-disabled": {
                color: "white", // Change font color to white
              },
            }} />
          <TextField
            label="Current Team:"
            variant="filled"
            value={userData.currentTeam}
            size="small"
            fullWidth
            disabled // Set disabled attribute to true
            sx={{ width: { xs: "100%", md: "450px" }, marginBottom: "25px" }}
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "20px",
                fontFamily: "Outfit",
              },
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
                background: "rgba(196, 196, 196, 0.39)",
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            label="Current Event:"
            value={userData.currentEvent}
            disabled // Set disabled attribute to true
            variant="filled"
            size="small"
            fullWidth
            sx={{ width: { xs: "100%", md: "450px" }, marginBottom: "25px" }}
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "400",
                fontSize: "20px",
                fontFamily: "Outfit",
              },
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                fontSize: "20px",
                fontFamily: "Outfit",
                background: "rgba(196, 196, 196, 0.39)",
                borderRadius: "10px",
              },
            }}
          />
        </Box>
        {/** Ensure the image is hidden on small devices */}
        <Box
          component="img"
          src="../../../Images/oval_img@2x.png"
          alt="profile"
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "50%" },
            marginTop: { md: "0" },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          width: "100%",
          marginTop: "25px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "rgb(247, 230, 173)",
            color: "rgb(91, 94, 97)",
            padding: "10px 40px",
            display: "flex",
            margin: "10px 25% 0px 2%",
            alignItems: "center",
            borderRadius: "1px",
            boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)",
            fontSize: { xs: "14px", md: "16px" },
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)",
              color: "rgb(50, 50, 50)",
              boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)",
            },
          }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

const CustomSelect = styled(Select)({
  "& .MuiSelect-icon": {
    color: "white",
  },
});

export default ProfileAboutpage;
