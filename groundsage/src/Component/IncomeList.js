import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import { Navigate, useNavigate } from "react-router-dom";

const IncomeList = () => {
  const navigate = useNavigate();
  const [Income, setIncome] = useState([
    {
      Type: "Shop Rental ",
      Item: "Shop Number 01",
      Decided: "2000",
      Outstanding: "2000",
      Entered: "2000",
      isSelected: false, // Add isSelected property and set it to false
    },
    {
      Type: "Shop Rental ",
      Item: "Shop Number 01",
      Decided: "2000",
      Outstanding: "2000",
      Entered: "2000",
      isSelected: false, // Add isSelected property and set it to false
    },
    {
      Type: "Shop Rental ",
      Item: "Shop Number 01",
      Decided: "2000",
      Outstanding: "2000",
      Entered: "2000",
      isSelected: false, // Add isSelected property and set it to false
    },
    {
      Type: "Shop Rental ",
      Item: "Shop Number 01",
      Decided: "2000",
      Outstanding: "2000",
      Entered: "2000",
      isSelected: false, // Add isSelected property and set it to false
    },
  ]);
  // const [endpoint, setEndpoint] = useState(3)

  const [allselect, setAllselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [allIncomeSelected, setAllIncomeSelected] = useState(false);
  const [incomeSelect, setIncomeSelect] = useState(false);

  const maxItems = 3;
  const handleAllIncomeChange = () => {
    const newIncome = Income.map((item) => ({
      ...item,
      isSelected: !allIncomeSelected,
    }));
    setIncome(newIncome);
    setAllIncomeSelected(!allIncomeSelected);
  };

  const handleIncomeCheckboxChange = (index) => {
    const newIncome = Income.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setIncome(newIncome);
  };

  const handleIncomeDelete = () => {
    const newArray = Income.filter((item) => !item.isSelected);
    setIncome(newArray);
  };

  // Functions for handling expense list
  const handleSelectChange = () => {
    setSelect(!select);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <Box>
      {" "}
      {Income.length !== 0 && (
        <Box
          sx={{
            margin: { xs: "20px", md: "2% 18%" },
            padding: "0px 15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {incomeSelect === true ? (
            <FormControlLabel
              label="Select All"
              control={
                <Checkbox
                  sx={{ marginRight: "8px" }}
                  variant="outlined"
                  color="neutral"
                  checked={allIncomeSelected}
                  onChange={handleAllIncomeChange}
                />
              }
              sx={{
                color: "rgb(91, 94, 97)",
                marginLeft: "0px",
                fontFamily: "Poppins",
                "& .css-ahj2mt-MuiTypography-root": {
                  fontSize: "1.2rem",
                },
              }}
            />
          ) : (
            <FormControlLabel
              label="Select"
              control={
                <Checkbox
                  sx={{ marginRight: "8px" }}
                  variant="outlined"
                  color="neutral"
                  checked={incomeSelect}
                  onChange={() => setIncomeSelect(!incomeSelect)}
                />
              }
              sx={{
                color: "rgb(216, 217, 217)",
                marginLeft: "0px",
                fontFamily: "Poppins",
                "& .css-ahj2mt-MuiTypography-root": {
                  fontSize: "1.2rem",
                },
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {incomeSelect === true ? (
              <img
                src="deleteIcon.png"
                alt="delete Icon"
                style={{
                  padding: "2px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={handleIncomeDelete}
              />
            ) : (
              <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/transaction");
                }}
              />
            )}
          </Box>
        </Box>
      )}
      {Income.slice(0, showAll ? Income.length : maxItems).map(
        (item, index) => {
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: "rgb(66, 92, 90)",
                margin: { xs: "20px", md: "2% 18%" },
                border: "2px solid rgba(0, 0, 0, 0.16)",
                borderRadius: "10px",
                padding: "15px",
                display: "flex",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Center the checkboxes vertically
                    justifyContent: "center",
                  }}
                >
                  {incomeSelect === true && (
                    <Checkbox
                      variant="outlined"
                      color="neutral"
                      checked={item.isSelected}
                      onChange={() => handleIncomeCheckboxChange(index)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  background:
                    "linear-gradient(rgb(65, 93, 91), rgba(115, 135, 135, 0))",
                  padding: "3px",
                  marginLeft: "10px",
                  width: "100%", // Ensure date div takes full width
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      width: "40%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(216, 217, 217)",
                        fontWeight: "400",
                        fontSize: { xs: "18px", md: "24px" },
                        fontFamily: "Poppins",
                      }}
                    >
                      Type: {item.Type}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize: { xs: "16px", md: "20px" },
                        fontFamily: "Poppins",
                      }}
                    >
                      Item: {item.Item}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap:"wrap",
                      width: "90%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>
                      <Button
                        variant="Contained"
                        size="small"
                        sx={{
                          color: "rgb(91, 94, 97)",
                          fontFamily: "Inter",
                          background: "rgb(247, 230, 173)",
                          width: "100%", // Set width to 100%
                          borderRadius: "0px",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                          },
                        }}
                      >
                        {item.Decided}
                      </Button>
                      <Typography
                        sx={{
                          color: "rgb(216, 217, 217)",
                          marginTop: "3px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          fontSize: { xs: "13px", md: "20px" },
                        }}
                      >
                        Decided Amount
                      </Typography>
                    </div>
                    <div>
                      <Button
                        variant="Contained"
                        sx={{
                          color: "rgb(91, 94, 97)",
                          fontFamily: "Inter",
                          background: "rgb(247, 230, 173)",
                          width: "100%", // Set width to 100%
                          borderRadius: "0px",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                          },
                        }}
                      >
                        {item.Decided}
                      </Button>
                      <Typography
                        sx={{
                          color: "rgb(216, 217, 217)",
                          marginTop: "3px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          fontSize: { xs: "13px", md: "20px" },
                        }}
                      >
                        Outstanding Amount
                      </Typography>
                    </div>
                    <div>
                      <Button
                        variant="Contained"
                        sx={{
                          color: "rgb(91, 94, 97)",
                          fontFamily: "Inter",
                          background: "rgb(247, 230, 173)",
                          width: "100%", // Set width to 100%
                          borderRadius: "0px",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                          },
                        }}
                      >
                        {item.Decided}
                      </Button>
                      <Typography
                        sx={{
                          color: "rgb(216, 217, 217)",
                          marginTop: "3px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          fontSize: {xs:"13px",md:"20px"},

                        }}
                      >
                        Entered Amount
                      </Typography>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          );
        }
      )}
      {Income.length > maxItems && (
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
          onClick={toggleShowAll}
        >
          {showAll ? "Show Less..." : "Show More..."}
        </Typography>
      )}
    </Box>
  );
};

export default IncomeList;
