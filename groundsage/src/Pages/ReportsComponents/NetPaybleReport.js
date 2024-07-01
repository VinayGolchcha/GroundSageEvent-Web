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
import { AuthContext } from "../../ContextApi/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../Component/Loading";

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

const NetPaybleReport = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Year"); // Set initial value to "Year"
  const {user , activeEventId} = useContext(AuthContext);
  const [netPaybleReportData , setNetPaybleReportData] = useState([]);
  const options = ["Year", "Month"];
  const [isLoading , setIsLoading]= useState(true);

  const fetchNetPaybleReport = async () => {
    try{
      setIsLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URI}/transaction/fetch-all-years-data` ,{
        flag : selectedOption.toLowerCase(),
        event_id : activeEventId,
        type : "expense"
      } , {
        headers : {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
        }
      });
      setNetPaybleReportData(res?.data?.data);
      setIsLoading(false);
    }catch(error){
      setIsLoading(false);
      setNetPaybleReportData([]);
      if(error?.response?.message){
        toast.error(error?.response?.message  , {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          },
        });
      }
      if(error?.response?.data?.message){
        console.log("true");
        const item = error?.response?.data?.message
        toast.error(item  , {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          },
        });
      }
    }
  
  }

  useEffect(()=> {
    fetchNetPaybleReport();
  },[selectedOption , activeEventId]);

  // Sample data for the table
  const yearlyData = [
    {
      year: 2020,
      totalAmount: 100000,
      shopRental: 10000,
      others: 5000,
    },
    {
      year: 2021,
      totalAmount: 120000,
      shopRental: 12000,
      others: 6000,
    },
    {
      year: 2022,
      totalAmount: 150000,
      shopRental: 15000,
      others: 7000,
    },
    {
      year: 2023,
      totalAmount: 180000,
      shopRental: 18000,
      others: 8000,
    },
    {
      year: 2024,
      totalAmount: 200000,
      shopRental: 20000,
      others: 9000,
    },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option
  };

  const heading =
    selectedOption === "Year"
      ? ["YEAR", "TOTAL AMOUNT", "STAFF SALARY", "OTHERS"]
      : ["MONTH", "TOTAL AMOUNT", "STAFF SALARY", "OTHERS"];

  const getLast12MonthsData = () => {
    const monthsData = [];
    for (let i = 0; i < 12; i++) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - i);
      const month = currentDate.toLocaleString("default", { month: "short" });
      const year = currentDate.getFullYear();
      const monthName = `${month} ${year}`;
      monthsData.unshift({
        month: monthName,
        totalAmount: Math.floor(Math.random() * 10000) + 5000,
        shopRental: Math.floor(Math.random() * 2000) + 3000,
        others: Math.floor(Math.random() * 1000) + 2000,
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
  if(isLoading){
    return(
      <Loading/>
    )
  }else{

    return (
      <div
        style={{
          background: "rgb(66, 92, 90)",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
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
            fontSize: {xs:"40px",md:"56px"},
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
          # Net Payable Report
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
            <Typography
              sx={{
                color: "rgb(84, 80, 65)",
                fontSize: "30px",
                fontFamily: "Inter",
                fontWeight: "600",
                //   textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
                margin: "0px 0px 0px 10px",
                fontSize : {xs : "20px" , sm : "20px"}
              }}
            >
              {selectedOption === "Year" ?<> Yearly Update </> : <>Monthly Update</>} for Net Payable 
            </Typography>
            {/* <Typography
              sx={{
                color: "rgb(84, 80, 65)",
                fontSize: "20px",
                fontFamily: "Inter",
                fontWeight: "400",
                //   textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
                margin: "0px 0px 10px 10px",
                fontSize : {xs : "22px" , sm : "22px"}
              }}
            >
              Different Types of EXPENSE
            </Typography> */}
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
                            fontSize : {xs : "20px" , sm : "20px"}
                          }}
                        >
                          {h} {idx !== 0 && <span>₹</span>}
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
                  {selectedOption === "Year"
                    ? netPaybleReportData?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data?.year}</TableCell>
                          <TableCell>{data?.total}</TableCell>
                          <TableCell>{data?.staff_salary_total}</TableCell>
                          <TableCell>{data?.other_total}</TableCell>
                        </TableRow>
                      ))
                    : selectedOption === "Month"
                    ? netPaybleReportData?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data?.month}</TableCell>
                          <TableCell>{data?.total}</TableCell>
                          <TableCell>{data?.staff_salary_total}</TableCell>
                          <TableCell>{data?.other_total}</TableCell>
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
  }

};

export default NetPaybleReport;
