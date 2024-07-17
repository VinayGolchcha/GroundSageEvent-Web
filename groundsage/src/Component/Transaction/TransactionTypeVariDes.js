import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import FormsData from "./FormsData";
import { AuthContext } from "../../ContextApi/AuthContext";
export default function TransactionTypeVariDes({list}){

    const [transactionTypeVariant , setTransactionTypeVariant] = useState(list[0]);
    const {setTransectionType} = useContext(AuthContext);
    useEffect(() => {
      setTransactionTypeVariant(list[0]); // Reset to the first item when list changes
      setTransectionType(list[0]);
    }, [list]);
    const handleClick = (val) => {
        setTransactionTypeVariant(val);
        setTransectionType(val);
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
            {transactionTypeVariant === list[0] ? (<Box sx={{display : "flex" , alignItems :"center"}} onClick = {() => handleClick(list[0])}>
            <img
              src="Ellipse-yellow.png"
              style={{ margin: "0px 5px", height: "20px", width: "20px"  , cursor : "pointer"}}
              alt="Ellipse"
            /> 
            <Typography  variant="h5" sx={{ color: "rgb(255, 238, 179)" , cursor : "pointer" , fontSize :  {lg : "1.6rem" , md : "1.6rem" , sm : "1.6rem" , xs : "1.1rem"} }}>
            {list[0]}
          </Typography></Box>)
            : ( <Box Box sx={{display : "flex" , alignItems :"center"}} onClick = {() => handleClick(list[0])}><img
            src="Ellipse-gray.png"
            style={{ margin: "0px 5px", height: "20px", width: "20px" , cursor : "pointer" }}
            alt="Ellipse"
          />
          <Typography onClick = {() => handleClick(list[0])} variant="h5" sx={{ color: "rgb(198, 208, 217)" , cursor : "pointer" , fontSize :  {lg : "1.6rem" , md : "1.6rem" , sm : "1.6rem" , xs : "1.1rem"}}}>
            {list[0]}
          </Typography>
          </Box>)}
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
        {transactionTypeVariant === list[1] ? (<Box sx={{display : "flex" , alignItems :"center"}} onClick = {() => handleClick(list[1])}>
            <img
              src="Ellipse-yellow.png"
              style={{ margin: "0px 5px", height: "20px", width: "20px" , cursor : "pointer"}}
              alt="Ellipse"
            /> 
            <Typography onClick = {() => handleClick(list[1])} variant="h5" sx={{ color: "rgb(255, 238, 179)" , cursor : "pointer" , fontSize : {lg : "1.6rem" , md : "1.6rem" , sm : "1.6rem" , xs : "1.1rem"}}}>
            {list[1]}
          </Typography></Box>)
            : ( <Box sx={{display : "flex" , alignItems :"center"}} onClick = {() => handleClick(list[1])}><img
            src="Ellipse-gray.png"
            style={{ margin: "0px 5px", height: "20px", width: "20px" ,cursor : "pointer" }}
            alt="Ellipse"
          />
          <Typography onClick = {() => handleClick(list[1])} variant="h5" sx={{ color: "rgb(198, 208, 217)" , cursor : "pointer" , fontSize :  {lg : "1.6rem" , md : "1.6rem" , sm : "1.6rem" , xs : "1.1rem"}}}>
            {list[1]}
          </Typography>
          </Box>)}
          </Box>
        </Box>
        <FormsData transactionTypeVariant = {transactionTypeVariant}  list = {list}/>
      </>
    );
}