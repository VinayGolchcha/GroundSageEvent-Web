import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MyCarousel from "../Component/Slider";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ShopEditForm from "../Component/ShopEdit";
import UpdateShopPage from "./UpdateShop";

const DescriptionPage = () => {
  const navigate = useNavigate();
  let { shopIndex } = useParams();
  const location = useLocation();
  const shopDetails = location.state && location.state.shopDetails;
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormOpen(!isFormOpen);
  };

  const selectedShop = shopDetails[shopIndex];
  console.log(selectedShop);

  const handleEdit = () => {
    navigate('/update-shop', { state: { selectedShop: selectedShop } });
  };

  const rows = [
    { label: "Shop Number : ", value: `${selectedShop.shop_number}` },
    { label: "Shop Dome : ", value: `${selectedShop.dome}` },
    { label: "Shop DESCRIPTION : ", value: `${selectedShop.description}` },
    { label: "Shop Area : ", value: `${selectedShop.area} sq.` },
    { label: "Rent: ", value: `${selectedShop.rent}` },
    { label: "Shop Location : ", value: `${selectedShop.location}` },
  ];

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        padding: "20px",
        // minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{ cursor: "pointer", width: "45px", marginLeft: "20px" }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />

      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: { xs: "40px", md: "56px" },
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: { xs: "0px", md: "-30px" },
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
      >
        Shop Description
      </Typography>
      <MyCarousel />
      <Box
        sx={{
          margin: "0 auto",
          textAlign: "center",
          border: "3px solid rgb(112, 141, 161)",
          borderRadius: "7px",
          display: "flex",
          maxWidth: "fit-content",
          width: { xs: "80%", md: "90%" },
          padding: "12px 30px 5px 30px",
          marginTop: "10px",
          borderColor: "rgb(112, 141, 161)", // Added border color
        }}
      >
        <Box sx={{}}>
          {/* Map over the rows array to render the content */}
          {rows.map((row, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "left",
                textTransform: "uppercase",
              }}
            >
              <Typography
                variant="h6"
                display="inline"
                gutterBottom
                sx={{
                  color: "rgb(165, 170, 174)",
                  fontSize: { xs: "16px", md: "20px" },
                  fontFamily: "Poppins",
                  lineHeight: "1.5",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                {row.label}
              </Typography>
              <Typography
                variant="h6"
                display="inline"
                gutterBottom
                sx={{
                  color: "rgb(255, 255, 255)",
                  fontSize: { xs: "16px", md: "20px" },
                  fontFamily: "Poppins",
                  lineHeight: "1.5",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                {row.value}
              </Typography>
            </div>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "20%",
          }}
        >
          <img
            src="../../../Images/矢量 180.png"
            alt="Right Arrow"
            style={{ width: "45%", margin: "0px 20px 0px 60px" }}
          />
          <Typography
            sx={{
              color: "rgb(146, 235, 233)",
              fontWeight: "700",
              fontSize: "18px",
              margin: "5px 20px 0px 60px",
              textTransform: "uppercase",
              // fontFamily:"Roboto"
            }}
          >
            Vacant
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          size="large"
          variant="contained" // Make the button contained if active dom
          sx={{
            color: "rgb(91, 94, 97)",
            background: "rgb(247, 230, 173)",
            marginTop: "20px",
            marginBottom: "5px",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
              color: "rgb(50, 50, 50)", // Change text color on hover
              boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
            },
          }}
          onClick={() => {
            navigate("/rental-agreement");
          }}
        >
          Go to Rental
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{
            color: "rgb(91, 94, 97)",
            background: "rgb(247, 230, 173)",
            marginLeft: "10px",
            marginTop: "20px",
            marginBottom: "5px",
            "&:hover": {
              backgroundColor: "rgb(247, 230, 173)",
              color: "rgb(50, 50, 50)",
              boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)",
            },
          }}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default DescriptionPage;
