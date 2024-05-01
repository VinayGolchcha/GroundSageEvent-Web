import React, { useState } from "react";
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

const TenantsReport = () => {
  const navigate = useNavigate();

  // Sample data for the table
  const TenantsReportData = [
    {
      TENANT_ID: 1111,
      TENANT_NAME: "Prabhat Gupta",
      START_DATE: "01-03-2024",
      END_DATE: "03-06-2024",
    },
    {
      TENANT_ID: 1112,
      TENANT_NAME: "John Doe",
      START_DATE: "01-03-2024",
      END_DATE: "03-06-2024",
    },
    {
      TENANT_ID: 1113,
      TENANT_NAME: "John Doe",
      START_DATE: "01-03-2024",
      END_DATE: "03-06-2024",
    },
    {
      TENANT_ID: 1114,
      TENANT_NAME: "John Doe",
      START_DATE: "01-03-2024",
      END_DATE: "03-06-2024",
    },
    {
      TENANT_ID: 1115,
      TENANT_NAME: "John Doe",
      START_DATE: "20-04-2024",
      END_DATE: "23-04-2024",
    },
    // Add more data as needed
  ];
  const heading = ["TENANT ID", "TENANT NAME", "START DATE", "END DATE"];
  // const oldestDate = TenantsReportData[TenantsReportData.length - 1].START_DATE;
  // const newestDate = TenantsReportData[0].END_DATE;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [oldestDate, setOldestDate] = useState("");
  const [newestDate, setNewestDate] = useState("");
  
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };  

  const filteredData = TenantsReportData.filter((item) => {
    if (!oldestDate || !newestDate) return true;
    const formattedStartDate = formatDate(item.START_DATE);
    const formattedEndDate = formatDate(item.END_DATE);
    const formattedOldestDate = formatDate(oldestDate);
    const formattedNewestDate = formatDate(newestDate);
  
    const startDate = new Date(formattedStartDate);
    const endDate = new Date(formattedEndDate);
    const oldest = new Date(formattedOldestDate);
    const newest = new Date(formattedNewestDate);
  
    oldest.setHours(0, 0, 0, 0);
    newest.setHours(23, 59, 59, 999);
  
    return startDate >= oldest && endDate <= newest;
  });
 

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
          margin: "0px 0px 30px 50px",
          marginLeft: "13%",
        }}
      >
        # Tenants Report
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
            }}
          >
            Tenants Details
          </Typography>
          <Typography
            sx={{
              color: "rgb(84, 80, 65)",
              fontSize: "20px",
              fontFamily: "Inter",
              fontWeight: "400",
              margin: "0px 0px 25px 30px",
            }}
          >
            {" "}
            From:{" "}
            <span>
              <input
                type="date"
                value={oldestDate}
                style={{
                  backgroundColor: "rgb(217, 217, 217)",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "none",
                  width: "150px", // Adjust width as needed
                }}
                onChange={(e) => setOldestDate(e.target.value)}
              />
            </span>{" "}
            To:{" "}
            <span>
              <input
                type="date"
                value={newestDate}
                style={{
                  backgroundColor: "rgb(217, 217, 217)",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "none",
                  width: "150px", // Adjust width as needed
                }}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNewestDate(e.target.value);
                }}
              />
            </span>
          </Typography>

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
                {filteredData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.TENANT_ID}</TableCell>
                    <TableCell>{data.TENANT_NAME}</TableCell>
                    <TableCell>{data.START_DATE}</TableCell>
                    <TableCell>{data.END_DATE}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default TenantsReport;
