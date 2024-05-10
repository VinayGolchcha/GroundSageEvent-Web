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
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export default function CreateEventPage() {
  const [openCalendar1, setOpenCalendar1] = useState(false);
  const [openCalendar2, setOpenCalendar2] = useState(false);
  const [fromDate , setFromDate] = useState("2022-04-20");
  const [toDate , setToDate] = useState("2022-04-20");
  const [file, setFIle] = useState();
  const eventNameElement = useRef(null);
  const fromDateElement = useRef(null);
  const toDateElement = useRef(null);
  const descriptionElement = useRef(null);
  const teamNameElement = useRef(null);
  const teamSizeElement = useRef(null);
  const coordinatorCountElement = useRef(null);
  const staffMemberCountElement = useRef(null);
  const helperCountElement = useRef(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Handle the uploaded file
    console.log(file);
    setFIle(file);
  };
  const addEvent = async(body) => {
    try{
      const res = await axios.post("https://groundsageevent-be.onrender.com/api/v1/event/create-event-team-and-referral-code" , body);
      console.log(res);
      toast.success("Data Added Successfully"); 
    }catch(err){
      console.log(err);
      toast.error(err);
    }
  }
  const handleSave = () => {
    let formattedFromDate = fromDateElement.current.value.split('/');
    let temp = formattedFromDate[0];
    formattedFromDate[0] = formattedFromDate[1]
    formattedFromDate[1] = temp;
    formattedFromDate = formattedFromDate.reverse().join('-');
    let formattedToDate = fromDateElement.current.value.split('/');
    let tempTodate = formattedToDate[0];
    formattedToDate[0] = formattedToDate[1]
    formattedToDate[1] = tempTodate;
    formattedToDate = formattedToDate.reverse().join('-');
    
  const  body = { 
    event_name : eventNameElement.current.value,
    start_date : formattedFromDate,
    end_date : formattedToDate,
    event_description : descriptionElement.current.value,
    user_id : 1111,
    role_name : "coordinator",
    team_name : teamNameElement.current.value,
    team_size : teamSizeElement.current.value,
    coordinator_count : coordinatorCountElement.current.value,
    staff_members_count : staffMemberCountElement.current.value,
    helpers_count : helperCountElement.current.value
   }
   console.log(body);
   addEvent(body);
  }
  return (
    <Box sx={{ backgroundColor: "rgb(66, 92, 90)" }}>
      <Typography
        variant="h3"
        sx={{
          color: "rgb(247, 230, 173)",
          textAlign: "center",
          padding: "20px 0px",
          fontWeight: "600",
          textShadow: "0 6px rgba(81,67,21,0.8)",
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
                },
              }}
              id="standard-basic"
              label="Event Name"
              variant="standard"
              inputRef={eventNameElement}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
              >
                <InputLabel id="from-date-label" sx={{color : "white"}}>From Date</InputLabel>
                <DatePicker
                  labelId="from-date-label"
                  value={dayjs(fromDate)}
                  onChange={(newValue) => setFromDate(newValue.$d.toISOString().split('T')[0])} // Handle onChange event if needed
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
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
                        opacity : "0"
                    }
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
              >
                <InputLabel id="from-date-label" sx={{color : "white"}}>To date</InputLabel>
                <DatePicker
                  labelId="to-date-label"
                  value={dayjs(toDate)}
                  onChange={(newValue) => setToDate(newValue.$d.toISOString().split('T')[0])} // Handle onChange event if needed
                  open={openCalendar2}
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
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
                        opacity : "0"
                    }
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
              value={file && file.name}
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
                      onChange={handleFileUpload}
                    />
                  </IconButton>
                ),
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
              }}
              id="standard-basic"
              label="Team Size"
              variant="standard"
              inputRef={teamSizeElement}
            />

          <Box sx={{display : "flex" , width : "100%" , justifyContent : "space-between"}}>
            <Typography sx={{color : "rgb(255, 255, 255)" , width : "50%" , margin: "10px 0px ",alignContent : "end"}}>Role: COORDINATOR</Typography>
            <TextField
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
              inputRef={coordinatorCountElement}
              id="standard-basic"
              label="Count"
              variant="standard"
            />
          </Box>
          <Box sx={{display : "flex" , width : "100%"}}>
            <Typography sx={{color : "rgb(255, 255, 255)" , width : "50%" , margin: "10px 0px ",alignContent : "end"}}>Role: STAFF MEMBER</Typography>
            <TextField
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
              id="standard-basic"
              label="Count"
              variant="standard"
              inputRef={staffMemberCountElement}
            />
          </Box>
          <Box sx={{display : "flex" , width : "100%"}}>
            <Typography sx={{color : "rgb(255, 255, 255)", width : "50%" , margin: "10px 0px ", alignContent : "end"}}>Role: HELPER</Typography>
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
                width: "50%",
                margin: "10px 0px ",
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
