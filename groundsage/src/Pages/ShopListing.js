import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
// import Slider from "../Component/Slider";
const ShopListing = () => {
  const [filter, setFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);
  const [activeDom, setActiveDom] = useState("all"); // State to store active dom, initially set to "all"

  const navigate = useNavigate();

  const handleCardClick = (shopIndex, shopDetails) => {
    // Redirect to description page with shop index and details as route state
    navigate(`/description/${shopIndex}`, { state: { shopDetails } });
  };

  const Doms = ["A", "B", "C", "D", "E", "F"];
  const shopCards = [
    {
      dom: "A",
      area: "1200 sq.",
      location: "Near Entrance",
      occupied: true,
      date: "12-Nov-24",
    },

    { dom: "A", area: "120 sq", location: "Near Entrance" },
    {
      dom: "A",
      area: "500 sq.",
      location: "Near Entrance",
      occupied: true,
      date: "2-Nov-24",
    },

    { dom: "D", area: "800 sq", location: "Near Entrance" },
    {
      dom: "D",
      area: "1200 sq.",
      location: "Near Entrance",
      occupied: true,
      date: "1-Nov-24",
    },
    {
      dom: "E",
      area: "1200 sq",
      location: "Near Entrance",
    },
    {
      dom: "B",

      area: "200 sq.",
      location: "Near Entrance",
      occupied: true,
      date: "10-Nov-24",
    },
    { dom: "B", area: "100 sq", location: "Near Entrance" },
    { dom: "C", area: "1200 sq", location: "Near Entrance" },
    { dom: "C", area: "1200 sq", location: "Near Entrance" },
    { dom: "E", area: "1200 sq", location: "Near Entrance" },
    { dom: "D", area: "1200 sq", location: "Near Entrance" },
  ];

  // const filteredShops = shopCards.filter((shop) => {
  //   if (filter === "all") return true; // Return true for all shops when filter is "all"

  //   if (activeDom && shop.dom !== activeDom) return false;
  //   // if (filter === "all") return true;
  //   if (filter === "occupied") return shop.occupied;
  //   if (filter === "vacant") return !shop.occupied;
  //   return true;
  // });
  const filteredShops = shopCards.filter((shop) => {
    if (filter === "all") {
      // If filter is "all", show all shops (vacant and occupied) for the selected dome
      if (activeDom === "all" || shop.dom === activeDom) {
        return true;
      } else {
        return false;
      }
    } else {
      // If filter is "vacant" or "occupied", filter based on shop occupancy status and selected dome
      if (activeDom === "all" || shop.dom === activeDom) {
        return filter === "vacant" ? !shop.occupied : shop.occupied;
      } else {
        return false;
      }
    }
  });

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setDisplayCount(9); // Reset display count when filter changes
  };

  const handleShowMore = () => {
    setShowMore(true);
    setDisplayCount(displayCount + 9); // Increment display count by 9 when "Show more" is clicked
  };

  const handleShowLess = () => {
    setShowMore(false);
    setDisplayCount(9); // Reset display count to 9 when "Show less" is clicked
  };

  const handleDomClick = (dom) => {
    setActiveDom(dom === activeDom ? "" : dom); // Toggle active dom
    setFilter(dom === "all" ? "all" : "dom"); // Set filter to "dom" if a dome is clicked, else set to "all"
  };
  useEffect(() => {
    // Set default filter to "all" when component mounts
    setFilter("all");
  }, []);
  return (
    <div>
      <div
        style={{
          background: "rgb(66, 92, 90)",
          paddingBottom: "10px",
          boxShadow: "0px 4px 6px rgba(255, 251, 251, 0.11)", // Adding outside shadow
        }}
      >
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
            fontSize: "56px",
            fontFamily: "Inter",
            fontWeight: "700",
            marginTop: "-40px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          }}
        >
          Shops List
        </Typography>
        {/* </div> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px",
          }}
        >
          <Button
            size="large"
            variant={activeDom === "all" ? "contained" : "outlined"}
            sx={{
              borderColor: "rgb(247, 230, 173)",
              width: "170px",
              color: activeDom === "all" ? "rgb(91, 94, 97)" : "white",
              background:
                activeDom === "all" ? "rgb(247, 230, 173)" : "transparent", // Apply yellow background to active DOM button
              "&:hover": {
                color: activeDom === "all" ? "white" : "rgb(91, 94, 97)",
                background:
                  activeDom === "all" ? "transparent" : "rgb(247, 230, 173)",
              },
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
                width: "160px",
                color: activeDom === dom ? "rgb(91, 94, 97)" : "white",
                background:
                  activeDom === dom ? "rgb(247, 230, 173)" : "transparent", // Apply yellow background to active DOM button
                "&:hover": {
                  color: activeDom === dom ? "white" : "rgb(91, 94, 97)",
                  background:
                    activeDom === dom ? "transparent" : "rgb(247, 230, 173)",
                },
              }}
              onClick={() => handleDomClick(dom)}
            >
              dome {dom}
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
              Vaccant
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
        <Box>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "190px",
              marginRight: "190px",
            }}
          >
            {filteredShops.slice(0, displayCount).map((shop, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index, filteredShops)} // Redirect to description page on card click
                style={{
                  // width: "calc(33.33% - 20px)",
                  // padding:"20px",
                  margin: "10px",
                  marginTop: "25px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  width: "calc(25.33% - 20px)", // Three cards in one row
                  color: "rgb(255, 255, 255)",
                  position: "relative", // Position relative for absolute positioning of elements inside
                  boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.25)", // O
                  borderStyle: "none",
                  borderRadius: "4px",
                }}
              >
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
                    0{index + 1}
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
                    Area: {shop.area}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: "Fira Sans" }}>
                    Location: Near <br />
                    Entrance
                  </Typography>
                </div>
                {shop.occupied ? (
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
              </div>
            ))}
          </div>
        </Box>
        {!showMore && filteredShops.length > displayCount && (
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
      </div>

      <Footer />
    </div>
  );
};

export default ShopListing;
