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
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "20px 0px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(247, 230, 173) ",
                color: "rgb(91, 94, 97)",
                minWidth: "200px",
                fontSize : "20px",
                fontWeight : "600"
              }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    );
}