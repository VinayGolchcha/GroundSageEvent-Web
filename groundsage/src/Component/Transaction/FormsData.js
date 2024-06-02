import {
    Box,
    Button,
    Grid,
  } from "@mui/material";
import Others from "./Others";
import ShopRental from "./ShopRental";
import SaffSalary from "./SaffSalary";
export default function FormsData( {transactionTypeVariant} ){
    return(
        <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={4} sx={{ margin: "0% 0%" }}> 
          {transactionTypeVariant === "Shop Rental"&& <ShopRental/>}
          {transactionTypeVariant === "Others"&& <Others/>}
          {transactionTypeVariant === "Staff Salary"&& <SaffSalary/>}
          
          
        </Grid>
      </Box>
    );
}