import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Component/Loading";

const icons = [
  "Group 33700.png",
  "Group 33712.png",
  "Group 33715.png",
  "Group 33716.png",
  "Group 33713.png",
  "Group 33709.png",
];

const iconsPath = [
  "/incomereport",
  "/expensereport",
  "/outstandingreport",
  "/netpayablereport",
  "/tenantsreport",
  "/occupancyreport",
];

const Reports = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("year");
  const [selectedPieOption, setSelectedPieOption] = useState("2024");
  const { user, activeEventId } = useContext(AuthContext);
  const [yearlyReport, setYearlyReport] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultData, setDefaultData] = useState([]);

  const fetchYearlyReportData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/transaction/fetch-all-years-data`,
        {
          flag: chartType,
          type: "income",
          event_id: activeEventId,
        },
        {
          headers: {
            authorization: `${user?.token}`,
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );

      const data = res?.data?.data?.map((item) => ({
        [chartType === "year" ? "year" : "month"]:
          chartType === "year" ? item.year : item?.month?.split(" ")[0],
        income: item.total,
      }));
      setYearlyReport(data);
    } catch (err) {
      console.log(err);
      // toast.error(err?.response?.data?.message, {
      //   style: {
      //     fontSize: "16px",
      //     fontFamily: "Inter",
      //     fontWeight: "600",
      //     color: "rgb(66, 92, 90)",
      //   },
      // });
    }
  };

  const fetchYearlyData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/transaction/fetch-yearly-data`,
        {
          year: selectedPieOption,
          type: "income",
          event_id: activeEventId,
        },
        {
          headers: {
            authorization: `${user?.token}`,
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );

      const data = res?.data?.data;
      setPieChartData(data);
      console.log(data);
      const newExpenseData = [
        {
          name: data.shop_rental_total ? "Shop Rental" : "Staff Salary",
          value: data.shop_rental_total || data.staff_salary_total,
          fill: "rgb(236, 219, 163)",
        },
        { name: "Others", value: data.others_total, fill: "rgb(63, 128, 101)" },
      ];
      const selectedData = yearlyReport?.find(
        (item) =>
          item[chartType === "year" ? "year" : "month"] === selectedPieOption
      );
      if (selectedData) {
        newExpenseData[0].value =
          (selectedData.income * parseInt(newExpenseData[0].value)) /
          parseInt(data.total);
        newExpenseData[1].value =
          (selectedData.income * parseInt(newExpenseData[1].value)) /
          parseInt(data.total);
      } else {
        newExpenseData[0].value =
          (data.total * parseInt(newExpenseData[0].value)) /
          parseInt(data.total);
        newExpenseData[1].value =
          (data.total * parseInt(newExpenseData[1].value)) /
          parseInt(data.total);
      }

      setExpenseData(newExpenseData);
    } catch (err) {
      toast.error(err?.response?.data?.message, {
        style: {
          fontSize: "16px",
          fontFamily: "Inter",
          fontWeight: "600",
          color: "rgb(66, 92, 90)",
        },
      });
    }
  };
  useEffect(() => {
    fetchYearlyReportData();
    setIsLoading(false);
  }, [chartType]);

  useEffect(() => {
    fetchYearlyData();
    setIsLoading(false);
  }, [selectedPieOption]);

  const handlePieOptionChange = (event) => {
    setSelectedPieOption(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const CustomIcon = (
    <img
      src="../../Images/image 87.png"
      alt="Icon"
      style={{
        margin: "0px 5px 0px -10px",
      }}
    />
  );

  const data = yearlyReport;
  const xAxisDataKey = chartType === "year" ? "year" : "month";
  const pieOptions = yearlyReport?.map((option) =>
    chartType === "year" ? option.year : option?.month?.split(" ")[0]
  );
  const renderLegend = (value, entry) => {
    // Customize the style of the legend text here
    const textStyle = {
      color: "rgb(34, 34, 34)", // Change 'blue' to the color you desire
      fontSize: "14px", // Adjust font size if needed
      fontFamily: "Inter",
      fontWeight: "500",
    };

    return <span style={textStyle}>{value}</span>;
  };
  // Debugging: Log expenseData to ensure it's being updated correctly
  useEffect(() => {
    console.log("Expense Data:", expenseData);
  }, [expenseData]);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div
        style={{
          background: "rgb(66, 92, 90)",
          padding: "20px",
        }}
      >
        <ToastContainer />
        <img
          src="../../Images/arrow-left.png"
          alt="Share"
          style={{
            cursor: "pointer",
            width: "45px",
            marginBottom: "20px",
          }}
          onClick={() => {
            navigate(-1);
          }}
        />
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            fontSize: { xs: "30px", sm: "40px", md: "56px" },
            fontFamily: "Inter",
            fontWeight: "700",
            marginTop: { xs: "0px", md: "-40px" },
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)",
            marginBottom: "20px",
          }}
        >
          Reports
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            margin: "0px 5% 5px 5%",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              padding: "20px",
              width: { lg: "45%" },
              marginBottom: { xs: "20px", md: "0px" },
              marginRight: { xs: "0px", md: "20px" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "Inter",
                  color: "rgb(34, 34, 34)",
                  fontWeight: "600",
                  fontSize: { xs: "20px", md: "25px" },
                  margin: "-10px 10px 20px 0px",
                }}
              >
                Total Income
              </Typography>
              <Box
                sx={{
                  marginLeft: "20px",
                  minWidth: "fit-content",
                  background: "rgba(217, 217, 217, 0.3)",
                  marginBottom: "25px",
                }}
              >
                <Select
                  value={chartType}
                  onChange={handleChartTypeChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiSelect-root": {
                      border: "none !important", // Remove border with important flag
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important", // Remove border for outlined style
                    },
                    color: "rgb(0, 0, 0)",
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: "16px",
                    background: "rgba(217, 217, 217, 0.3)",
                    "&:focus": {
                      backgroundColor: "rgba(217, 217, 217, 0.3)", // Adjust focus background if needed
                    },
                  }}
                  IconComponent={() => CustomIcon}
                >
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ width: "100%", height: "40vh" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey={xAxisDataKey} />
                  <YAxis
                    label={{
                      value: "Amount (in thousands)",
                      angle: -90,
                      position: "insideLeft",
                      dy: -10,
                      style: {
                        textAnchor: "middle",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        fill: "rgb(189, 189, 189)",
                        fontSize: "14px",
                      },
                    }}
                  />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="top"
                    align="left"
                    wrapperStyle={{ top: -30 }}
                  />

                  <Bar dataKey="income" fill="rgb(63, 128, 101)" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Card sx={{ width: { xs: "100%", md: "49%" } }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "Inter",
                    color: "rgb(34, 34, 34)",
                    fontWeight: "600",
                    fontSize: { xs: "18px", md: "22px" },
                    marginLeft: "5%",
                  }}
                >
                  Income chart basis on Type
                </Typography>
                <Box sx={{ marginLeft: "20px", minWidth: "fit-content" }}>
                  <Select
                    value={selectedPieOption}
                    onChange={handlePieOptionChange}
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiSelect-root": {
                        border: "none !important", // Remove border with important flag
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none !important", // Remove border for outlined style
                      },
                      color: "rgb(0, 0, 0)",
                      fontFamily: "Inter",
                      fontWeight: "500",
                      fontSize: "16px",
                      background: "rgba(217, 217, 217, 0.3)",
                      "&:focus": {
                        backgroundColor: "rgba(217, 217, 217, 0.3)", // Adjust focus background if needed
                      },
                    }}
                    IconComponent={() => CustomIcon}
                  >
                    {pieOptions?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <PieChart width={500} height={300}>
                  <RechartsTooltip position="top" />
                  <RechartsLegend
                    verticalAlign="top"
                    height={46}
                    align="left"
                    formatter={renderLegend} // Assign the custom formatter function
                    // wrapperStyle={{ left: -100 }}
                  />
                  <Pie
                    dataKey="value"
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {expenseData?.map((entry, index) => (
                      <Cell
                        key={`slice-${index}`}
                        data={entry}
                        fill={entry.fill}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "rgb(155, 181, 199)",
              textAlign: "center",
              fontSize: { xs: "24px", md: "36px" },
              fontFamily: "Aoboshi One",
              fontWeight: "400",
              marginTop: "20px",
            }}
          >
            See All Reports
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              margin: "25px 9% 5px 8%",
            }}
          >
            {icons?.map((icon, idx) => {
              return (
                <Box
                  component="img"
                  key={idx}
                  src={`../../../Images/${icon}`}
                  alt="Icon"
                  sx={{
                    height: { xs: "12vh", md: "9vw" },
                    // width: { xs: "100px" },
                    cursor: "pointer",
                    margin: "5px",
                  }}
                  onClick={() => {
                    navigate(`${iconsPath[idx]}`);
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </div>
    );
  }
};

export default Reports;
