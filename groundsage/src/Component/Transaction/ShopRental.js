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
    if(outstandingAmtEle.current.value > recievedAmtEle.current.value){
      console.log(true);
      toast.warning("Outstanding amount, should be less than the received amount", {
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
        item : addItemEle.current.value?.toString(),             //shop no in string
        decided_amount : amtDueEle.current.value,  // amount due
        entered_amount : recievedAmtEle.current.value,   // recieved amount
        outstanding_amount : outstandingAmtEle.current.value,   // outstanding amount
        remarks : remarkEle.current.value
      }
      addTransection(body);
    }
    
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
      setShopNo(shopList?.map((i) => i.shop_number));
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
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl
            variant="standard"
            sx={{ 
              minWidth: 120, 
              width: "100%", 
              margin: "10px 0px",
              "& .MuiInputLabel-root": {
                color: "white",
                fontSize: { xs: "17px", md: "20px" }, // Set label font size here
              },
              "& .MuiSelect-root": {
                fontSize: { xs: "17px", md: "20px" }, // Set select input font size here
              },
              "& .MuiSelect-icon": {
                color: "rgb(188, 189, 163)",
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid rgb(188, 189, 163)",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "rgb(188, 189, 163)",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "rgb(188, 189, 163)",
              },
            }}
          >
            <InputLabel 
              id="demo-simple-select-standard-label" 
              style={{ color: 'white' }}
            >
              Select shop
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="select shop"
              inputRef={addItemEle}
              sx={{ 
                width: "100%", 
                color: "white",
                "& .MuiSelect-root": {
                  fontSize: { xs: "17px", md: "20px" }, // Set select input font size here
                },
                "& .MuiSelect-icon": {
                  color: "rgb(188, 189, 163)",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid rgb(188, 189, 163)",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rgb(188, 189, 163)",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "rgb(188, 189, 163)",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {shopNo?.map((i, idx) => (
                <MenuItem key={idx} value={i}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
              },}}
              inputRef={amtDueEle}
              id="standard-basic"
              label="Amount due"
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
              inputRef={recievedAmtEle}
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
              },}}
              id="standard-basic"
              label="Recieved amount"
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
              },}}
              id="standard-basic"
              label="Outstanding amount (if any)"
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
              },}}
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
