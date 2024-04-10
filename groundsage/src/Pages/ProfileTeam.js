import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import SidBar from "../Component/Sidbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import SimplePopup from "../Component/Popup";
import { useNavigate } from "react-router-dom";

const ProfileTeam = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSavePopupData = (data) => {
    // Save the data (you can perform your save logic here)
    console.log("Popup data saved:", data);

    // Close the popup
    handlePopupClose();

    // Navigate back to the profile about page
    navigate("/profile");
  };

  return (
    <div>
      <div className="profile" style={{ backgroundColor: "rgb(66, 92, 90)" }}>
        <div className="boxes" style={{ display: "flex" }}>
          <Box
            height={40}
            width={120}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{
              border: "2px solid grey",
              marginLeft: "360px",
              display: "flex",
            }}
          >
            <Typography
              component="div"
              variant="h5"
              style={{
                color: "white",
                display: "block",
                marginLeft: "35px",
              }}
            >
              <b>3</b>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                style={{
                  color: "grey",
                }}
              >
                Teams
              </Typography>
            </Typography>
          </Box>

          <Box
            height={40}
            width={120}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{
              border: "2px solid grey",
              marginLeft: "80px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              component="div"
              variant="h5"
              style={{
                color: "white",
                display: "block",
                marginLeft: "35px",
              }}
            >
              <b>6</b>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                style={{
                  color: "grey",
                }}
              >
                Events
              </Typography>
            </Typography>
          </Box>
          <div className="jointeam">
            <img
              src="../../Images/Group 33665.png"
              alt="add"
              style={{
                marginLeft: "180px",
                width: "60px",
                height: "60px",
                marginTop: "30px",
                cursor: "pointer",
              }}
              // onClick={handleOpenPopup} // Add onClick event to open the popup
              onClick={handlePopupOpen}
            ></img>
          </div>
        </div>
        <Typography
          component="div"
          variant="h5"
          style={{ marginLeft: "360px", color: "grey", marginTop: "20px" }}
        >
          Prashant Pandey has worked with these following members:
        </Typography>
      </div>

      <div
        className="right"
        style={{
          width: "100%",
          float: "left",
          boxSizing: "border-box",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        <div className="card1" style={{ backgroundColor: "rgb(66, 92, 90)" }}>
          <Card
            sx={{
              display: "flex",
              width: "726px",
              marginLeft: "320px",
              marginTop: "22px",
              backgroundColor: "rgb(66, 92, 90)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 1.2)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                component="div"
                variant="h5"
                style={{
                  color: "white",
                  display: "block",
                  marginLeft: "10px",
                  padding: "20px",
                }}
              >
                EVENT NAME 1
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{
                    color: "white",
                  }}
                >
                  members 7
                </Typography>
              </Typography>

              <CardContent
                sx={{
                  flex: "1 0 auto",
                  marginLeft: "60px",
                  flexDirection: "row",
                }}
              >
                <Avatar style={{ display: "flex" }}>A</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>F</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>Q</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>H</Avatar>
              </CardContent>

              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>M</Avatar>
              </CardContent>
            </Box>
          </Card>
        </div>
      </div>

      <div
        className="right"
        style={{
          width: "100%",
          float: "left",
          boxSizing: "border-box",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        <div className="card1" style={{ backgroundColor: "rgb(66, 92, 90)" }}>
          <Card
            sx={{
              display: "flex",
              width: "726px",
              marginLeft: "320px",
              marginTop: "22px",
              backgroundColor: "rgb(66, 92, 90)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 1.2)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                component="div"
                variant="h5"
                style={{
                  color: "white",
                  display: "block",
                  marginLeft: "10px",
                  padding: "20px",
                }}
              >
                EVENT NAME 2
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{
                    color: "white",
                  }}
                >
                  members 7
                </Typography>
              </Typography>

              <CardContent
                sx={{
                  flex: "1 0 auto",
                  marginLeft: "60px",
                  flexDirection: "row",
                }}
              >
                <Avatar style={{ display: "flex" }}>A</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>F</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>Q</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>H</Avatar>
              </CardContent>

              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>M</Avatar>
              </CardContent>
            </Box>
          </Card>
        </div>
      </div>

      <div
        className="right"
        style={{
          width: "100%",
          float: "left",
          boxSizing: "border-box",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        <div className="card1" style={{ backgroundColor: "rgb(66, 92, 90)" }}>
          <Card
            sx={{
              display: "flex",
              width: "726px",
              marginLeft: "320px",
              marginTop: "22px",
              backgroundColor: "rgb(66, 92, 90)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 1.2)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                component="div"
                variant="h5"
                style={{
                  color: "white",
                  display: "block",
                  marginLeft: "10px",
                  padding: "20px",
                }}
              >
                EVENT NAME 3
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{
                    color: "white",
                  }}
                >
                  members 8
                </Typography>
              </Typography>

              <CardContent
                sx={{
                  flex: "1 0 auto",
                  marginLeft: "60px",
                  flexDirection: "row",
                }}
              >
                <Avatar style={{ display: "flex" }}>A</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>F</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>Q</Avatar>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>H</Avatar>
              </CardContent>

              <CardContent sx={{ flex: "1 0 auto", flexDirection: "row" }}>
                <Avatar style={{ display: "flex" }}>M</Avatar>
              </CardContent>
            </Box>
          </Card>
        </div>
      </div>
      <Typography
        component="div"
        variant="subtitle1"
        style={{
          color: "rgb(216, 217, 217)",
          textAlign: "center",
          paddingTop: "50px",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        Show More...
      </Typography>
      {isPopupOpen && (
        <SimplePopup
          open={isPopupOpen}
          onClose={handlePopupClose}
          onSave={handleSavePopupData}
        />
      )}
    </div>
  );
};

export default ProfileTeam;
