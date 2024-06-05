import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material"; // Import necessary components
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../ContextApi/AuthContext";

const TableCell = (props) => {
  return (
    <MuiTableCell
      {...props}
      sx={{
        borderBottom: "none",
        fontFamily: "Poppins",
        fontWeight: "400",
        ...(props.sx || {}), // Merge custom styles with default styles
      }}
    />
  );
};

const OccupancyReport = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Shop"); // Set initial value to "Shop"

  const options = ["Shop", "Month"];
  const [occupancyData , setOccupancyData] = useState([]);
  const {activeEventId , user} = useContext(AuthContext);

  useEffect(()=>{
    try{
      const res = axios.post(`${process.env.REACT_APP_API_URI}/shop/fetch-shop-occupancy-data` , {
        flag : selectedOption,
        event_id : activeEventId
      } , {
        headers : {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
        }
      });
      console.log(res);
    }catch(err){
      console.log(err);
    }

  },[])

  // Sample data for the table
  const ShopData = [
    {
      Shop_ID: 1110,
      SHOP_NUMBER: 12,
      RENTED: true,
      VACANT: true,
    },
    {
      Shop_ID: 1111,
      SHOP_NUMBER: 13,
      RENTED: true,
      VACANT: false,
    },
    {
      Shop_ID: 1112,
      SHOP_NUMBER: 14,
      RENTED: true,
      VACANT: true,
    },
    {
      Shop_ID: 1113,
      SHOP_NUMBER: 15,
      RENTED: false,
      VACANT: false,
    },
    {
      Shop_ID: 1114,
      SHOP_NUMBER: 16,
      RENTED: false,
      VACANT: true,
    },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option
  };

  const heading =
    selectedOption === "Shop"
      ? ["SHOP ID", "SHOP NUMBER", "RENTED", "VACANT"]
      : ["MONTH", "TOTAL SHOPS", "OCCUPIED", "VACANT"];

  // Function to generate dummy data for the last 12 months
  const getLast12MonthsData = () => {
    const monthsData = [];
    for (let i = 0; i < 12; i++) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - i);
      const month = currentDate.toLocaleString("default", { month: "short" }); // Abbreviated month name
      const year = currentDate.getFullYear();
      const monthName = `${month} ${year}`;
      const totalShops = Math.floor(Math.random() * 50) + 50; // Random total shops
      const occupied = Math.floor(Math.random() * (totalShops + 1)); // Random occupied shops
      const vacant = totalShops - occupied; // Calculate vacant shops
      monthsData.unshift({
        month: monthName,
        totalShops: totalShops,
        occupied: occupied,
        vacant: vacant,
      });
    }
    return monthsData;
  };

  const CustomIcon = (
    <img
      src="../../Images/image 87.png" // Change the image path to the desired image
      alt="Icon"
      style={{
        // width: "20px",
        // height: "20px",
        margin: "0px 5px 0px -10px",
      }}
    />
  );

  return (
    <div
      style={{
        background: "rgb(66, 92, 90)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <img
        src="../../Images/arrow-left.png"
        alt="Share"
        style={{
          cursor: "pointer",
          width: "45px",
          marginBottom: "20px",
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
          marginTop: "-75px",
          //   textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
      >
        Reports
      </Typography>
      <Typography
        sx={{
          color: "rgb(155, 181, 199)",
          fontSize: "35px",
          fontFamily: "Aoboshi One",
          fontWeight: "400",
          //   textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          margin: "0px 0px 0px 50px",
          marginLeft: "13%",
        }}
      >
        # Occupancy Report
      </Typography>
      {/* Yearly Update Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          marginLeft: "14%",
        }}
      >
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          variant="outlined"
          size="small"
          sx={{
            maxWidth: "120px",
            marginRight: "10px",
            marginLeft: "95%",
            marginBottom: "5px",
            borderRadius: "0px",
            background: "rgb(217, 217, 217)",
            // "& .MuiSelect-icon": {
            //   top: "calc(50% - 12px)", // Adjust icon position vertically
            //   right: "8px", // Adjust icon position horizontally
            // },
            // "& .MuiSelect-selectMenu": {
            //   paddingRight: "30px", // Adjust space for the icon
            // },
          }}
          // Remove the native select dropdown arrow
          IconComponent={() => CustomIcon} // Use custom icon component
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Box
          sx={{
            background: "rgb(236, 219, 163)",
            padding: "20px",
            borderRadius: "10px",
            // margin: "20px auto",
            width: "100%",
          }}
        >
          {selectedOption === "Shop" ? (
  <Typography
    sx={{
      color: "rgb(84, 80, 65)",
      fontSize: "30px",
      fontFamily: "Inter",
      fontWeight: "800",
      margin: "0px 0px 20px 10px",
    }}
  >
    Shop Update
  </Typography>
) : (
  <Typography
    sx={{
      color: "rgb(84, 80, 65)",
      fontSize: "30px",
      fontFamily: "Inter",
      fontWeight: "800",
      margin: "0px 0px 20px 10px",
    }}
  >
    Monthly Update for Current Year
  </Typography>
)}


          {/* Header Row */}
          <TableContainer>
            <Table size="medium" sx={{ border: "none" }}>
              {" "}
              {/* Remove table border */}
              <TableHead>
                <TableRow sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.5)" }}>
                  {" "}
                  {/* Add bottom border with specified color */}
                  {heading.map((h, idx) => {
                    return (
                      <TableCell
                        key={idx}
                        sx={{
                          color: "rgb(84, 80, 65)",
                          fontSize: "20px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          borderBottom: "none",
                        }}
                      >
                        {h}
                        {idx === 0 && (
                          <img
                            src="../../Images/icon.png" // Add the path to your icon image
                            alt="Icon"
                            style={{
                              marginLeft: "25px",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              {/* Data Rows */}
              <TableBody>
                {selectedOption === "Shop"
                  ? ShopData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.Shop_ID}</TableCell>
                        <TableCell>{data.SHOP_NUMBER}</TableCell>
                        <TableCell>{data.RENTED ? "YES" : "-"}</TableCell>
                        <TableCell>{data.VACANT ? "YES" : "-"}</TableCell>
                      </TableRow>
                    ))
                  : selectedOption === "Month"
                  ? getLast12MonthsData().map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.month}</TableCell>
                        <TableCell>{data.totalShops}</TableCell>
                        <TableCell>{data.occupied}</TableCell>
                        <TableCell>{data.vacant}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default OccupancyReport;
