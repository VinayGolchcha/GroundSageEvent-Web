import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ExpensesList from "../Component/ExpensesList";
import IncomeList from "../Component/IncomeList";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const TransactionList = () => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("income");
  const [transactionData, setTransactionData] = useState([]);
  const {user , activeEventId} = useContext(AuthContext);

  const deleteTransection = async (id) => {
    try{
      const res = await axios.delete(`${process.env.REACT_APP_API_URI}/transaction/delete-transaction/${id}/${activeEventId}` ,{ headers: {
        'authorization': user?.token,
        'Accept' : 'application/json',
        "Content-Type": "application/json",
        role_id : user?.role_id
      }})
      toast.error(res?.data?.message , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        }});
    }catch(err){
      throw(err);
    }
  }

  console.log(user);
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  useEffect(() => {
    // Fetch transaction data from the API
    fetch(
      `${process.env.REACT_APP_API_URI}/transaction/fetch-all-transaction`,
      {
        method: "POST",
        headers: {
          'authorization': user?.token,
          'Accept' : 'application/json',
          "Content-Type": "application/json",
          role_id : user?.role_id
        },
        body: JSON.stringify({
          event_id: activeEventId,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched data
        setTransactionData(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, []);

  return (
    <div style={{ background: "rgb(66, 92, 90)", minHeight: "100vh" }}>
      <ToastContainer />
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
          marginTop: "-30px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
        }}
      >
        Transactions
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Button
          variant={activeButton === "income" ? "contained" : "outlined"}
          // color={activeButton === "income" ? "primary" : "default"}
          onClick={() => handleButtonClick("income")}
          sx={{
            borderColor: "rgb(247, 230, 173)",
            borderRadius: "4px",
            fontWeight: "400",
            fontFamily: "Aoboshi One",
            background:
              activeButton === "income" ? "rgb(247, 230, 173)" : "transparent", // Apply yellow background to active DOM button
            marginRight: "20px",
            color:
              activeButton === "income"
                ? "rgb(91, 94, 97)"
                : "rgb(255, 255, 255)",
            padding: "10px 30px 10px 30px",
            "&:hover": {
              color: activeButton === "income" ? "white" : "rgb(91, 94, 97)",
              background:
                activeButton === "income"
                  ? "transparent"
                  : "rgb(247, 230, 173)",
            },
          }}
          size="large"
        >
          INCOME
        </Button>
        <Button
          variant={activeButton === "expenses" ? "contained" : "outlined"}
          // color={activeButton === "expenses" ? "primary" : "default"}
          onClick={() => handleButtonClick("expenses")}
          size="large"
          sx={{
            borderColor: "rgb(247, 230, 173)",
            borderRadius: "4px",
            fontWeight: "400",
            fontFamily: "Aoboshi One",
            background:
              activeButton === "expenses"
                ? "rgb(247, 230, 173)"
                : "transparent",

            color:
              activeButton === "expenses"
                ? "rgb(91, 94, 97)"
                : "rgb(255, 255, 255)",
            padding: "10px 30px 10px 30px",
            "&:hover": {
              color: activeButton === "expenses" ? "white" : "rgb(91, 94, 97)",
              background:
                activeButton === "expenses"
                  ? "transparent"
                  : "rgb(247, 230, 173)",
            },
          }}
        >
          EXPENSE
        </Button>
      </div>
      {activeButton === "income" && <IncomeList data={transactionData?.filter((item)=> item?.tag === "income")} deleteTransection = {deleteTransection}/>}
      {activeButton === "expenses" && <ExpensesList data={transactionData?.filter((item)=> item?.tag === "expense")} deleteTransection = {deleteTransection}/>}
    </div>
  );
};

export default TransactionList;
