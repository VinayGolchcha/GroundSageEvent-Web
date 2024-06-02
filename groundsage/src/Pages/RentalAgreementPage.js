import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function RentalAgreementPage() {
    const [openCalendar1, setOpenCalendar1] = useState(false);
    const [openCalendar2, setOpenCalendar2] = useState(false);
    const [startDate , setStartDate ] = useState(dayjs());
    const [endDate , setEndDate] = useState(null);
    const [name , setName] = useState(null);
    const [phoneNo , setPhoneNo] = useState(null);
    const [email , setEmail] = useState(null);
    const [address , setAddress] = useState(null);
    const [amount , setAmount] = useState(null);
    const [toDate , setToDate] = useState(dayjs());
    const [file , setFIle] = useState();
    const [rentMode , setRentMode] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Handle the uploaded file
        console.log(file);
        setFIle(file);
      };
    const addRental = async (body) => {
      try{
        const res = await axios.post(`${process.env.REACT_APP_API_URI}/rentalagreement/add-rental-agreement`, body);
        console.log(res);
        toast.success(res?.data?.message , {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          }});
      }catch(err){
        console.log(err);
        console.log(err?.response?.data?.errors[0]?.msg)
        toast.error(err?.response?.data?.errors[0]?.msg , {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          }});
      }
    }
    const handleSave = () => {
      console.log(startDate);
      console.log(endDate);
      
      var dd = String(startDate?.getDate()).padStart(2, '0');
      var mm = String(startDate?.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = startDate?.getFullYear();

      const fromDate = yyyy + '-' + mm + '-' + dd;
      setStartDate(fromDate);

      var dd = String(endDate?.getDate()).padStart(2, '0');
      var mm = String(endDate?.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = endDate?.getFullYear();
      const toDate = yyyy + '-' + mm + '-' + dd;
      setToDate(toDate);

      const body = {
        name: name,
        email: email,
        phone_number : phoneNo,
        address : address,
        id_document : "http://www.ABC123456.com",
        shop_id : 1111,
        tenant_id : 1112,
        start_date : fromDate,
        end_date : toDate,
        rent_amount : amount,
        rent_mode : rentMode,
        event_id : 1115
    }
    addRental(body);
    setStartDate("");
    setEndDate("");
    setAddress("");
    setAmount("");
    setEmail("");
    setName("");
    setPhoneNo("")
    }
    
    return (
        <Box sx={{backgroundColor : "rgb(66, 92, 90)"}}>
            <Typography variant="h3" sx={{
                color : "rgb(247, 230, 173)",
                textAlign : "center", 
                padding : "20px 0px",
                fontWeight : "600",
                textShadow: "0 6px rgba(81,67,21,0.8)"
            }}>Rental Agreement</Typography>
            <ToastContainer position="bottom-right" style={{ color: "red" }} />
            <Box sx={{display : "flex" , justifyContent : "center" , margin : "10px 0px", alignItems : "center"}}>
               <img src="Rectangle-4242.png" alt="Shop Image" style={{border : "20px solid rgb(78, 101, 100)" , borderRadius: "10px" , position : "relative" , width : "70%"}}/>
               <Typography variant="h4" sx={{position : "absolute" , top : "205px" , color : "rgb(255, 255, 255)"}}>Shop 01</Typography>
            </Box>
            <Box sx={{display : "flex" , justifyContent : "center" }}>
                <Grid container spacing={4} sx={{margin : "0% 10%"}}>
                <Grid item lg={6} md={6} sm ={6} xs={12}>
                    <Typography variant="h4" sx={{color : "rgb(155, 181, 199)" , margin : "20px 0px"}}>Tenant Information</Typography>
                <TextField sx = {{
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
              },}}
            id="standard-basic" label="name" variant="standard" onChange={(e) => setName(e.target.value)} />
            <TextField sx = {{
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
              },}}
            id="standard-basic" label="phone number" variant="standard" onChange={(e) => setPhoneNo(e.target.value)}/>
            <TextField sx = {{
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
              id="standard-basic"
              InputProps={{
                style: {
                  color: "rgb(255, 255, 255)",
                },
              }}
              InputLabelProps={{
              style: {
                color: "white",
              },}}
            label="email" variant="standard" onChange={(e) => setEmail(e.target.value)}/>
            <TextField sx = {{
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
              },}}
            id="standard-basic" label="address" variant="standard" onChange={(e) => setAddress(e.target.value)}/>
            
    <TextField
        id="upload-text"
        label="Upload an image"
        variant="standard"
        value={file && file.name}
        sx = {{
            "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                color : "rgb(255, 255, 255)"
            },
            "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before" : {
                borderBottom : "1px solid rgb(188, 189, 163)"
            } ,
            '& label.Mui-focused': {
                color: 'rgb(255, 255, 255)', // Color of the label when focused
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'rgb(188, 189, 163)', // Color of the bottom border when focused
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'rgb(188, 189, 163)', // Color of the bottom border on hover
            },
            width : "100%",
            margin : "10px 0px "
        }}
        InputProps={{
            style: {
                color: "rgb(255, 255, 255)",
              },
          endAdornment: (
            <IconButton
              edge="end"
              component="label"
              htmlFor="upload-file"
              sx={{color : "rgb(188, 189, 163)"}}
            >
              <AttachFileIcon />
              <input
                type="file"
                id="upload-file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileUpload}
              />
            </IconButton>
          ),
        }}
      />   
                </Grid>
                <Grid item lg={6} md={6} sm ={6} xs={12}>
                <Typography variant="h4" sx={{color : "rgb(155, 181, 199)" , margin : "20px 0px"}}>Rent Information</Typography>
                <TextField sx = {{
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
              },}}
            id="standard-basic" label="amount" variant="standard" onChange={(e) => setAmount(e.target.value)} />
            {/* <TextField sx = {{
                "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color : "rgb(255, 255, 255)"
                },
                "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before" : {
                    borderBottom : "1px solid rgb(188, 189, 163)"
                } ,
                '& label.Mui-focused': {
                    color: 'rgb(255, 255, 255)', // Color of the label when focused
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'rgb(188, 189, 163)', // Color of the bottom border when focused
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'rgb(188, 189, 163)', // Color of the bottom border on hover
                },
                width : "100%",
                margin : "10px 0px "
            }}id="standard-basic" label="Standard" variant="standard" /> */}
            <FormControl
              variant="standard"
              sx={{ minWidth: 120, width: "100%", margin: "10px 0px " }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ color: "white" }}
              >
                rent mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="rent mode"
                disableUnderline
                onChange={(e) => setRentMode(e.target.value)}
                sx={{
                  width: "100%",
                  borderBottom: "1px solid rgb(188, 189, 163)",
                  "& .MuiSelect-icon": {
                    color: "rgb(188, 189, 163)",
                    "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                      color: "white",
                    },
                  },
                  color : "white"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"day"}>day</MenuItem>
                <MenuItem value={"week"}>week</MenuItem>
                <MenuItem value={"month"}>month</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 110, width: "100%", margin: "4px 0px " }}
              >
                {/* <InputLabel id="from-date-label">From date</InputLabel> */}
                <DatePicker
                  labelId="from-date-label"
                  value={dayjs(startDate)}
                  onChange={(newValue) => setStartDate(newValue?.$d)} // Handle onChange event if needed
                  open={openCalendar1}
                  onOpen={() => setOpenCalendar1(true)}
                  onClose={() => setOpenCalendar1(false)}
                  minDate={dayjs(startDate)}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <img
                            src="image-4.png"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenCalendar1(true)}
                          />
                        ),
                      },
                    },
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderRadius: "none",
                      borderBottom: " 1px solid rgb(188, 189, 163)",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },
                    "& :hover": {
                      borderBottom: " 1px solid rgb(188, 189, 163)",
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 110, width: "100%", margin: "4px 0px " }}
              >
                {/* <InputLabel id="from-date-label">From date</InputLabel> */}
                <DatePicker
                  labelId="from-date-label"
                  value={dayjs(startDate)}
                  onChange={(newValue) => setEndDate(newValue?.$d)} // Handle onChange event if needed
                  open={openCalendar2}
                  onOpen={() => setOpenCalendar2(true)}
                  onClose={() => setOpenCalendar2(false)}
                  minDate={dayjs(startDate)}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <img
                            src="image-4.png"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenCalendar2(true)}
                          />
                        ),
                      },
                    },
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderRadius: "none",
                      borderBottom: " 1px solid rgb(188, 189, 163)",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },
                    "& :hover": {
                      borderBottom: " 1px solid rgb(188, 189, 163)",
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
          </Grid>
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
                fontWeight: "600",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
