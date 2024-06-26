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
import Loading from "../Component/Loading";
import ConfirmDelete from "../Component/ConfirmDelete";

export default function RentalAgreementPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { shopId } = useParams();
  const [openCalendar1, setOpenCalendar1] = useState(false);
  const [openCalendar2, setOpenCalendar2] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(startDate));
  const [name, setName] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const [toDate, setToDate] = useState(dayjs());
  const [file, setFIle] = useState("");
  const [rentMode, setRentMode] = useState(null);
  const { user, activeEventId } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [rentalObj, setRentalObj] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shopNumber , setShopNumber] = useState(null)
  const [shopData , setShopData] = useState([]); 
  const navigate = useNavigate();
  console.log(shopId, typeof shopId);
  const fetchShopById = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/shop/fetch-shop`,
        {
          shop_id: parseInt(shopId),
          event_id: activeEventId,
        },
        {
          headers: {
            Authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      if (res?.data?.data?.length > 0) {
        setShop(res?.data?.data[1][0].image_url);
        setShopData(res?.data?.data)
        setShopNumber(res?.data?.data[0].shop_number);
      }
    } catch (err) {
      throw err;
    }
  };
  const fetchRentalAgree = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/rentalagreement/fetch-rental-agreement`,
        {
          event_id: activeEventId,
          shop_id: parseInt(shopId),
        },
        {
          headers: {
            Authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      if (res?.data?.data?.length > 0) {
        const obj = res?.data?.data[0];
        setRentalObj(obj);
        setName(obj.tenant_name);
        setPhoneNo(obj.tenant_phone_number);
        setEmail(obj.tenant_email);
        setAddress(obj.tenant_address);
        setAmount(obj.rent_amount);
        setRentMode(obj.rent_mode);
        setStartDate(dayjs(obj.start_date));
        setEndDate(dayjs(obj.end_date));
        setIsEdit(true);
      }
      console.log(res);
      setLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopById();
    fetchRentalAgree();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Handle the uploaded file
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const fsize = file.size;
    const fileSizeInMB = fsize / 1024 / 1024;
    if (fileSizeInMB >= 1) {
      toast.warning(
        "File too big, please select a file smaller than or equal to 1MB"
      );
      return;
    } else {
      setFIle(file);
    }
    console.log(file);
  };

  const addRental = async (body) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/rentalagreement/add-rental-agreement`,
        formData,
        {
          headers: {
            authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      setLoading(false);
      console.log(res);
      toast.success(res?.data?.message, {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      navigate(`/description/${shopNumber}`, {
        state: {
          selectedShop: shopData,
          imageUrls: shop,
        },
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      const errArray = err?.response?.data?.errors;
      errArray?.forEach((err) => {
        toast.error(err?.msg);
      });
      toast.error(err?.response?.data, {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
    }
  };

  const handleDelete = async () => {
    if (rentalObj !== null) {
      const body = {
        _id: rentalObj?.agreement_id,
      };
      console.log(body);
      try {
        setLoading(true);
        const res = await axios.delete(
          `${process.env.REACT_APP_API_URI}/rentalagreement/delete-rental-agreement`,
          {
            headers: {
              authorization: `${user?.token}`, // Ensure the token format is correct
              Accept: "application/json",
              "Content-Type": "application/json",
              role_id: user?.role_id,
            },
            data: body,
          }
        );
        setLoading(false);
        toast.success(res?.data?.message, {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          },
        });
        fetchRentalAgree();
        navigate(-1);
      } catch (err) {
        setLoading(false);
        toast.success(err?.response?.data?.message, {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          },
        });
        console.log(err);
      }
    }
  };

  const handleEdit = async () => {
    const reqStartDateFormat = startDate?.toISOString().split("T")[0];
    const reqEndDateFormat = endDate?.toISOString().split("T")[0];
    const body = {
      rent_amount: amount,
      rent_mode: rentMode,
      start_date: reqStartDateFormat,
      end_date: reqEndDateFormat,
    };
    const shopid = parseInt(shopId);
    const eventid = activeEventId;
    try {
      setLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/rentalagreement/edit-rental-agreement/${shopid}/${eventid}`,
        body,
        {
          headers: {
            authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      setLoading(false);
      toast.success(res?.data?.message, {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      navigate(`/description/${shopNumber}`, {
        state: {
          selectedShop: shopData[0],
          imageUrls: shop,
        },
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      const errArray = err?.response?.data?.errors;
      errArray?.forEach((err) => {
        toast.error(err?.msg);
      });
    }
  };
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
    if (startDate && endDate) {
      fromDate = startDate?.toISOString().split("T")[0];
      toDate = endDate?.toISOString().split("T")[0];
    }
    const body = {
      name: name,
      email: email,
      phone_number: phoneNo,
      address: address,
      id_document: "http://www.ABC123456.com",
      shop_id: parseInt(shopId),
      start_date: fromDate,
      end_date: toDate,
      rent_amount: amount,
      rent_mode: rentMode,
      event_id: activeEventId,
      file: file,
    };
    addRental(body);
    setStartDate("");
    setEndDate("");
    setAddress("");
    setAmount("");
    setEmail("");
    setName("");
    setPhoneNo("");
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Box sx={{ backgroundColor: "rgb(66, 92, 90)" }}>
          <ConfirmDelete
            open={open}
            handleClose={handleClose}
            handleIncomeDelete={handleDelete}
          />
          <Box
            component="img"
            src="../../Images/arrow-left.png"
            alt="Share"
            sx={{
              cursor: "pointer",
              width: { xs: "35px", md: "45px" },
              margin: { xs: "20px 0px 0px 20px", md: "10px 0px 0px 20px" },
            }}
            onClick={() => {
              navigate(-1); // Navigate back by one step in the history stack
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: "rgb(247, 230, 173)",
              textAlign: "center",
              padding: "20px 0px",
              fontWeight: "600",
              textShadow: "0 6px rgba(81,67,21,0.8)",
              fontSize: {
                lg: "3rem",
                md: "2.8rem",
                sm: "2rem",
                xs: "1.9rem",
              },
            }}
          >
            Rental Agreement
          </Typography>
          {loading ? (
            <div> </div>
          ) : (
            <>
              <ToastContainer
                position="bottom-right"
                style={{ color: "red" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0px",
                  alignItems: "center",
                }}
              >
                <img
                  src={shop}
                  alt="Shop Image"
                  style={{
                    border: "20px solid rgb(78, 101, 100)",
                    borderRadius: "10px",
                    position: "relative",
                    width: "70%",
                    maxHeight: "380px",
                    objectFit: "fill",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    position: "absolute",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Shop {shopId[shopId?.length - 1]}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Grid container spacing={4} sx={{ margin: "0% 10%" }}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "rgb(155, 181, 199)",
                        margin: "20px 0px",
                        fontSize: {
                          lg: "2.2 rem",
                          md: "2.1rem",
                          sm: "1.9rem",
                          xs: "1.8rem",
                        },
                      }}
                    >
                      Tenant Information
                    </Typography>
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                        "& .MuiInput-input.Mui-disabled": {
                          WebkitTextFillColor: "white",
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
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                          },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "18px", md: "20px" }, // Set input font size here
                        },
                        width: "100%",
                        margin: "10px 0px ",
                        color: "white",
                      }}
                      InputProps={{
                        style: {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      disabled={isEdit}
                      autoFocus={isEdit}
                      value={rentalObj?.tenant_name}
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                        "& .MuiInput-underline::before": {
                          borderBottom: "1px solid rgb(188, 189, 163)",
                        },
                        "& .MuiInput-input.Mui-disabled": {
                          WebkitTextFillColor: "white",
                        },
                        "& label.Mui-focused": {
                          color: "rgb(255, 255, 255)", // Color of the label when focused
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                        },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                          },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "18px", md: "20px" }, // Set input font size here
                        },
                        width: "100%",
                        margin: "10px 0px ",
                      }}
                      InputProps={{
                        style: {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      value={rentalObj?.tenant_phone_number}
                      disabled={isEdit}
                      type="number"
                      id="standard-basic"
                      label="Phone number"
                      variant="standard"
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                        "& .MuiInput-input.Mui-disabled": {
                          WebkitTextFillColor: "white",
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
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                          },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "18px", md: "20px" }, // Set input font size here
                        },
                        width: "100%",
                        margin: "10px 0px ",
                      }}
                      id="standard-basic"
                      InputProps={{
                        style: {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      value={rentalObj?.tenant_email}
                      disabled={isEdit}
                      type="email"
                      label="Email"
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                        "& .MuiInput-underline::before": {
                          borderBottom: "1px solid rgb(188, 189, 163)",
                        },
                        "& .MuiInput-input.Mui-disabled": {
                          WebkitTextFillColor: "white",
                        },
                        "& label.Mui-focused": {
                          color: "rgb(255, 255, 255)", // Color of the label when focused
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                        },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                          },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "18px", md: "20px" }, // Set input font size here
                        },
                        width: "100%",
                        margin: "10px 0px ",
                      }}
                      InputProps={{
                        style: {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      value={rentalObj?.tenant_address}
                      disabled={isEdit}
                      id="standard-basic"
                      label="Address"
                      variant="standard"
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    {!isEdit && (
                      <TextField
                        id="upload-text"
                        label="Upload an image"
                        variant="standard"
                        value={file && file.name}
                        sx={{
                          "& .MuiInputLabel-root": {
                            color: "rgb(255, 255, 255)",
                            fontSize: { xs: "18px", md: "20px" },
                          },
                          "& .MuiInput-underline::before": {
                            borderBottom: "1px solid rgb(188, 189, 163)",
                          },
                          "& .MuiInput-input.Mui-disabled": {
                            WebkitTextFillColor: "white",
                          },
                          "& label.Mui-focused": {
                            color: "rgb(255, 255, 255)", // Color of the label when focused
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                          },
                          "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                            {
                              borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                            },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "18px", md: "20px" }, // Set input font size here
                          },
                          width: "100%",
                          margin: "10px 0px ",
                        }}
                        InputProps={{
                          style: {
                            color: "rgb(255, 255, 255)",
                            fontSize: { xs: "18px", md: "20px" },
                          },
                          endAdornment: (
                            <IconButton
                              edge="end"
                              component="label"
                              htmlFor="upload-file"
                              sx={{ color: "rgb(188, 189, 163)" }}
                            >
                              <AttachFileIcon />
                              <input
                                type="file"
                                id="upload-file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleFileUpload}
                              />
                            </IconButton>
                          ),
                        }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                            fontSize: { xs: "18px", md: "20px" },
                          },
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "rgb(155, 181, 199)",
                        margin: "20px 0px",
                        fontSize: {
                          lg: "2.2 rem",
                          md: "2.1rem",
                          sm: "1.9rem",
                          xs: "1.8rem",
                        },
                      }}
                    >
                      Rent Information
                    </Typography>
                    <TextField
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
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
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                          {
                            borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                          },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "18px", md: "20px" }, // Set input font size here
                        },
                        width: "100%",
                        margin: "10px 0px ",
                      }}
                      InputProps={{
                        style: {
                          color: "rgb(255, 255, 255)",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      value={amount}
                      InputLabelProps={{
                        style: {
                          color: "white",
                          fontSize: { xs: "18px", md: "20px" },
                        },
                      }}
                      type="number"
                      id="standard-basic"
                      label="Amount ₹"
                      variant="standard"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {/* <TextField sx = {{
                  "& .MuiInputLabel-root": {
                      color : "rgb(255, 255, 255)"
                  },
                  "& .MuiInput-underline::before" : {
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
                        style={{
                          color: "white",
                          fontSize: { xs: "17px", md: "20px" },
                        }}
                      >
                        Rent mode
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

                          fontSize: { xs: "17px", md: "20px" }, // Set select input font size here

                          "& .MuiSelect-icon": {
                            color: "rgb(188, 189, 163)",
                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          },

                          color: "white",
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
                    <div>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          position: "absolute",
                          paddingTop: "6px",
                          color: "white",
                        }}
                      >
                        From Date
                      </Typography>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormControl
                        variant="standard"
                        sx={{
                          minWidth: 110,
                          width: "100%",
                          margin: "4px 0px ",
                        }}
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
                          helperText={!startDate && "select the start date"}
                          slotProps={{
                            textField: {
                              InputProps: {
                                endAdornment: (
                                  <img
                                    src="../../../image-4.png"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setOpenCalendar1(true)}
                                  />
                                ),
                              },
                              InputLabelProps: {
                                style: {
                                  fontSize: { md: "20px", xs: "18px" },
                                },
                              },
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                              borderRadius: "none",
                            },
                            "& .MuiOutlinedInput-input": {
                              color: "white",
                            },
                            //   "& :hover": {
                            //     borderBottom: " 1px solid rgb(188, 189, 163)",
                            //   },
                            "& .MuiOutlinedInput-input": {
                              color: "white",
                            },

                            "& .MuiOutlinedInput-root":
                              {
                                borderRadius: "0px",
                                borderBottom: " 1px solid rgb(188, 189, 163)",
                              },
                            "& .MuiOutlinedInput-input": {
                              paddingLeft: "1px",
                              color: "white",
                            },
                          }}
                        />
                      </FormControl>
                    </LocalizationProvider>
                    <div>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          position: "absolute",
                          paddingTop: "6px",
                          color: "white",
                        }}
                      >
                        To Date
                      </Typography>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormControl
                        variant="standard"
                        sx={{
                          minWidth: 110,
                          width: "100%",
                          margin: "4px 0px ",
                        }}
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
                                  src="../../../image-4.png"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setOpenCalendar2(true)}
                                />
                                ),
                              },
                              InputLabelProps: {
                                style: {
                                  fontSize: { md: "20px", xs: "18px" },
                                },
                              },
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                              borderRadius: "none",
                            },
                            "& .MuiOutlinedInput-input": {
                              color: "white",
                            },
                            //   "& :hover": {
                            //     borderBottom: " 1px solid rgb(188, 189, 163)",
                            //   },
                            "& .MuiOutlinedInput-input": {
                              color: "white",
                            },

                            "& .MuiOutlinedInput-root":
                              {
                                borderRadius: "0px",
                                borderBottom: " 1px solid rgb(188, 189, 163)",
                              },
                            "& .MuiOutlinedInput-input": {
                              paddingLeft: "1px",
                              color: "white",
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
                    {isEdit === false && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "rgb(247, 230, 173) ",
                          color: "rgb(91, 94, 97)",
                          minWidth: "200px",
                          fontWeight: "600",
                          "&:hover": {
                            backgroundColor: "rgb(247, 230, 173) ",
                          },
                        }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    )}
                    {isEdit && (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            color: "rgb(91, 94, 97)",
                            background: "rgb(247, 230, 173)",
                            marginTop: "20px",
                            marginLeft: "10px",
                            marginBottom: "5px",
                            "&:hover": {
                              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                              color: "rgb(50, 50, 50)", // Change text color on hover
                              boxShadow:
                                "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
                            },
                          }}
                          onClick={handleEdit}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            color: "rgb(91, 94, 97)",
                            background: "rgb(247, 230, 173)",
                            marginTop: "20px",
                            marginLeft: "10px",
                            marginBottom: "5px",
                            "&:hover": {
                              backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                              color: "rgb(50, 50, 50)", // Change text color on hover
                              boxShadow:
                                "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
                            },
                          }}
                          onClick={handleOpen}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </>
    );
  }
}
