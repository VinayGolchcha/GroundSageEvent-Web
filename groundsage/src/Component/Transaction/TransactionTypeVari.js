import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TransactionTypeVariDes from "./TransactionTypeVariDes";

export default function TransactionTypeVari({ transactions }) {
  console.log(transactions);
  return (
    <Box sx={{ margin: "0px 12%" }}>
      {transactions[1].type === "expense" && transactions[0].vari === "contained" ? (
       <TransactionTypeVariDes list = {transactions[0].list}/>
      ) : (
        transactions[0].type === "income" && transactions[1].vari === "contained" && (
          <TransactionTypeVariDes list = {transactions[1].list}/>
        )
      )}
    </Box>
  );
}
