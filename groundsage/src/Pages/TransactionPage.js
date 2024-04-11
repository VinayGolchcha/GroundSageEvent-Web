import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TransactionTypeVari from "../Component/Transaction/TransactionTypeVari";

export default function TransactionPage() {
  const containedStyle = {
    backgroundColor: "rgb(247, 230, 173)",
    color: "rgb(91, 94, 97)",
    fontWeight: "600",
  };
  const outlinedStyle = {
    color: "rgb(255, 255, 255)",
    border: "1px solid rgb(254, 240, 180)",
  };
  const [transactions, setTransactions] = useState([{
    type: "expense",
    vari: "outlined",
    list : ["Shop Rental" , "Others"]
  },
  {
    type: "income",
    vari: "contained",
    list : ["Staff Salary" , "Others"]
  }]);
  
  const handleButtonChange = (index) => {
    const newList = [...transactions];
    if (index === 0) {
      newList[index].vari = "outlined";
      newList[1].vari = "contained";
    } else {
      newList[index].vari = "outlined";
      newList[0].vari = "contained";
    }
    setTransactions(newList);
  };
  return (
    <Box sx={{ backgroundColor: "rgb(66, 92, 90)" }}>
      <Typography
        variant="h3"
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          padding: "20px 0px",
          fontWeight : "600", fontFamily : "inter",
          textShadow: "0 6px rgba(81,67,21,0.8)"
        }}
      >
        Transactions
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}
      >
        <Button
          variant={
            transactions[0].type === "expense" ? "outlined" : "contained"
          }
          onClick={() => handleButtonChange(0)}
          sx={{
            ...(transactions[0].vari === "outlined"
              ? {
                  "&:hover": {
                    border: "1px solid rgb(254, 240, 180)",
                  },
                  ...outlinedStyle,
                }
              : { ...containedStyle }),
            margin: "0px 20px",
            height : "60px",
            width : "200px",
            fontSize : "20px"
          }}
        >
          EXPENSE
        </Button>
        <Button
          variant={transactions[1].type === "income" ? "outlined" : "contained"}
          onClick={() => handleButtonChange(1)}
          sx={{
            ...(transactions[1].vari === "outlined"
              ? {
                  "&:hover": {
                    border: "1px solid rgb(254, 240, 180)",
                  },
                  ...outlinedStyle,
                }
              : { ...containedStyle }),
            margin: "0px 20px",
            height : "60px",
            width : "200px",
            fontSize : "20px"
          }}
        >
          INCOME
        </Button>
      </Box>
      <TransactionTypeVari transactions = {transactions}/>
      
    </Box>
  );
}
