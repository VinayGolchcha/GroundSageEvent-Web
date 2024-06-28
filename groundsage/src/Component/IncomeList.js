import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import { Navigate, useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { toast } from "react-toastify";

const IncomeList = ({data , deleteTransection }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [Income, setIncome] = useState([]);
  // const [endpoint, setEndpoint] = useState(3)
  useEffect(() => {
    const newData = data?.map((item) => ({...item , isSelected : false}))
    setIncome(newData);
  },[data])

  const [allselect, setAllselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [allIncomeSelected, setAllIncomeSelected] = useState(false);
  const [incomeSelect, setIncomeSelect] = useState(false);

  const maxItems = 3;
  const handleAllIncomeChange = () => {
    const newIncome = Income?.map((item) => ({
      ...item,
      isSelected: !allIncomeSelected,
    }));
    setIncome(newIncome);
    setAllIncomeSelected(!allIncomeSelected);
  };

  const handleIncomeCheckboxChange = (index) => {
    const newIncome = Income?.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setIncome(newIncome);
  };

  const handleIncomeDelete = () => {
    const newArray = Income?.filter((item) => !item.isSelected);
    const deletedItem = Income?.filter((item) => item.isSelected);
    if(deletedItem?.length >0){

      console.log(deletedItem , deletedItem[0]?._id);
      deleteTransection(deletedItem[0]?._id);
    }
    setIncome(newArray);
  };
  const handleDeleteOpen = () => {
    const ele = Income?.filter((item) => item?.isSelected === true);
    if(ele?.length === 0){
      toast.warning("Please select the transaction to delete" , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      return;
    }
    handleOpen();
  }

  // Functions for handling expense list
  const handleSelectChange = () => {
    setSelect(!select);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const refreshPage = () => {
    setSelect(false);
    const newIncomeList = Income.map((item) => ({
      ...item,
      isSelected: false,
    }));
    setIncome(newIncomeList);
    setAllselect(false);
    setAllIncomeSelected(false);
    setIncomeSelect(false);
  }

  const forrmattedDate = (data) => {
    let date = new Date(data);
    const array = date.toString().split(" ");
    date = array.slice(1,4).join(" ");
    return date
  }

  function toTitleCase(str) {
    return str
      .split(' ')              // Split the string into an array of words
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()  // Capitalize the first letter of each word
      )
      .join(' ');              // Join the words back into a single string
  }

  return (
    <Box>
      <ConfirmDelete open={open} handleClose={handleClose} handleIncomeDelete ={handleIncomeDelete}/>
      {" "}
      <div style={{width : "100%"}}  onClick = {refreshPage}></div>
    
      {Income?.length !== 0 ? (
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
                color: "rgb(216, 217, 217)",
                marginLeft: "0px",
                fontFamily: "Poppins",
                "& .MuiTypography-root": {
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
                "& .MuiTypography-root": {
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
                onClick={handleDeleteOpen}
              />
            ) : (
              <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/create-transaction");
                }}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            </Box>
      )}
      {Income?.slice(0, showAll ? Income?.length : maxItems).map(
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
                <div style={{ display: "flex" , alignContent : "center"}}>
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
                      Type: {toTitleCase(item?.type)}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize: { xs: "16px", md: "20px" },
                        fontFamily: "Poppins",
                      }}
                    >
                    Item: {(item?.type === "shop rental" || item?.type === "Shop Rental") ? `Shop Number ${item.item}` : item.item}


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
                    <div style={{textAlign : "center", alignContent : "center"}}>
                      <Button
                        variant="Contained"
                        size="small"
                        sx={{
                          color: "rgb(91, 94, 97)",
                          fontFamily: "Inter",
                          background: "rgb(247, 230, 173)",
                          width: "20px", // Set width to 100%
                          borderRadius: "0px",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                          },
                        }}
                      >
                        {item.decided_amount} 
                      </Button>
                      <Typography
                        sx={{
                          color: "rgb(216, 217, 217)",
                          marginTop: "3px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          fontSize: { xs: "13px", md: "15px" },
                        }}
                      >
                        Amount Due ₹
                      </Typography>
                    </div>
                    <div style={{textAlign : "center" , alignContent : "center"}}>
                      <Button
                        variant="Contained"
                        sx={{
                          color: "rgb(91, 94, 97)",
                          fontFamily: "Inter",
                          background: "rgb(247, 230, 173)",
                          textAlign : "center",
                          width: "20px", // Set width to 100%
                          borderRadius: "0px",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                          },
                        }}
                      >
                        {item.outstanding_amount} 
                      </Button>
                      <Typography
                        sx={{
                          color: "rgb(216, 217, 217)",
                          marginTop: "3px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          fontSize: { xs: "13px", md: "15px" },
                        }}
                      >
                        Outstanding Amount ₹
                      </Typography>
                    </div>
                    <div style={{textAlign : "center", alignContent : "center"}}>
                      <Button
                        variant="Contained"
                        sx={{
                          color: "rgb(91, 94, 97)",
                          fontFamily: "Inter",
                          background: "rgb(247, 230, 173)",
                          width: "20px",
                           // Set width to 100%
                          borderRadius: "0px",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                          },
                        }}
                      >
                        {item.entered_amount} 
                      </Button>
                      <Typography
                        sx={{
                          color: "rgb(216, 217, 217)",
                          marginTop: "3px",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          fontSize: {xs:"13px",md:"15px"},

                        }}
                      >
                        Received Amount ₹
                      </Typography>
                    </div>
                    <Typography
                      sx={{
                        color: "rgb(254, 240, 180)",
                        fontSize: {lg : "0.9rem", md : "0.9rem" , sm : "0.9rem" , xs : "14px"},
                        fontFamily: "Poppins",
                        textAlign: "right",
                      }}
                    >
                      {forrmattedDate(item?.created_at)}
                    </Typography>
                  </div>
                </div>
              </Box>
            </Box>
          );
        }
      )}
      {Income?.length > maxItems && (
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
