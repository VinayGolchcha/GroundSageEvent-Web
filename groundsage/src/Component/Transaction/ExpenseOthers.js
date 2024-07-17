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
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExpenseOthers() {
  const addItemEle = useRef(null);
  const enterdAmtEle = useRef(null);
  const balancePayAmtEle = useRef(null);
  const remarkEle = useRef(null);
  const navigate = useNavigate();
  const {activeEventId , user , transectionType , isSucessTransection , setIsSucessTransection} = useContext(AuthContext);
  useEffect(() => {
    console.log("successfulltransection" , isSucessTransection);
  },[])


  const addTransection = async (body) => {
    const newbody = {
      ...body,
      event_id: activeEventId,
      type: transectionType,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/transaction/add-transaction`,
        newbody,
        {
          headers: {
            authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      toast.success("Transection added successfully", {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      navigate("/transactions");
    } catch (err) {
      const errors = err?.response?.data?.errors;
      errors?.forEach((element) => {
        toast.error(element?.msg, {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          },
        });
      });
    }
  };
  const handleSave = () => {
    const body = {
      item : addItemEle.current.value,//shop no in string
      decided_amount : 0,  // amount due
      entered_amount : enterdAmtEle.current.value,   // recieved amount
      outstanding_amount : balancePayAmtEle.current.value,   // outstanding amount
      remarks : remarkEle.current.value,
      tag : "expense"
    }
    addTransection(body);
  }


  return (
    <>
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

          width: "100%",
          margin: "10px 0px ",
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
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
        id="standard-basic"
        label="Add item"
        variant="standard"
        inputRef={addItemEle}
      />
      <TextField
        type="number"
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
            fontSize: {  xs: "17px", md: "20px" }, // Set label font size here
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
          width: "70%",
          margin: "10px 0px ",
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
        }}
        inputRef={enterdAmtEle}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize: { xs: "17px", md: "20px" },
          },
        }}
        id="standard-basic"
        label="Total expense ₹"
        variant="standard"
      />
      <TextField
        type="number"
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
          width: "70%",
          margin: "10px 0px ",
          "& .MuiInputBase-input": {
            fontSize: { xs: "17px", md: "20px" }, // Set input font size here
          },
        }}
        inputRef={balancePayAmtEle}
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
        label="Balance payable amount ₹"
        variant="standard"
      />
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
        inputRef={remarkEle}
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
  );
}

