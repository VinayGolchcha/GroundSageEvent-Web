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
import { useContext, useRef } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SaffSalary() {
  const addItemEle = useRef(null);
  const enterdAmtEle = useRef(null);
  const balancePayAmtEle = useRef(null);
  const remarkEle = useRef(null);
  const navigate = useNavigate();
  const {addTransection , isSucessTransection} = useContext(AuthContext);
  const handleSave = () => {
    const body = {
      item : addItemEle.current.value,             //shop no in string
      decided_amount : 0,  // amount due
      entered_amount : balancePayAmtEle.current.value,   // recieved amount
      outstanding_amount : balancePayAmtEle.current.value,   // outstanding amount
      remarks : remarkEle.current.value
    }
    addTransection(body);
    if(isSucessTransection){
      navigate("/transaction");
    }
  }
  return (
    <>
    <ToastContainer/>
    <Grid item lg={6} md={6} sm={6} xs={12}>
      <TextField
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
          },
          "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
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
        }}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize : {md : "20px" , xs : "18px"}
          },
        }}
        id="standard-basic"
        label="add item"
        variant="standard"
        inputRef={addItemEle}
      />
      <TextField
        type="number"
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
          },
          "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
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
            fontSize : {md : "20px" , xs : "18px"}
          },
        }}
        id="standard-basic"
        label="entered amount"
        variant="standard"
      />
      <TextField
        type="number"
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
          },
          "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
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
        }}
        inputRef={balancePayAmtEle}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize : {md : "20px" , xs : "18px"}
          },
        }}
        id="standard-basic"
        label="balance payable amount"
        variant="standard"
      />
      <TextField
        sx={{
          "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
            color: "rgb(255, 255, 255)",
          },
          "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
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
        }}
        inputRef={remarkEle}
        InputProps={{
          style: {
            color: "rgb(255, 255, 255)",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontSize : {md : "20px" , xs : "18px"}
          },
        }}
        id="standard-basic"
        label="remarks"
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
              fontWeight : "600"
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

