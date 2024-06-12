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
    username_initials: "",
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
            username_initials: userDataFromApi.username_initials,
          });
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
        width: { xs: "100%", md: "60%" },
        // margin: { xs: "15px 50px", md: "0" },
        display: { xs: "flex", md: "block" },
        flexDirection: { xs: "column" },
        justifyContent: "center",
        alignItems: "center",
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
            textAlign: "center",
            fontSize: { xs: "30px",sm:"40px", md: "56px" },
            fontFamily: "Inter",
            fontWeight: "700",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
            width: { xs: "50%", md: "25%" },
            display: { xs: "block", md: "none" },
            margin: { xs: "0 auto", md: "0" },
          }}
        >
          {userData.username_initials}
        </Typography>
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
          {user.user_name}
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
              "& .css-c5v1qu-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                {
                  WebkitTextFillColor: "#FFFFFF",
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
                color: "white",
                fontWeight: "400",
                fontSize: "21px",
                fontFamily: "Outfit",
                background: "rgba(196, 196, 196, 0.39)",
                borderRadius: "10px",
              },
              "& .MuiInputBase-root.Mui-disabled": {
                WebkitTextFillColor: "#FFFFFF",
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
              "& .css-c5v1qu-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                {
                  WebkitTextFillColor: "#FFFFFF",
                },
            }}
            value={userData.role}
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
              "&:disabled": {
                color: "white", // Change font color to white when disabled
              },
            }}
          />
          <TextField
            label="Current Team:"
            variant="filled"
            value={userData.currentTeam}
            size="small"
            fullWidth
            disabled // Set disabled attribute to true
            sx={{
              width: { xs: "100%", md: "450px" },
              marginBottom: "25px",
              "& .css-c5v1qu-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                {
                  WebkitTextFillColor: "#FFFFFF",
                },
            }}
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
            sx={{
              width: { xs: "100%", md: "450px" },
              marginBottom: "25px",
              "& .css-c5v1qu-MuiInputBase-input-MuiFilledInput-input.Mui-disabled":
                {
                  WebkitTextFillColor: "#FFFFFF",
                },
            }}
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
            width: { xs: "50%", md: "25%" },
            display: { xs: "none", md: "block" },
            margin: { xs: "0 auto", md: "0" },
          }}
        />
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            fontSize: { xs: "30px",sm:"40px", md: "56px" },
            fontFamily: "Inter",
            fontWeight: "700",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
            display: { xs: "none", md: "block" },
            margin:"10%"
          }}
        >
          {userData?.username_initials}
        </Typography>
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
            margin: { xs: "0", md: "10px 25% 0px 2%" },
            justifyContent: "center",
            alignItems: "center",
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
