import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import NoShop from "../Component/NoShop";
import { AuthContext } from "../ContextApi/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDelete from "../Component/ConfirmDelete";

const ShopListing = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filter, setFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);
  const [activeDom, setActiveDom] = useState("all");
  const [selectedShops, setSelectedShops] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const { setLastShopNumber, user, activeEventId } = useContext(AuthContext);
  console.log(activeEventId);
  const navigate = useNavigate();

  const [Doms, setDoms] = useState([]);
  const [shopCards, setShopCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URI;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  const fetchShops = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/shop/fetch-all-shop/${activeEventId}`,
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
        setLoading(false);
        toast.success("Shops fetched successfully!");
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch shops!");
    }
  }, [user]);

  const fetchLastShopNumber = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/shop/fetch-last-shop-number`,
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
  }, [user]);

  useEffect(() => {
    fetchShops();
    fetchLastShopNumber();
  }, [fetchShops, fetchLastShopNumber]);

  const filteredShops = useMemo(
    () =>
      shopCards.filter((shop) => {
        if (filter === "all") {
          return activeDom === "all" || shop.dome === activeDom;
        }
        return (
          (activeDom === "all" || shop.dome === activeDom) &&
          (filter === "vacant"
            ? shop.status === "vacant"
            : shop.status === "occupied")
        );
      }),
    [shopCards, filter, activeDom]
  );

  const handleFilterChange = useCallback((filterType) => {
    setFilter(filterType);
    setDisplayCount(9);
  }, []);

  const toggleShopSelection = useCallback(
    (shopId) => {
      setSelectedShops((prevSelectedShops) => {
        const isSelected = prevSelectedShops.some((shop) => shop.id === shopId);
        if (isSelected) {
          return prevSelectedShops.filter((shop) => shop.id !== shopId);
        } else {
          const shop = shopCards.find((shop) => shop.id === shopId);
          return shop ? [...prevSelectedShops, shop] : prevSelectedShops;
        }
      });
    },
    [shopCards]
  );

  const handleToggleSelectMode = useCallback(() => {
    setSelectMode((prevSelectMode) => !prevSelectMode);
    setSelectedShops([]);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedShops.length === filteredShops.length) {
      setSelectedShops([]);
    } else {
      setSelectedShops(filteredShops);
    }
  }, [selectedShops, filteredShops]);

  const handleShowMore = useCallback(() => {
    setShowMore(true);
    setDisplayCount((prevDisplayCount) => prevDisplayCount + 9);
  }, []);

  const handleShowLess = useCallback(() => {
    setShowMore(false);
    setDisplayCount(9);
  }, []);

  const handleDelete = useCallback(() => {
    const shopIds = selectedShops.map((shop) => ({
      shop_id: shop.id,
      event_id: shop.event_id,
    }));

    axios
      .delete(`${apiUrl}/shop/delete-shop`, {
        data: { ids: shopIds },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.token,
          role_id: user?.role_id,
        },
      })
      .then((response) => {
        const updatedShopCards = shopCards.filter(
          (shop) =>
            !selectedShops.some((selectedShop) => selectedShop.id === shop.id)
        );
        setShopCards(updatedShopCards);
        setSelectedShops([]);
        toast.success("Shop Deleted Successfully");
        setSelectMode(false);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting shops:", error);
        toast.error("Failed to delete shops!");
        setOpen(false);
      });
  }, [selectedShops, shopCards, user]);

  const handleDomClick = useCallback(
    (dom) => {
      setActiveDom(dom === activeDom ? "" : dom);
      setFilter("all");
    },
    [activeDom]
  );
  const handleCardClick = (shopIndex, shopDetails, event) => {
    if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
      return; // If checkbox clicked, do nothing
    }
    // Redirect to description page with shop index and details as route state
    navigate(`/description/${shopIndex}`, { state: { shopDetails } });
  };
  useEffect(() => {
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
        <ConfirmDelete open={open} handleClose={handleClose} handleIncomeDelete ={handleDelete}/>
        <ToastContainer />

        {/* <div style={{display:"flex"}}> */}
        <Box
          component='img'
          src="../../Images/arrow-left.png"
          alt="Share"
          sx={{
            cursor: "pointer",
            width: {xs:"35px",md:"45px"},
            margin: {xs:"20px 0px 0px 20px",md:"10px 0px 0px 20px"},
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
            marginTop: { xs: "-10px", md: "-40px" },
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
                    minWidth:"fit-content",
                    // padding:"15px",
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
                    onClick={handleOpen}
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
                     {shop.status === "vacant" ? <Typography>---</Typography>:<div>{formatDate(shop.updated_at)}</div>}
                      <div>
                        {shop.status === "vacant" ? (
                          <>
                            <img
                              src="../../../Images/矢量 180.png"
                              alt="Right Arrow"
                              style={{ height: "25px" }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="../../../Images/矢量 182.png"
                              alt="Right Arrow"
                              style={{ height: "25px" }}
                            />
                          </>
                        )}
                      </div>
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
