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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext, AuthProvider } from "../ContextApi/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function RentalAgreementPage() {
    let { shopId } = useParams();
    const [openCalendar1, setOpenCalendar1] = useState(false);
    const [openCalendar2, setOpenCalendar2] = useState(false);
    const [startDate , setStartDate ] = useState(dayjs(new Date()));
    const [endDate , setEndDate] = useState(dayjs(startDate));
    const [name , setName] = useState(null);
    const [phoneNo , setPhoneNo] = useState(null);
    const [email , setEmail] = useState(null);
    const [address , setAddress] = useState(null);
    const [amount , setAmount] = useState(null);
    const [toDate , setToDate] = useState(dayjs());
    const [file , setFIle] = useState();
    const [rentMode , setRentMode] = useState(null);
    const {user , activeEventId} = useContext(AuthContext);
    const [isEdit , setIsEdit] = useState(false);
    const [rentalObj , setRentalObj] = useState(null);
    const [shop , setShop] = useState(null);
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();
    console.log(shopId , typeof shopId);
    const fetchShopById = async() => {
      try{
        const res = await axios.post(`${process.env.REACT_APP_API_URI}/shop/fetch-shop` , {
          shop_id : parseInt(shopId),
          event_id : activeEventId
        } , {
          headers: {
            'Authorization': `${user?.token}`, // Ensure the token format is correct
            'Accept': 'application/json',
            'role_id': user?.role_id
          }
        });
        if(res?.data?.data?.length > 0 ){
          setShop(res?.data?.data[1][0].image_url);
        }
        
      }catch(err){
        throw(err);
      }
    }
    const fetchRentalAgree = async () => {
      try{
        const res = await axios.post(`${process.env.REACT_APP_API_URI}/rentalagreement/fetch-rental-agreement` , {
          event_id : activeEventId,
          shop_id : parseInt(shopId)
        } , {
          headers: {
            'Authorization': `${user?.token}`, // Ensure the token format is correct
            'Accept': 'application/json',
            'role_id': user?.role_id
          }
        });
        if(res?.data?.data?.length > 0){
          const obj = res?.data?.data[0];
          setRentalObj(obj);
          setName(obj.tenant_name);
          setPhoneNo(obj.tenant_phone_number);
          setEmail(obj.tenant_email);
          setAddress(obj.tenant_address)
          setAmount(obj.rent_amount);
          setRentMode(obj.rent_mode);
          setStartDate(dayjs(obj.start_date));
          setEndDate(dayjs(obj.end_date));
          setIsEdit(true);
        }
        console.log(res);
        setLoading(false)
      }catch(err){
        console.log(err);
        setLoading(false);
      }
    }

    useEffect(()=> {
      fetchShopById();
      fetchRentalAgree();
    },[])

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Handle the uploaded file
        const fsize = file.size;
        const fileSizeIn = Math.round((fsize / 1024));
        if (fileSizeIn <= 100) {
          toast.warning("File too small, please select a file greater than 100kb");
          return;
      }else {
        setFIle(file);
      }
        console.log(file);
      };
    const addRental = async (body) => {
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key , body[key]);
      })
      try{
        const res = await axios.post(`${process.env.REACT_APP_API_URI}/rentalagreement/add-rental-agreement`, formData , {
          headers : {
            'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
          }
        });
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
        const errArray = err?.response?.data?.errors;
        errArray?.forEach((err) => {
          toast.error(err?.msg)
        }) 
        toast.error(err?.response?.data, {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          }});
      }
    }

    const handleDelete = async () => {
      if(rentalObj !== null){
        const body = {
            _id : rentalObj?.agreement_id
          };
        console.log(body);
        try{
          const res = await axios.delete(`${process.env.REACT_APP_API_URI}/rentalagreement/delete-rental-agreement` , {
            headers : {
              'authorization': `${user?.token}`, // Ensure the token format is correct
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              role_id : user?.role_id
              },
              data : body
          }  );
          toast.success(res?.data?.message  , {
            style: {
              // Change font color
              fontSize: "16px", // Change font size
              fontFamily: "Inter", // Change font family
              fontWeight: "600", // Change font weight
              color: "rgb(66, 92, 90)",
            }})
          fetchRentalAgree();
          navigate(`/description/${shopId}`)
        }catch(err){
          console.log(err);
        }
      }
      
    }

    const handleEdit = async () =>{
      const reqStartDateFormat = startDate?.toISOString().split("T")[0];
      const reqEndDateFormat = endDate?.toISOString().split("T")[0];
      const body = {
        rent_amount : amount,
        rent_mode : rentMode,
        start_date : reqStartDateFormat,
        end_date : reqEndDateFormat
      }
      const shopid = parseInt(shopId);
      const eventid = activeEventId;
      try{
        const res = await axios.put(`${process.env.REACT_APP_API_URI}/rentalagreement/edit-rental-agreement/${shopid}/${eventid}` , body , {
          headers : {
          'authorization': `${user?.token}`, // Ensure the token format is correct
          'Accept': 'application/json',
          role_id : user?.role_id
          }
        })
      toast.success(res?.data?.message  , {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        }})
      }catch(err){
        console.log(err);
        const errArray = err?.response?.data?.errors;
        errArray?.forEach((err) => {
          toast.error(err?.msg)
        }) 
      }
    }
    const handleSave = () => {
      
      // var dd = String(startDate?.getDate()).padStart(2, '0');
      // var mm = String(startDate?.getMonth() + 1).padStart(2, '0'); //January is 0!
      // var yyyy = startDate?.getFullYear();

      // const fromDate = yyyy + '-' + mm + '-' + dd;
      // setStartDate(fromDate);

      // var dd = String(endDate?.getDate()).padStart(2, '0');
      // var mm = String(endDate?.getMonth() + 1).padStart(2, '0'); //January is 0!
      // var yyyy = endDate?.getFullYear();
      // const toDate = yyyy + '-' + mm + '-' + dd;
      // setToDate(toDate);
      let fromDate;
      let toDate;
      if(startDate && endDate) {
         fromDate = startDate?.toISOString().split("T")[0];
         toDate = endDate?.toISOString().split("T")[0];
      }
      const body = {
        name: name,
        email: email,
        phone_number : phoneNo,
        address : address,
        id_document : "http://www.ABC123456.com",
        shop_id : parseInt(shopId),
        start_date : fromDate,
        end_date : toDate,
        rent_amount : amount,
        rent_mode : rentMode,
        event_id : activeEventId,
        file : file
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
      <>
        <Box sx={{backgroundColor : "rgb(66, 92, 90)"}}>
            <Typography variant="h3" sx={{
                color : "rgb(247, 230, 173)",
                textAlign : "center", 
                padding : "20px 0px",
                fontWeight : "600",
                textShadow: "0 6px rgba(81,67,21,0.8)"
            }}>Rental Agreement</Typography>
            {loading ? <div> </div> : <>
            <ToastContainer position="bottom-right" style={{ color: "red" }} />
            <Box sx={{display : "flex" , justifyContent : "center" , margin : "10px 0px", alignItems : "center"}}>
               <img src={shop} alt="Shop Image" style={{border : "20px solid rgb(78, 101, 100)" , borderRadius: "10px" , position : "relative" , width : "70%"}}/>
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
                "& .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled" : {
                  WebkitTextFillColor : "white"
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
                color: "white"
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
              disabled={isEdit}
              autoFocus={isEdit}
              value={rentalObj?.tenant_name}
              
            id="standard-basic" label="name" variant="standard" onChange={(e) => setName(e.target.value)} />
            <TextField sx = {{
                "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                  color: "rgb(255, 255, 255)",
                },
                "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                  borderBottom: "1px solid rgb(188, 189, 163)",
                },
                "& .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled" : {
                  WebkitTextFillColor : "white"
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
              value={rentalObj?.tenant_phone_number}
              disabled={isEdit}
              type="number"
            id="standard-basic" label="phone number" variant="standard" onChange={(e) => setPhoneNo(e.target.value)}/>
            <TextField sx = {{
                "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                  color: "rgb(255, 255, 255)",
                },
                "& .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled" : {
                  WebkitTextFillColor : "white"
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
              value={rentalObj?.tenant_email}
              disabled={isEdit}
              type="email"
            label="email" variant="standard" onChange={(e) => setEmail(e.target.value)}/>
            <TextField sx = {{
                "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                  color: "rgb(255, 255, 255)",
                },
                "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                  borderBottom: "1px solid rgb(188, 189, 163)",
                },
                "& .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled" : {
                  WebkitTextFillColor : "white"
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
              value={rentalObj?.tenant_address}
              disabled={isEdit}
            id="standard-basic" label="address" variant="standard" onChange={(e) => setAddress(e.target.value)}/>
            
    {!isEdit && <TextField
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
            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled" : {
              WebkitTextFillColor : "white"
            },
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
      />  } 
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
              value={amount}
              InputLabelProps={{
              style: {
                color: "white",
              },}}
              type="number"
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
                value={rentMode}
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
                  helperText = {!startDate && "select the start date"}
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
                  value={dayjs(endDate)}
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
            {isEdit === false &&<Button
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
            </Button>}
            {isEdit && <>
            <Button
              variant="contained"
              sx={{
                ":hover" : {
                  backgroundColor : "rgb(247, 230, 173)"
                },
                backgroundColor: "rgb(247, 230, 173) ",
                color: "rgb(91, 94, 97)",
                minWidth: "200px",
                fontWeight: "600",
                marginRight : "2%"
              }
             
            }
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{
                ":hover" : {
                  backgroundColor : "rgb(247, 230, 173)"
                },
                backgroundColor: "rgb(247, 230, 173) ",
                color: "rgb(91, 94, 97)",
                minWidth: "200px",
                fontWeight: "600",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            </>}
          </Box>
        </Grid>
      </Box></>}
    </Box>
    </>
  );
}
