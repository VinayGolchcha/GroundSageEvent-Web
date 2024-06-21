import {
    Box,
    Button,
    Grid,
  } from "@mui/material";
import Others from "./Others";
import ShopRental from "./ShopRental";
import SaffSalary from "./SaffSalary";
import ExpenseOthers from "./ExpenseOthers";
export default function FormsData( {transactionTypeVariant , list} ){

    return(
        <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={4} sx={{ margin: "0% 0%" }}> 
          {transactionTypeVariant === "Shop Rental"&& <ShopRental/>}
          {list[0] === "Shop Rental" && transactionTypeVariant === "Others"&& <Others/>}
          {list[0] === "Staff Salary" && transactionTypeVariant === "Others"&& <ExpenseOthers/>}
          {transactionTypeVariant === "Staff Salary"&& <SaffSalary/>}
          
          
        </Grid>
      </Box>
    );
}