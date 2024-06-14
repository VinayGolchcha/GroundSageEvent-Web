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
import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {
  const [openCalendar1, setOpenCalendar1] = useState(false);
  const [openCalendar2, setOpenCalendar2] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs(new Date()));
  const [toDate, setToDate] = useState();
  const [file, setFIle] = useState([]);
  const eventNameElement = useRef(null);
  const fromDateElement = useRef(null);
  const toDateElement = useRef(null);
  const descriptionElement = useRef(null);
  const teamNameElement = useRef(null);
  const teamSizeElement = useRef(null);
  const coordinatorCountElement = useRef(null);
  const staffMemberCountElement = useRef(null);
  const helperCountElement = useRef(null);
  const { user,setRCode } = useContext(AuthContext);
  const today = new Date();

  const handleOpenCalender1 = () => {
    setOpenCalendar1(true);
  };
  const navigate = useNavigate();
  
  const handleOpenCalender2 = () => {
    setOpenCalendar2(true);
  };
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // Handle the uploaded file
    files?.forEach(file => {
      if (file) {
        // Check if file size is greater than 100KB (100 * 1024 bytes)
        if (file.size > 1 * 1024 * 1024) {
          toast.error('File size should not exceed 1 MB' , {
            style: {
              // Change font color
              fontSize: "16px", // Change font size
              fontFamily: "Inter", // Change font family
              fontWeight: "600", // Change font weight
              color: "rgb(66, 92, 90)",
            },
          });
          return;
        }
      }
    });
    setFIle(files);
    
  };
  const addEvent = async (body) => {
   
    try {
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });
      if (file.length > 0) {
        file.forEach((f) => {
          formData.append("files", f);
        });
      }
      const res = await axios.post(
        "https://groundsageevent-be.onrender.com/api/v1/event/create-event-team-and-referral-code",
        formData,
        {
          headers: {
            authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      console.log('API response:', res.data.data[0].roles);

    // Update the RCode state
    setRCode(res.data.data[0].roles);

    // Log the updated RCode state
    console.log('Updated RCode state:', res.data.data[0].roles);

    // If navigate is intended after setting RCode
    navigate('/refferalcode');  // Adjust the path as needed

      toast.success("Data Added Successfully"); 
    }catch(err){
      const errArray = err?.response?.data?.errors;
      errArray?.forEach((err) => {
        toast.error(err?.msg)
      }) 
      toast.error(err);
    }
  };
  const handleSave = () => {
    let formattedFromDate = fromDateElement.current.value.split("/");
    let temp = formattedFromDate[0];
    formattedFromDate[0] = formattedFromDate[1];
    formattedFromDate[1] = temp;
    formattedFromDate = formattedFromDate.reverse().join("-");
    let formattedToDate = toDateElement.current.value.split("/");
    let tempTodate = formattedToDate[0];
    formattedToDate[0] = formattedToDate[1];
    formattedToDate[1] = tempTodate;
    formattedToDate = formattedToDate.reverse().join("-");
    console.log("from Date", formattedFromDate);
    console.log("from Date", formattedToDate);
    if (
      parseInt(teamSizeElement.current.value) !==
      parseInt(coordinatorCountElement.current.value) +
        parseInt(staffMemberCountElement.current.value) +
        parseInt(helperCountElement.current.value)
    ) {
      toast.warning(
        "sum of the coordinator count , staffmember count , helper count should be equals to team size",
        {
          style: {
            // Change font color
            fontSize: "16px", // Change font size
            fontFamily: "Inter", // Change font family
            fontWeight: "600", // Change font weight
            color: "rgb(66, 92, 90)",
          },
        }
      );
      return;
    }
    const body = {
      event_name: eventNameElement.current.value,
      start_date: formattedFromDate,
      end_date: formattedToDate,
      event_description: descriptionElement.current.value,
      user_id: user?.user_id,
      role_name: user?.role_name,
      team_name: teamNameElement.current.value,
      team_size: teamSizeElement.current.value,
      coordinator_count: coordinatorCountElement.current.value,
      staff_members_count: staffMemberCountElement.current.value,
      helpers_count: helperCountElement.current.value,
    };
    console.log(body);
    addEvent(body);
  };
  return (
    <Box sx={{ backgroundColor: "rgb(66, 92, 90)" }}>
      <ToastContainer />
      <Box
          component='img'
          src="../../Images/arrow-left.png"
          alt="Share"
          sx={{
            cursor: "pointer",
            width: {xs:"35px",md:"45px"},
            margin: {xs:"20px 0px 0px 20px",md:"10px 0px 0px 20px"},
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
          fontSize: { xs: "30px",sm:"40px", md: "56px" },
        }}
      >
        Events
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={4} sx={{ margin: "0% 10%" }}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: "rgb(155, 181, 199)",
                margin: "20px 0px",
                fontWeight: "600",
                fontSize: { xs: "30px",sm:"40px", md: "56px" },
              }}
            >
              Create Event
            </Typography>
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
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
              id="standard-basic"
              label="Event Name"
              variant="standard"
              inputRef={eventNameElement}
            />
            <div><Typography sx ={{
                        fontSize: "11px",
                        position: "absolute",
                        paddingTop: "6px",
                        color : "white"
                  }
                  }>From Date</Typography></div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
              >
                
                <DatePicker
                  labelId="from-date-label"
                  value={dayjs(fromDate)}
                  minDate={dayjs(today)}
                  onChange={(newValue) =>
                    setFromDate(newValue.$d.toISOString().split("T")[0])
                  } // Handle onChange event if needed
                  open={openCalendar1}
                  onOpen={() => setOpenCalendar1(true)}
                  onClose={() => setOpenCalendar1(false)}
                  inputRef={fromDateElement}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <img
                            src="image-4.png"
                            style={{ cursor: "pointer" }}
                            onClick={handleOpenCalender1}
                          />
                        ),
                      },
                      InputLabelProps : {
                        fontSize: {xs:"18px",md:"20px"},
                      }
                    },
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderRadius: "none",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },
                    //   "& :hover": {
                    //     borderBottom: " 1px solid rgb(188, 189, 163)",
                    //   },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },

                    "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                      borderRadius: "0px",
                      borderBottom: " 1px solid rgb(188, 189, 163)",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      paddingLeft: "1px",
                      color: "white",
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <div><Typography sx ={{
                        fontSize: "11px",
                        position: "absolute",
                        paddingTop: "6px",
                        color : "white"
                  }
                  }>To Date</Typography></div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
              >
                <DatePicker
                  labelId="to-date-label"
                  value={dayjs(toDate)}
                  onChange={(newValue) =>
                    setToDate(newValue.$d.toISOString().split("T")[0])
                  } // Handle onChange event if needed
                  open={openCalendar2}
                  minDate={dayjs(fromDate)}
                  onOpen={() => setOpenCalendar2(true)}
                  onClose={() => setOpenCalendar2(false)}
                  inputRef={toDateElement}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <img
                            src="image-4.png"
                            style={{ cursor: "pointer" }}
                            onClick={handleOpenCalender2}
                          />
                        ),
                      },
                      InputLabelProps : {
                        fontSize: {xs:"18px",md:"20px"},
                      }
                    },
                  }}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderRadius: "none",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },
                    //   "& :hover": {
                    //     borderBottom: " 1px solid rgb(188, 189, 163)",
                    //   },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "white",
                    },

                    "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                      borderRadius: "0px",
                      borderBottom: " 1px solid rgb(188, 189, 163)",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      paddingLeft: "1px",
                      color: "white",
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
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
              id="standard-basic"
              InputProps={{
                style: {
                  color: "rgb(255, 255, 255)",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
              inputRef={descriptionElement}
              label="description"
              variant="standard"
            />

            <TextField
              id="upload-text"
              label="Add Event Image (Format: png, jpg)"
              variant="standard"
              value={file && file.map((item) => item.name)}
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
                      multiple
                      onChange={handleFileUpload}
                    />
                  </IconButton>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: "rgb(155, 181, 199)",
                margin: "20px 0px",
                fontWeight: "600",
                fontSize: { xs: "30px",sm:"40px", md: "56px" },
              }}
            >
              Create Team
            </Typography>
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
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
              inputRef={teamNameElement}
              id="standard-basic"
              label="Team Name"
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
              } 
                 
            }
            InputProps={{
              style: {
                color: "rgb(255, 255, 255)",
              },
            }}
            InputLabelProps={{
              style: {
                color: "white",
                fontSize: {xs:"18px",md:"20px"},
              },
            }}
            type="number"
              id="standard-basic"
              label="Team Size"
              variant="standard"
              inputRef={teamSizeElement}
            />
          <Box sx={{display : "flex" , width : "100%"}}>
          <Typography sx={{color : "rgb(255, 255, 255)" , width : "50%" , margin: "10px 0px ",alignContent : "end"}}>Role: Coordinator </Typography>
            <TextField
              type="number"
              sx={{
                width : "50%",
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
                width: "50%",
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
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
              inputRef={coordinatorCountElement}
              id="standard-basic"
              label="Count"
              variant="standard"
            />
          </Box>
          <Box sx={{display : "flex" , width : "100%"}}>
            <Typography sx={{color : "rgb(255, 255, 255)" , width : "50%" , margin: "10px 0px ",alignContent : "end"}}>Role: STAFF MEMBER</Typography>
            <TextField
            type="number"
              sx={{
                width : "50%",
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
                width: "50%",
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
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
              id="standard-basic"
              label="Count"
              variant="standard"
              inputRef={staffMemberCountElement}
            />
          </Box>
          <Box sx={{display : "flex" , width : "100%"}}>
            <Typography sx={{color : "rgb(255, 255, 255)", width : "50%" , margin: "10px 0px ", alignContent : "end"}}>Role: HELPER</Typography>
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
                width: "50%",
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
                  fontSize: {xs:"18px",md:"20px"},
                },
              }}
              inputRef={helperCountElement}
              id="standard-basic"
              label="Count"
              variant="standard"
            />
          </Box>


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
                ":hover" : {
                  backgroundColor : "rgb(247, 230, 173)"
                },
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
