import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TransactionTypeVariDes from "./TransactionTypeVariDes";

export default function TransactionTypeVari({ transactions }) {
  return (
    <Box sx={{ margin: "15px 12%" }}>
      {transactions[0].type === "expense" && transactions[0].vari === "outlined" ? (
       <TransactionTypeVariDes list = {transactions[0].list}/>
      ) : (
        transactions[1].type === "income" && transactions[1].vari === "outlined" && (
          <TransactionTypeVariDes list = {transactions[1].list}/>
        )
      )}
    </Box>
  );
}