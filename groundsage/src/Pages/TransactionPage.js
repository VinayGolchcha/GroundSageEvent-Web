import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TransactionTypeVari from "../Component/Transaction/TransactionTypeVari";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

export default function TransactionPage() {
  const navigate = useNavigate();
  const {transectionTag , setTransectionTag} = useContext(AuthContext);
  const containedStyle = {
    backgroundColor: "rgb(247, 230, 173)",
    color: "rgb(91, 94, 97)",
    fontWeight: "600",
  };
  const outlinedStyle = {
    color: "rgb(255, 255, 255)",
    border: "1px solid rgb(254, 240, 180)",
  };
  // useEffect(()=> {
  //   setTransectionTag("income")
  // },[transectionTag])
  const [transactions, setTransactions] = useState([{
    type: "income",
    vari: "contained",
    list : ["Shop Rental" , "Others"]
  },
  {
    type: "expense",
    vari: "outlined",
    list : ["Staff Salary" , "Others"]
  }]);

  const handleButtonChange = (index) => {
    // changing the button style based on the selection 
    const newList = [...transactions];
    if (index === 0) {
      newList[index].vari = "contained";
      newList[1].vari = "outlined";
      setTransectionTag("expense");
    } else {
      newList[index].vari = "contained";
      newList[0].vari = "outlined";
      setTransectionTag("income");
    }
    setTransactions(newList);
    console.log(transectionTag);
  };
  return (
    <Box
    sx={{
      backgroundColor: "rgb(66, 92, 90)",
      // height: { ...[eventList.length === 0 ? "100vh" : "auto"] },
      minHeight: "100vh"
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
    <Box sx={{ backgroundColor: "rgb(66, 92, 90)" }}>
      <Typography
        variant="h3"
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          padding: "20px 0px",
          fontWeight : "600", fontFamily : "inter",
          textShadow: "0 6px rgba(81,67,21,0.8)",
          fontSize: { xs: "30px", sm: "40px", md: "56px" },
        }}
      >
        Transactions
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}
      >
        <Button
          variant={
            transactions[1].type === "expense" ? "outlined" : "contained"
          }
          onClick={() => handleButtonChange(0)}
          sx={{
            ...(transactions[0].vari === "contained"
              ? {
                  "&:hover": {
                    border: "1px solid rgb(254, 240, 180)",
                    backgroundColor : "rgb(247, 230, 173)"
                  },
                  ...containedStyle
                }
              : { ...outlinedStyle, }),
            margin: "0px 20px",
            height : "60px",
            width : { lg : "150px" , md : "150px" , sm : "110px" , xs : "100x"},
            fontSize : "18px"
          }}
        >
          INCOME
        </Button>
        <Button
          variant={transactions[0].type === "income" ? "outlined" : "contained"}
          onClick={() => handleButtonChange(1)}
          sx={{
            ...(transactions[1].vari === "contained"
              ? {
                  "&:hover": {
                    border: "1px solid rgb(254, 240, 180)",
                    backgroundColor : "rgb(247, 230, 173)"
                  },
                  ...containedStyle

                }
              : { ...outlinedStyle }),
            margin: "0px 20px",
            height : "60px",
            width : { lg : "150px" , md : "150px" , sm : "110px" , xs : "100x"},
            fontSize : "18px"
          }}
        >
           EXPENSE
        </Button>
      </Box>
      {/* component for showing the form based on the selected button */}
      <TransactionTypeVari transactions = {transactions}/>
      
    </Box>
    </Box>
  );
}
