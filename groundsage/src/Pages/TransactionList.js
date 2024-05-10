import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ExpensesList from "../Component/ExpensesList";
import IncomeList from "../Component/IncomeList";

const TransactionList = () => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("income");
  const [transactionData, setTransactionData] = useState([]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  useEffect(() => {
    // Fetch transaction data from the API
    fetch(
      "https://groundsageevent-be.onrender.com/api/v1/transaction/fetch-transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_id: 1111,
          event_id: 1111,
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
      {activeButton === "income" && <IncomeList data={transactionData} />}
      {activeButton === "expenses" && <ExpensesList data={transactionData} />}
    </div>
  );
};

export default TransactionList;
