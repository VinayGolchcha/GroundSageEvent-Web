import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import MyCarousel from "../Component/Slider";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ShopEditForm from "../Component/ShopEdit";
import UpdateShopPage from "./UpdateShop";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";

const DescriptionPage = () => {
  const navigate = useNavigate();
  let { shopIndex } = useParams();
  const location = useLocation();
  const shopDetails = location.state && location.state.shopDetails;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user, activeEventId } = useContext(AuthContext);
  const [isRental, setIsRenatal] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleEdit = () => {
    navigate("/update-shop", {
      state: {
        selectedShop: selectedShop,
        imageUrls: imageUrls,
      },
    });
  };
  console.log(selectedShop?.status);
  const apiUrl = process.env.REACT_APP_API_URI;
  const fetchRentalAgree = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/rentalagreement/fetch-rental-agreement`,
        {
          event_id: activeEventId,
          shop_id: shopDetails?.id,
        },
        {
          headers: {
            Authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      if (res?.data?.data?.length > 0) {
        const obj = res?.data?.data[0];
        setIsRenatal(true);
      }
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const fetchShopData = async () => {
    try {
      const response = await fetch(`${apiUrl}/shop/fetch-shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.token,
          role_id: user?.role_id,
        },
        body: JSON.stringify({
          shop_id: shopDetails.id,
          event_id: shopDetails.event_id,
        }),
      });
      const data = await response.json();
      setSelectedShop(data.data[0]); // Assuming shop details are at data[0]
      setImageUrls(data.data[1]); // Assuming images are at data[1]
      console.log(data.data[1]);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching shop data:", error);
      setLoading(false); // Also set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchShopData();
    fetchRentalAgree(); // Fetch shop data when component mounts
  }, []);

  if (loading) {
    // Show a loading indicator while the data is being fetched
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        <CircularProgress sx={{ color: "rgb(247, 230, 173)" }} />
      </Box>
    );
  }

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        padding: "20px",
        // overflowY: "auto",
        minHeight: "100vh",
      }}
    >
      <Box
        component="img"
        src="../../Images/arrow-left.png"
        alt="Share"
        sx={{
          cursor: "pointer",
          width: { xs: "35px", md: "45px" },
          margin: { xs: "20px 0px 0px 20px", md: "10px 0px 0px 20px" },
        }}
        onClick={() => {
          navigate(-1); // Navigate back by one step in the history stack
        }}
      />

      <Typography
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          fontSize: { xs: "30px", sm: "40px", md: "56px" },
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: { xs: "0px", md: "-30px" },
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
      >
        Shop Description
      </Typography>
      {imageUrls.length > 0 && (
        <MyCarousel images={imageUrls.map((img) => img.image_url)} />
      )}
      {selectedShop && (
        <Box
          sx={{
            margin: "0 auto",
            textAlign: "center",
            border: "3px solid rgb(112, 141, 161)",
            borderRadius: "7px",
            display: "flex",
            minWidth: "fit-content",
            width: { xs: "90%", md: "30%" },
            padding: { xs: "15px", md: "12px 30px 5px 30px" },
            marginTop: "10px",
            borderColor: "rgb(112, 141, 161)", // Added border color
          }}
        >
          <Box>
            {[
              { label: "Shop Number: ", value: selectedShop.shop_number },
              { label: "Shop Dome: ", value: selectedShop.dome },
              { label: "Shop Description: ", value: selectedShop.description },
              { label: "Shop Area: ", value: `${selectedShop.area} sq ft.` },
              { label: "Rent: ", value: selectedShop.rent },
              { label: "Shop Location: ", value: selectedShop.location },
            ].map((row, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  textTransform: "uppercase",
                  flexWrap: "wrap",
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
                    marginRight: "10px",
                  }}
                >
                  {row.label + " "}
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
                  {" " + row.value}
                </Typography>
              </Box>
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
            <div>
              {selectedShop?.status === "vacant" ? (
                <>
                  <Box
                    component="img"
                    src="../../../Images/矢量 180.png"
                    alt="Right Arrow"
                    sx={{
                      width: { xs: "35%", md: "45%" },
                      margin: {
                        xs: "10px 20px 0px 30px",
                        md: "0px 20px 0px 60px",
                      },
                    }}
                  />
                </>
              ) : (
                <>
                  <Box
                    component="img"
                    src="../../../Images/矢量 182.png"
                    alt="Right Arrow"
                    sx={{
                      width: { xs: "35%", md: "45%" },
                      margin: {
                        xs: "10px 20px 0px 30px",
                        md: "0px 20px 0px 60px",
                      },
                    }}
                  />
                </>
              )}
            </div>
            <Typography
              sx={{
                color: "rgb(146, 235, 233)",
                fontWeight: "700",
                fontSize: { xs: "14px", md: "18px" },
                margin: { xs: "5px 20px 0px 30px", md: "5px 10px 0px 60px" },
                textTransform: "uppercase",
              }}
            >
              {selectedShop?.status}
            </Typography>
          </Box>
        </Box>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isRental && (
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
              navigate(`/rental-agreement/${shopDetails.id}`);
            }}
          >
            Go to Rental
          </Button>
        )}
        {isRental && (
          <Button
            size="large"
            variant="contained" // Make the button contained if active dom
            sx={{
              color: "rgb(91, 94, 97)",
              background: "rgb(247, 230, 173)",
              marginTop: "20px",
              marginLeft: "10px",
              marginBottom: "5px",
              "&:hover": {
                backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                color: "rgb(50, 50, 50)", // Change text color on hover
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
              },
            }}
            onClick={() => {
              navigate(`/rental-agreement/${shopDetails?.id}`);
            }}
          >
            Edit Rental agreement
          </Button>
        )}
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
          Edit Shop
        </Button>
      </div>
    </div>
  );
};

export default DescriptionPage;
