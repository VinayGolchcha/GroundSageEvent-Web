import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormsData from "./FormsData";
export default function   TransactionTypeVariDes({list}){
    const [transactionTypeVariant , setTransactionTypeVariant] = useState(list[0]);
    useEffect(() => {
      setTransactionTypeVariant(list[0]); // Reset to the first item when list changes
    }, [list]);
    const handleClick = (val) => {
        setTransactionTypeVariant(val)
    }
    return(
        <>
        <Box sx={{ display: "flex", margin: "10px 0px" }}>
        
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {transactionTypeVariant === list[0] ? (<>
            <img
              src="Ellipse-yellow.png"
              style={{ margin: "0px 5px", height: "20px", width: "20px" }}
              alt="Ellipse"
            /> 
            <Typography onClick = {() => handleClick(list[0])} variant="h5" sx={{ color: "rgb(255, 238, 179)" , cursor : "pointer" }}>
            {list[0]}
          </Typography></>)
            : ( <><img
            src="Ellipse-gray.png"
            style={{ margin: "0px 5px", height: "20px", width: "20px" }}
            alt="Ellipse"
          />
          <Typography onClick = {() => handleClick(list[0])} variant="h5" sx={{ color: "rgb(198, 208, 217)" , cursor : "pointer"}}>
            {list[0]}
          </Typography>
          </>)}
          </Box>
          
        </Box>
        <Box sx={{ display: "flex", margin: "10px 0px" }}>
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
        {transactionTypeVariant === list[1] ? (<>
            <img
              src="Ellipse-yellow.png"
              style={{ margin: "0px 5px", height: "20px", width: "20px" }}
              alt="Ellipse"
            /> 
            <Typography onClick = {() => handleClick(list[1])} variant="h5" sx={{ color: "rgb(255, 238, 179)" , cursor : "pointer" }}>
            {list[1]}
          </Typography></>)
            : ( <><img
            src="Ellipse-gray.png"
            style={{ margin: "0px 5px", height: "20px", width: "20px" }}
            alt="Ellipse"
          />
          <Typography onClick = {() => handleClick(list[1])} variant="h5" sx={{ color: "rgb(198, 208, 217)" , cursor : "pointer" }}>
            {list[1]}
          </Typography>
          </>)}
          </Box>
        </Box>
        <FormsData transactionTypeVariant = {transactionTypeVariant}/>
      </>
    );
}