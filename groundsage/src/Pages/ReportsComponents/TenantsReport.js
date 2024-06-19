import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
        ...(props.sx || {}),
      }}
    />
  );
};

const TenantsReport = () => {
  const navigate = useNavigate();

  const heading = ["TENANT ID", "TENANT NAME", "START DATE", "END DATE"];

  const [oldestDate, setOldestDate] = useState("");
  const [newestDate, setNewestDate] = useState("");
  const [tenantsData, setTenantsData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTenantsData = async () => {
      if (!oldestDate || !newestDate) return;

      try {
        const response = await axios.post(
          "https://groundsageevent-be.onrender.com/api/v1/transaction/fetch-tenants-report-data",
          {
            event_id: 1112,
            from_date: oldestDate,
            to_date: newestDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": user?.token,
              role_id: user?.role_id,
            },
          }
        );

        if (response.data.success) {
          setTenantsData(response.data.data);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTenantsData();
  }, [oldestDate, newestDate]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredData = tenantsData.filter((item) => {
    if (!oldestDate || !newestDate) return true;

    const startDate = formatDate(item.start_date);
    const endDate = formatDate(item.end_date);
    const oldest = new Date(oldestDate);
    const newest = new Date(newestDate);

    return (
      startDate >= oldest &&
      startDate <= newest &&
      endDate >= oldest &&
      endDate <= newest
    );
  });

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
          fontSize: { xs: "30px", sm: "40px", md: "56px" },
          fontFamily: "Inter",
          fontWeight: "700",
          marginTop: "-75px",
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
          margin: "0px 0px 30px 50px",
          marginLeft: "13%",
        }}
      >
        # Tenants Report
      </Typography>
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
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "rgb(84, 80, 65)",
              fontSize: "30px",
              fontFamily: "Inter",
              fontWeight: "600",
              margin: "0px 0px 0px 10px",
              fontSize : {xs : "20px" , sm : "20px"}
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
                  width: "150px",
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
                  width: "150px",
                }}
                onChange={(e) => setNewestDate(e.target.value)}
              />
            </span>
          </Typography>

          <TableContainer>
            <Table size="medium" sx={{ border: "none" }}>
              <TableHead>
                <TableRow sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.5)" }}>
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
                        {h}
                        {idx === 0 && (
                          <img
                            src="../../Images/icon.png"
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
              <TableBody>
                {tenantsData?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.tenant_id}</TableCell>
                    <TableCell>{data.tenant_name}</TableCell>
                    <TableCell>{data.start_date}</TableCell>
                    <TableCell>{data.end_date}</TableCell>
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
