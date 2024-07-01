import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Others() {
  const[isLoading , setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [amtDue , setAmtDue] = useState(0);
  const [recAmt , setRecAmt] = useState(0);
  const [outAmt , setOutAmt] = useState(0);
  const addItemEle = useRef(null);
  const amtDueEle = useRef(null);
  const recievedAmtEle = useRef(null);
  const outstandingAmtEle = useRef(null);
  const remarkEle = useRef(null);
  const {addTransection , isSucessTransection , user , activeEventId} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSave = () => {
    if(parseInt(recievedAmtEle.current.value) >  parseInt(amtDueEle.current.value)){
      console.log(true);
      toast.warning("Received amount, should be less than the Due amount ₹" , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      return;
    }else{
      const body = {
        item : addItemEle.current.value,             //shop no in string
        decided_amount : parseInt(amtDueEle.current.value),  // amount due
        entered_amount : parseInt(recievedAmtEle.current.value),   // recieved amount
        outstanding_amount : outAmt,   // outstanding amount
        remarks : remarkEle.current.value,
        tag : "income"
      }
      addTransection(body);
      fecthTransections()
    }
   
    
    if(isSucessTransection){
      navigate("/transactions");
    }
    
  }

  const fecthTransections = () => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URI}/transaction/fetch-all-transaction`,
      {
        method: "POST",
        headers: {
          authorization: user?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
          role_id: user?.role_id,
        },
        body: JSON.stringify({
          event_id: activeEventId,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched data
        setTransactionData(data.data);
        console.log(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching transaction data:", error);
      });
  };

  useEffect(() => {
    setOutAmt(amtDue - recAmt);
  }, [amtDue, recAmt]);

  const handleAmtDueChange = (e) => {
    setAmtDue(Number(e.target.value));
  };

  const handleRecAmtChange = (e) => {
    setRecAmt(Number(e.target.value));
  };
  return (<>
  <ToastContainer/>
    <Grid item lg={6} md={6} sm={6} xs={12}>
      <TextField
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
            fontSize: {  xs: "17px", md: "20px" }, 
          },
          "& .MuiInput-underline::before": {
            borderBottom: "1px solid rgb(188, 189, 163)",
          },
          "& label.Mui-focused": {
            color: "rgb(255, 255, 255)", // Color of the label when focused
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
          },
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
          width: "100%",
          margin: "10px 0px ",
        }}
        inputRef={addItemEle}
        
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        id="standard-basic"
        label="Add item"
        variant="standard"
      />
      <TextField
        type="number"
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
          "& .MuiInput-underline::before": {
            borderBottom: "1px solid rgb(188, 189, 163)",
          },
          "& label.Mui-focused": {
            color: "rgb(255, 255, 255)", // Color of the label when focused
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
          },
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
          width: "70%",
          margin: "10px 0px ",
        }}
        inputRef={amtDueEle}
        onChange={handleAmtDueChange}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        id="standard-basic"
        label="Amount due ₹"
        variant="standard"
      />
      <TextField
        type="number"
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
          "& .MuiInput-underline::before": {
            borderBottom: "1px solid rgb(188, 189, 163)",
          },
          "& label.Mui-focused": {
            color: "rgb(255, 255, 255)", // Color of the label when focused
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
          },
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
          width: "70%",
          margin: "10px 0px ",
        }}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" }, 
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize: { xs: "17px", md: "20px" }, 
          },
        }}
        inputRef={recievedAmtEle}
        onChange={handleRecAmtChange}
        id="standard-basic"
        label="Received amount ₹"
        variant="standard"
      />
      <TextField
        type="number"
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
          "& .MuiInput-underline::before": {
            borderBottom: "1px solid rgb(188, 189, 163)",
          },
          "& label.Mui-focused": {
            color: "rgb(255, 255, 255)", // Color of the label when focused
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
          },
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
          width: "70%",
          margin: "10px 0px ",
        }}
        inputRef={outstandingAmtEle}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        aria-readonly
        value={outAmt}
        id="standard-basic"
        label="Outstanding amount (if any) ₹"
        variant="standard"
      />
      <TextField
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
          "& .MuiInput-underline::before": {
            borderBottom: "1px solid rgb(188, 189, 163)",
          },
          "& label.Mui-focused": {
            color: "rgb(255, 255, 255)", // Color of the label when focused
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
          },
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
          width: "100%",
          margin: "10px 0px ",
        }}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        inputRef={remarkEle}
        id="standard-basic"
        label="Remarks"
        variant="standard"
      />

    </Grid>
    <Grid item xs={12}>
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
              fontWeight : "600",
              width : { lg : "200px" , md : "200px" , sm : "170px" , xs : "150x"},
              fontSize : {lg : "20px" , md : "20px" , sm : "20px" , xs : "16px"},
              "&:hover": {
                backgroundColor: "rgb(247, 230, 173) "
              }
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
        </Grid>
        </>
  );}

