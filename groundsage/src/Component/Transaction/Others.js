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

export default function Others() {
  const addItemEle = useRef(null);
  const amtDueEle = useRef(null);
  const recievedAmtEle = useRef(null);
  const outstandingAmtEle = useRef(null);
  const remarkEle = useRef(null);
  const {addTransection , isSucessTransection} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSave = () => {
    const body = {
      item : addItemEle.current.value,             //shop no in string
      decided_amount : amtDueEle.current.value,  // amount due
      entered_amount : recievedAmtEle.current.value,   // recieved amount
      outstanding_amount : outstandingAmtEle.current.value,   // outstanding amount
      remarks : remarkEle.current.value
    }
    addTransection(body);
    if(isSucessTransection){
      navigate("/transaction");
    }
  }
  return (<>
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
        inputRef={addItemEle}
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
        inputRef={amtDueEle}
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
        label="amount due"
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
        inputRef={recievedAmtEle}
        id="standard-basic"
        label="recieved amount"
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
        inputRef={outstandingAmtEle}
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
        label="outstanding amount (if any)"
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
        inputRef={remarkEle}
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

