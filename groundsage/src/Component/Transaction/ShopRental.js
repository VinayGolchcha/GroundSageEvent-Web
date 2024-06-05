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
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShopRental(){
  const addItemEle = useRef(null);
  const amtDueEle = useRef(null);
  const recievedAmtEle = useRef(null);
  const outstandingAmtEle = useRef(null);
  const navigate = useNavigate();
  const remarkEle = useRef(null);
  const {addTransection , activeEventId , user , isSucessTransection} = useContext(AuthContext);
  const [shopNo , setShopNo] = useState([]);
  const handleSave = () => {
    const body = {

      item : addItemEle.current.value.toString(),             //shop no in string
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
  const fetchAllShop = async() => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/shop/fetch-all-shop/${activeEventId}` , {
        headers : {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
        }
      });
      console.log(res?.data?.data);
      const shopList = res?.data?.data
      setShopNo(shopList.map((i) => i.shop_number));
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    fetchAllShop();
  },[])
    return(
      <>
      <ToastContainer/>
        <Grid item xs={6}>
            <FormControl variant="standard" sx={{ minWidth: 120 , width : "100%" , margin : "10px 0px "}}>
                <InputLabel id="demo-simple-select-standard-label" style={{ color: 'white' }}>select shop</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="select shop"
                disableUnderline
                inputRef={addItemEle}
                sx={{width : "100%" , borderBottom : "1px solid rgb(188, 189, 163)" , "& .MuiSelect-icon" : {
                    color : "rgb(188, 189, 163)" , "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root" : {
                        color : "white"
                    },
                    "& :focus" : {
                      backgroundColor : "none"
                    }
                }
                }}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {shopNo.map((i , idx) => <MenuItem key={idx} value={i}>{i}</MenuItem>)}

                </Select>
            </FormControl>
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
              },}}
              inputRef={amtDueEle}
              id="standard-basic"
              label="amount due"
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
                width: "70%",
                margin: "10px 0px ",
              }}
              inputRef={recievedAmtEle}
              InputProps={{
                style: {
                  color: "rgb(255, 255, 255)",
                },
              }}
              InputLabelProps={{
              style: {
                color: "white",
              },}}
              id="standard-basic"
              label="recieved amount"
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
              },}}
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
              inputRef={remarkEle}
              InputProps={{
                style: {
                  color: "rgb(255, 255, 255)",
                },
              }}
              InputLabelProps={{
              style: {
                color: "white",
              },}}
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
