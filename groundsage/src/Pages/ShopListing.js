import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { Checkbox } from "@mui/material";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests 
import NoShop from "../Component/NoShop";
import { AuthContext } from "../ContextApi/AuthContext";
import { ToastContainer, toast } from "react-toastify";

// import Slider from "../Component/Slider";
const ShopListing = () => {
  const [filter, setFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);
  const [activeDom, setActiveDom] = useState("all"); // State to store active dom, initially set to "all"
  const [selectedShops, setSelectedShops] = useState([]); // State to store selected shop cards
  const [selectMode, setSelectMode] = useState(false);
  const { setLastShopNumber, user } = useContext(AuthContext);
  const {activeEventId } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleCardClick = (shopIndex, shopDetails, event) => {
    if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
      return; // If checkbox clicked, do nothing
    }
    // Redirect to description page with shop index and details as route state
    navigate(`/description/${shopIndex}`, { state: { shopDetails } });
  };

  const [Doms, setDoms] = useState([]); // State to store the Doms array
  const [shopCards, setShopCards] = useState([]); // State to store shop data
  const [loading, setLoading] = useState(true);

  // const filteredShops = shopCards.filter((shop) => {
  //   if (filter === "all") return true; // Return true for all shops when filter is "all"

  //   if (activeDom && shop.dom !== activeDom) return false;
  //   // if (filter === "all") return true;
  //   if (filter === "occupied") return shop.occupied;
  //   if (filter === "vacant") return !shop.occupied;
  //   return true;handleFilterChange
  // });
  const filteredShops = shopCards?.filter((shop) => {
    if (filter === "all") {
      // If filter is "all", show all shops (vacant and occupied) for the selected dome
      if (activeDom === "all" || shop.dome === activeDom) {
        return true;
      } else {
        return false;
      }
    } else {
      // If filter is "vacant" or "occupied", filter based on shop status and selected dome
      if (activeDom === "all" || shop.dome === activeDom) {
        return filter === "vacant"
          ? shop.status === "Vacant"
          : shop.status === "Occupied";
      } else {
        return false;
      }
    }
  });

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const id = activeEventId;
        const response = await axios.get(
          `https://groundsageevent-be.onrender.com/api/v1/shop/fetch-all-shop/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": user?.token,
              role_id: user?.role_id,
            },
          }
        );
        if (response.data.success) {
          setShopCards(response.data.data);
          const uniqueDomes = new Set();
          response.data.data.forEach((shop) => {
            uniqueDomes.add(shop.dome);
          });
          setDoms(Array.from(uniqueDomes));
          setLoading(false); // Set loading to false when data is fetched successfully
          toast.success("Shops fetched successfully!");
        } else {
          // If the response indicates no data found, set loading to false
          setLoading(false);
          toast.error(response.data.message); // Notify user about the error
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch shops!");
      }
    };

    const fetchLastShopNumber = async () => {
      try {
        const response = await axios.get(
          "https://groundsageevent-be.onrender.com/api/v1/shop/fetch-last-shop-number",
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": user?.token,
              role_id: user?.role_id,
            },
          }
        );
        if (response && response.data && response.data.success) {
          const shopNumber = response.data.data.shop_number;
          setLastShopNumber(shopNumber);
        }
      } catch (error) {
        console.error("Error fetching last shop number:", error);
      }
    };

    fetchShops();
    fetchLastShopNumber();
  }, []);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setDisplayCount(9); // Reset display count when filter changes
  };

  const toggleShopSelection = (shopId) => {
    console.log("Toggling selection for shopId:", shopId);

    // Check if shop is already selected
    const isSelected = selectedShops.some((shop) => shop.id === shopId);
    console.log("Is selected:", isSelected);

    // Toggle selection status
    if (isSelected) {
      setSelectedShops(selectedShops?.filter((shop) => shop.id !== shopId)); // Deselect shop
    } else {
      // Find the shop object with the corresponding id
      const shop = shopCards.find((shop) => shop.id === shopId);
      console.log("Shop:", shop);
      if (shop) {
        setSelectedShops([...selectedShops, shop]); // Select shop by adding its data to selectedShops
      }
    }
  };

  useEffect(() => {
    console.log("Selected Shops:", selectedShops);
  }, [selectedShops]);

  const handleToggleSelectMode = () => {
    setSelectMode(!selectMode); // Toggle select mode
    setSelectedShops([]); // Clear selected shops when entering or exiting select mode
  };
  const handleSelectAll = () => {
    // If all shops are already selected, deselect all; otherwise, select all
    if (selectedShops?.length === filteredShops?.length) {
      setSelectedShops([]);
    } else {
      setSelectedShops(filteredShops.map((shop) => shop)); // Add complete shop objects
    }
  };

  const handleShowMore = () => {
    setShowMore(true);
    setDisplayCount(displayCount + 9); // Increment display count by 9 when "Show more" is clicked
  };

  const handleShowLess = () => {
    setShowMore(false);
    setDisplayCount(9); // Reset display count to 9 when "Show less" is clicked
  };

  const handleDelete = () => {
    const shopIds = selectedShops.map((shop) => ({
      shop_id: shop.id,
      event_id: shop.event_id, // Assuming `event_id` is available in shop data
    }));

    console.log(shopIds);

    axios
      .delete(
        "https://groundsageevent-be.onrender.com/api/v1/shop/delete-shop",
        {
          data: { ids: shopIds }, // Wrap shopIds in an object with key "ids"
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user?.token,
            role_id: user?.role_id,
          },
        }
      )
      .then((response) => {
        console.log("Shops deleted successfully");
        const updatedShopCards = shopCards.filter(
          (shop) =>
            !selectedShops.some((selectedShop) => selectedShop.id === shop.id)
        );
        setShopCards(updatedShopCards);
        setSelectedShops([]);
        toast.success("Shop Deleted Successfully");
        toast.success("Shop deleted successfully!");
        setSelectMode(false);
      })
      .catch((error) => {
        console.error("Error deleting shops:", error);
        toast.error("Failed to delete shops!");
      });
  };

  const handleDomClick = (dom) => {
    console.log(dom);
    setActiveDom(dom === activeDom ? "" : dom); // Toggle active dom
    setFilter(dom === "all" ? "all" : "dom"); // Set filter to "dom" if a dome is clicked, else set to "all"
    setFilter("all");
  };
  useEffect(() => {
    // Set default filter to "all" when component mounts
    setFilter("all");
  }, []);

  if (loading) {
    // Show a loading indicator while the data is being fetched
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        <CircularProgress sx={{ color: "rgb(247, 230, 173)" }} />
      </Box>
    );
  }

  return (
    <div>
      <div
        style={{
          background: "rgb(66, 92, 90)",
          paddingBottom: "30px",
          boxShadow: "0px 4px 6px rgba(255, 251, 251, 0.11)", // Adding outside shadow
        }}
      >
        <ToastContainer />

        {/* <div style={{display:"flex"}}> */}
        <img
          src="../../Images/arrow-left.png"
          alt="Share"
          style={{
            cursor: "pointer",
            width: "45px",
            margin: "10px 0px 0px 20px",
          }}
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
            marginTop: { xs: "10px", md: "-40px" },
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          }}
        >
          Shops List
        </Typography>
        {/* </div> */}
        {shopCards?.length > 0 ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                margin: "20px",
              }}
            >
              <Button
                size="large"
                variant={activeDom === "all" ? "contained" : "outlined"}
                sx={{
                  borderColor: "rgb(247, 230, 173)",
                  width: { xs: "150px", sm: "175px" },
                  height: "42px", // Set the height for all buttons
                  color: activeDom === "all" ? "rgb(91, 94, 97)" : "white",
                  background:
                    activeDom === "all" ? "rgb(247, 230, 173)" : "transparent", // Apply yellow background to active DOM button
                  "&:hover": {
                    color: activeDom === "all" ? "white" : "rgb(91, 94, 97)",
                    background:
                      activeDom === "all"
                        ? "transparent"
                        : "rgb(247, 230, 173)",
                  },
                  margin: "5px",
                }}
                onClick={() => activeDom !== "all" && handleDomClick("all")}
              >
                All
              </Button>
              {Doms.map((dom, idx) => (
                <Button
                  size="large"
                  variant={dom === activeDom ? "contained" : "outlined"} // Make the button contained if active dom
                  sx={{
                    borderColor: "rgb(247, 230, 173)",
                    width: { xs: "150px", sm: "175px" },
                    height: "42px", // Set the height for all buttons
                    color: activeDom === dom ? "rgb(91, 94, 97)" : "white",
                    background:
                      activeDom === dom ? "rgb(247, 230, 173)" : "transparent", // Apply yellow background to active DOM button
                    "&:hover": {
                      color: activeDom === dom ? "white" : "rgb(91, 94, 97)",
                      background:
                        activeDom === dom
                          ? "transparent"
                          : "rgb(247, 230, 173)",
                    },
                    margin: "5px",
                  }}
                  onClick={() => handleDomClick(dom)}
                >
                  Dome {dom}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                background: "rgb(24, 49, 47)",
                marginTop: "15px",
                padding: "3px 15px 15px 15px",
                boxShadow: "0px 4px 6px rgba(255, 251, 251, 0.11)", // Adding outside shadow
                //   width:"100vw"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src="../../../Images/Standard Icons _ F _ filter.png"
                  alt="Right Arrow"
                  style={{ marginRight: "5px", height: "26px" }} // Adjust margin between image and text
                />
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  Filters :
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Fira Sans",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleFilterChange("all")}
                  style={{
                    // marginRight: "60px",
                    background: "rgb(196, 196, 196)",
                    color: "rgb(24, 49, 47)",
                    fontFamily: "Fira Sans",
                    padding: "3px 30px 3px 30px",
                  }}
                >
                  All
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleFilterChange("vacant")}
                  style={{
                    // marginRight: "60px",
                    margin: "0px 60px 0px 60px",
                    background: "rgb(196, 196, 196)",
                    color: "rgb(24, 49, 47)",
                    fontFamily: "Fira Sans",
                    padding: "3px 30px 3px 30px",
                  }}
                >
                  Vacant
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleFilterChange("occupied")}
                  style={{
                    // marginRight: "60px",
                    background: "rgb(196, 196, 196)",
                    color: "rgb(24, 49, 47)",
                    fontFamily: "Fira Sans",
                    padding: "3px 30px 3px 30px",
                  }}
                >
                  Occupied
                </Button>
              </div>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/createshop");
                }}
              />
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                // marginTop: "30px",
                // marginLeft: { xs: "0px", md: "240px" },
                // marginRight: { xs: "0px", md: "240px" },
              }}
            >
              <Box>
                <Button
                  variant="text"
                  onClick={handleToggleSelectMode}
                  sx={{ color: "white", fontWeight: "600" }}
                >
                  {selectMode ? "Cancel" : "Select "}
                </Button>
                {selectMode && (
                  <Checkbox
                    checked={selectedShops?.length === filteredShops?.length}
                    indeterminate={
                      selectedShops?.length > 0 &&
                      selectedShops?.length < filteredShops?.length
                    }
                    onChange={handleSelectAll}
                    sx={{
                      color: "#ffffff", // Change checkbox color to white
                      "&.Mui-checked": {
                        color: "#ffffff", // Change tick color to white when checkbox is checked
                      },
                    }}
                  />
                )}
              </Box>
              <Box>
                {selectMode && (
                  <img
                    src="deleteIcon.png"
                    alt="delete Icon"
                    style={{
                      padding: "2px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                    onClick={handleDelete}
                  />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: { xs: "0px", md: "190px" },
                marginRight: { xs: "0px", md: "190px" },
                cursor: "pointer",
              }}
            >
              {filteredShops.slice(0, displayCount).map((shop, index) => (
                <Box
                  key={index}
                  onClick={(event) =>
                    handleCardClick(shop.shop_number, shop, event)
                  } // Redirect to description page on card click
                  sx={{
                    // width: "calc(33.33% - 20px)",
                    // padding:"20px",
                    margin: "10px",
                    // marginTop: "25px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "40%", lg: "calc(25.33% - 20px)" }, // Three cards in one row
                    color: "rgb(255, 255, 255)",
                    position: "relative", // Position relative for absolute positioning of elements inside
                    boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.25)", // O
                    borderStyle: "none",
                    borderRadius: "4px",
                    height: "100%",
                  }}
                >
                  {selectMode && (
                    <Checkbox
                      //  checked={selectedShops.includes(shop.id)}
                      checked={selectedShops.some(
                        (selectedShop) => selectedShop.id === shop.id
                      )}
                      onChange={() => toggleShopSelection(shop.id)}
                      sx={{
                        color: "#ffffff", // Change checkbox color to white
                        "&.Mui-checked": {
                          color: "#ffffff", // Change tick color to white when checkbox is checked
                        },
                      }}
                    />
                  )}
                  <div
                    style={{
                      height: "50%",
                      textAlign: "center",
                      background: "rgb(231, 230, 230)",
                      borderRadius: "3px",
                      padding: "15px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "rgb(24, 49, 47)",
                        fontSize: "30px",
                        fontWeight: "700",
                        fontFamily: "Fira Sans",
                        letterSpacing: "0px",
                        lineHeight: "1", // Adjust the line height
                      }}
                    >
                      SHOP
                    </Typography>
                    <Typography
                      variant="h6"
                      display="inline"
                      gutterBottom
                      sx={{
                        color: "rgb(24, 49, 47)",
                        fontSize: "60px",
                        fontWeight: "700",
                        fontFamily: "Fira Sans",
                        letterSpacing: "0px",
                        lineHeight: "0.8", // Adjust the line height
                      }}
                    >
                      {shop.shop_number}
                    </Typography>
                  </div>
                  <div
                    style={{
                      height: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      background: "rgb(66, 92, 90)",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "700", fontFamily: "Fira Sans" }}
                    >
                      Area: {shop.area} sq.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Fira Sans" }}
                    >
                      Location: {shop.location}
                    </Typography>
                  </div>
                  {shop.status === "Occupied" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Fira Sans" }}
                      >
                        {shop.date}
                      </Typography>
                      <img
                        src="../../../Images/Exclude.png"
                        alt="Right Arrow"
                        style={{ height: "25px" }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                      }}
                    >
                      <Typography>---</Typography>
                      <img
                        src="../../../Images/矢量 180.png"
                        alt="Right Arrow"
                        style={{ height: "25px" }}
                      />
                    </div>
                  )}
                </Box>
              ))}
            </Box>
            {!showMore && filteredShops?.length > displayCount && (
              <Typography
                onClick={handleShowMore}
                sx={{
                  textAlign: "center",
                  color: "rgb(255, 255, 255)",
                  marginTop: "20px",
                  textDecoration: "underline",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Show more....
              </Typography>
            )}
            {showMore && (
              <Typography
                onClick={handleShowLess}
                sx={{
                  textAlign: "center",
                  color: "rgb(255, 255, 255)",
                  marginTop: "20px",
                  textDecoration: "underline",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Show less....
              </Typography>
            )}
          </Box>
        ) : (
          <NoShop />
        )}
      </div>
    </div>
  );
};

export default ShopListing;
